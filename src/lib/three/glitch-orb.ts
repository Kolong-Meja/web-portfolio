import * as THREE from 'three';
import { orbVertexShader, orbFragmentShader } from './shaders';

export interface GlitchOrbOptions {
	/** Base (unlit) body color of the sphere. */
	baseColor?: THREE.ColorRepresentation;
	/** Fresnel rim color, visible at grazing angles — keep this a neutral gray, not a hue, or the rim will read as "colored" at rest. */
	rimColor?: THREE.ColorRepresentation;
	/** Color of the specular glint and the cursor's touch-glow. */
	highlightColor?: THREE.ColorRepresentation;
	/** Radius of the sphere, in three.js world units. */
	radius?: number;
	/**
	 * Width/height segment count for the underlying SphereGeometry.
	 * Higher = smoother, rounder silhouette, more vertices to transform.
	 * 96 already looks essentially perfectly round; drop to 48–64 on
	 * low-power devices, or push past 128 only if you inspect the
	 * silhouette up close and still see faceting.
	 */
	segments?: number;
}

const DEFAULTS = {
	baseColor: '#0a0a0a',
	rimColor: '#242424', // neutral graphite gray — no hue, matches the old CSS gradient's lighter shade
	highlightColor: '#4a4a4a',
	radius: 2.2,
	segments: 96
} satisfies Required<GlitchOrbOptions>;

/**
 * Owns one three.js scene: a single dark, glossy, glitch-capable,
 * cursor-reactive sphere rendered into a <canvas> supplied by the
 * caller.
 *
 * Geometry is a plain `SphereGeometry` and is NEVER displaced
 * per-vertex — every bit of surface detail (ambient "water" ripple,
 * cursor touch-ripple, glitch corruption) happens in the fragment
 * shader as a normal perturbation, so the silhouette always stays a
 * perfectly smooth ball. See shaders.ts for the shading math.
 *
 * Cursor interactivity works via a per-frame raycast: `render()` casts
 * a ray from the camera through the last known pointer position and
 * tests it against the mesh. On a hit, the world-space intersection
 * point is converted into the mesh's *local* space (`mesh.worldToLocal`)
 * and sent to the shader as `uTouchPoint` — local space because the
 * shader's ripple math operates on the untransformed `vPosition`, and
 * the mesh keeps rotating every frame.
 *
 * Usage:
 *   const orb = new GlitchOrb(canvas, { radius: 2.2 });
 *   orb.resize(w, h);
 *   orb.setPointer(ndcX, ndcY);   // call on every pointermove/mousemove
 *   orb.render();                 // call once per rAF tick
 *   orb.setGlitchIntensity(1);    // 0 = idle, 1 = normal burst, >1 = "mega" burst
 *   orb.dispose();                // call on component teardown
 */
export class GlitchOrb {
	private readonly renderer: THREE.WebGLRenderer;
	private readonly scene: THREE.Scene;
	private readonly camera: THREE.PerspectiveCamera;
	private readonly mesh: THREE.Mesh;
	private readonly material: THREE.ShaderMaterial;
	private readonly clock: THREE.Clock;
	private readonly raycaster = new THREE.Raycaster();

	// Hover (whole-mesh parallax tilt) — smoothed toward a target each frame.
	private hoverX = 0;
	private hoverY = 0;
	private targetHoverX = 0;
	private targetHoverY = 0;

	// Glitch intensity — smoothed; can exceed 1 for a "mega glitch" burst.
	private glitchCurrent = 0;
	private glitchTarget = 0;

	// Last known pointer position in NDC space ([-1, 1]), used for the
	// per-frame raycast that drives the cursor touch-ripple.
	private readonly pointerNdc = new THREE.Vector2(0, 0);
	private readonly localTouchPoint = new THREE.Vector3();
	private touchInfluence = 0;
	private touchInfluenceTarget = 0;

	private disposed = false;

	constructor(canvas: HTMLCanvasElement, options: GlitchOrbOptions = {}) {
		const opts = { ...DEFAULTS, ...options };

		this.renderer = new THREE.WebGLRenderer({
			canvas,
			alpha: true, // transparent clear color -> the CSS gradient/background behind it still shows through
			antialias: true,
			powerPreference: 'low-power' // this is decorative, not the main workload of the page
		});
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		canvas.addEventListener('webglcontextlost', (event) => {
			event.preventDefault();
		});

		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
		this.camera.position.set(0, 0, 8);

		const geometry = new THREE.SphereGeometry(opts.radius, opts.segments, opts.segments);

		this.material = new THREE.ShaderMaterial({
			vertexShader: orbVertexShader,
			fragmentShader: orbFragmentShader,
			uniforms: {
				uTime: { value: 0 },
				uGlitch: { value: 0 },
				uHoverX: { value: 0 },
				uHoverY: { value: 0 },
				uBaseColor: { value: new THREE.Color(opts.baseColor) },
				uRimColor: { value: new THREE.Color(opts.rimColor) },
				uHighlightColor: { value: new THREE.Color(opts.highlightColor) },
				uTouchPoint: { value: new THREE.Vector3(0, 0, 0) },
				uTouchInfluence: { value: 0 }
			}
		});

		this.mesh = new THREE.Mesh(geometry, this.material);
		this.mesh.position.y = 0.6;
		this.scene.add(this.mesh);

		this.clock = new THREE.Clock();
	}

	/**
	 * Feature-detect WebGL before even attempting to construct a
	 * GlitchOrb. Cheap, synchronous, safe to call before the `three`
	 * chunk has been dynamically imported.
	 */
	static isSupported(): boolean {
		try {
			const canvas = document.createElement('canvas');
			return !!(
				window.WebGLRenderingContext &&
				(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
			);
		} catch {
			return false;
		}
	}

	/** Call whenever the host canvas' CSS size changes (including on mount). */
	resize(width: number, height: number): void {
		if (this.disposed || width === 0 || height === 0) return;
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(width, height, false);
	}

	/**
	 * Feed the pointer position in Normalized Device Coordinates
	 * ([-1, 1] on both axes, +Y up) — the same convention three.js'
	 * Raycaster expects. Drives BOTH the whole-mesh parallax tilt and
	 * the per-frame touch-ripple raycast in render().
	 */
	setPointer(x: number, y: number): void {
		this.targetHoverX = x;
		this.targetHoverY = y;
		this.pointerNdc.set(x, y);
	}

	/** Tell render() the pointer has left the canvas entirely, fading the touch-ripple out. */
	clearPointer(): void {
		this.touchInfluenceTarget = 0;
	}

	/** 0 = idle, 1 = a normal glitch burst, >1 (e.g. ~1.6) = an escalated "mega" burst. Transitions are smoothed automatically. */
	setGlitchIntensity(intensity: number): void {
		this.glitchTarget = intensity;
	}

	/**
	 * Render exactly one frame. Deliberately does NOT run its own
	 * requestAnimationFrame loop — Header.svelte already has one and
	 * calls this from inside it, so the whole header animates on a
	 * single rAF tick instead of two competing ones.
	 */
	render(): void {
		if (this.disposed) return;

		const delta = this.clock.getDelta();
		const elapsed = this.clock.elapsedTime;

		this.hoverX += (this.targetHoverX - this.hoverX) * Math.min(delta * 3, 1);
		this.hoverY += (this.targetHoverY - this.hoverY) * Math.min(delta * 3, 1);
		this.glitchCurrent += (this.glitchTarget - this.glitchCurrent) * Math.min(delta * 8, 1);

		this.mesh.rotation.y = elapsed * 0.05 + this.hoverX * 0.3;
		this.mesh.rotation.x = this.hoverY * 0.2;
		// The raycast below needs this frame's rotation already applied,
		// since it converts the hit point into the mesh's local space.
		this.mesh.updateMatrixWorld(true);

		this.raycaster.setFromCamera(this.pointerNdc, this.camera);
		const hits = this.raycaster.intersectObject(this.mesh, false);
		if (hits.length > 0) {
			this.mesh.worldToLocal(this.localTouchPoint.copy(hits[0].point));
			this.touchInfluenceTarget = 1;
		} else {
			this.touchInfluenceTarget = 0;
		}
		this.touchInfluence +=
			(this.touchInfluenceTarget - this.touchInfluence) * Math.min(delta * 6, 1);

		this.material.uniforms.uTime.value = elapsed;
		this.material.uniforms.uGlitch.value = this.glitchCurrent;
		this.material.uniforms.uHoverX.value = this.hoverX;
		this.material.uniforms.uHoverY.value = this.hoverY;
		this.material.uniforms.uTouchPoint.value.copy(this.localTouchPoint);
		this.material.uniforms.uTouchInfluence.value = this.touchInfluence;

		this.renderer.render(this.scene, this.camera);
	}

	/**
	 * Release GPU resources: geometry buffers, compiled shader program,
	 * and the WebGL context itself. Must be called when the owning
	 * component unmounts.
	 */
	dispose(): void {
		if (this.disposed) return;
		this.disposed = true;
		this.mesh.geometry.dispose();
		this.material.dispose();
		this.renderer.dispose();
	}
}
