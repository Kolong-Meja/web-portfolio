import * as THREE from 'three';
import { orbVertexShader, orbFragmentShader } from './shaders';

export interface GlitchOrbOptions {
	/** Base (unlit) body color of the sphere. */
	baseColor?: THREE.ColorRepresentation;
	/** Fresnel rim color, visible at grazing angles — keep this a neutral gray, not a hue, or the rim will read as "colored" at rest. */
	rimColor?: THREE.ColorRepresentation;
	/** Color of the small specular glint that sells the "wet/liquid" look. */
	highlightColor?: THREE.ColorRepresentation;
	/** Radius of the sphere, in three.js world units. */
	radius?: number;
	/**
	 * Width/height segment count for the underlying SphereGeometry.
	 * Higher = smoother, rounder silhouette, more vertices to transform.
	 * 96 already looks essentially perfectly round; only go lower
	 * (48–64) if you're chasing frame budget on low-power devices, and
	 * only go higher (128+) if you inspect the silhouette up close and
	 * still see faceting.
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
 * Owns one three.js scene: a single dark, glossy, glitch-capable sphere
 * rendered into a <canvas> supplied by the caller.
 *
 * Geometry is a plain `SphereGeometry` and — on purpose — is NEVER
 * displaced per-vertex. Every bit of "liquid" surface detail happens in
 * the fragment shader as a normal perturbation (see shaders.ts), so the
 * silhouette always stays a perfectly smooth ball, exactly as round from
 * every angle. If you ever want actual geometric bulging again, that's a
 * vertex-shader change in shaders.ts — but note the tradeoff: vertex
 * displacement is what produced the "sharp dents at the edges" look this
 * version was written to get rid of.
 *
 * Usage:
 *   const orb = new GlitchOrb(canvas, { radius: 2.2 });
 *   orb.resize(w, h);
 *   orb.render();       // call once per rAF tick
 *   orb.setGlitchActive(true);
 *   orb.dispose();      // call on component teardown
 */
export class GlitchOrb {
	private readonly renderer: THREE.WebGLRenderer;
	private readonly scene: THREE.Scene;
	private readonly camera: THREE.PerspectiveCamera;
	private readonly mesh: THREE.Mesh;
	private readonly material: THREE.ShaderMaterial;
	private readonly clock: THREE.Clock;

	// Hover (parallax) and glitch intensity are both smoothed/lerped
	// toward a target each frame instead of being applied instantly —
	// this is what makes mouse movement and glitch on/off feel like they
	// have a bit of physical weight, rather than snapping.
	private hoverX = 0;
	private hoverY = 0;
	private targetHoverX = 0;
	private targetHoverY = 0;
	private glitchCurrent = 0;
	private glitchTarget = 0;

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

		// Guard against a fatal crash if the GPU/driver drops the context
		// (happens on some mobile browsers under memory pressure). We
		// don't try to restore it — the CSS fallback behind the canvas
		// is enough — we just stop the tab from throwing.
		canvas.addEventListener('webglcontextlost', (event) => {
			event.preventDefault();
		});

		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
		this.camera.position.set(0, 0, 8);

		// A plain, undisplaced sphere — see the class doc comment above
		// for why this is deliberate.
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
				uHighlightColor: { value: new THREE.Color(opts.highlightColor) }
			}
		});

		this.mesh = new THREE.Mesh(geometry, this.material);
		// Nudged up slightly to roughly echo the old circle's
		// `top-[-10%]` positioning. Tweak freely — see the note in
		// Header.svelte about tuning this visually in the browser.
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
		// `false` = don't let three.js touch the canvas' CSS width/height;
		// Tailwind's `absolute inset-0 h-full w-full` already owns that.
		this.renderer.setSize(width, height, false);
	}

	/** Feed a normalized pointer position in [-1, 1] to drive the parallax tilt. */
	setPointer(x: number, y: number): void {
		this.targetHoverX = x;
		this.targetHoverY = y;
	}

	/** Turn the glitch-corruption look on/off; the transition is smoothed automatically in render(). */
	setGlitchActive(active: boolean): void {
		this.glitchTarget = active ? 1 : 0;
	}

	/**
	 * Render exactly one frame. Deliberately does NOT run its own
	 * requestAnimationFrame loop — Header.svelte already has one (for the
	 * 2D particle canvas) and calls this from inside it, so the whole
	 * header animates on a single rAF tick instead of two competing ones.
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

		this.material.uniforms.uTime.value = elapsed;
		this.material.uniforms.uGlitch.value = this.glitchCurrent;
		this.material.uniforms.uHoverX.value = this.hoverX;
		this.material.uniforms.uHoverY.value = this.hoverY;

		this.renderer.render(this.scene, this.camera);
	}

	/**
	 * Release GPU resources: geometry buffers, compiled shader program,
	 * and the WebGL context itself. Must be called when the owning
	 * component unmounts — WebGL contexts are a scarce, per-tab-limited
	 * resource, and browsers do NOT garbage-collect them just because
	 * the JS object references disappear.
	 */
	dispose(): void {
		if (this.disposed) return;
		this.disposed = true;
		this.mesh.geometry.dispose();
		this.material.dispose();
		this.renderer.dispose();
	}
}