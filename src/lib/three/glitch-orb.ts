import * as THREE from 'three';
import { orbVertexShader, orbFragmentShader } from './shaders';
export interface GlitchOrbOptions {
	baseColor?: THREE.ColorRepresentation;
	rimColor?: THREE.ColorRepresentation;
	highlightColor?: THREE.ColorRepresentation;
	radius?: number;
	verticalOffset?: number;
	segments?: number;
}
const DEFAULTS = {
	baseColor: '#0a0a0a',
	rimColor: '#242424', 
	highlightColor: '#4a4a4a',
	radius: 2.6,
	verticalOffset: 0.35,
	segments: 96
} satisfies Required<GlitchOrbOptions>;
const VERTICAL_FOV_DEG = 35;
const CAMERA_DISTANCE = 8;
export class GlitchOrb {
	private readonly renderer: THREE.WebGLRenderer;
	private readonly scene: THREE.Scene;
	private readonly camera: THREE.PerspectiveCamera;
	private readonly mesh: THREE.Mesh;
	private readonly material: THREE.ShaderMaterial;
	private readonly clock: THREE.Clock;
	private readonly raycaster = new THREE.Raycaster();
	private hoverX = 0;
	private hoverY = 0;
	private targetHoverX = 0;
	private targetHoverY = 0;
	private glitchCurrent = 0;
	private glitchTarget = 0;
	private readonly pointerNdc = new THREE.Vector2(0, 0);
	private readonly localTouchPoint = new THREE.Vector3();
	private touchInfluence = 0;
	private touchInfluenceTarget = 0;
	private disposed = false;
	constructor(canvas: HTMLCanvasElement, options: GlitchOrbOptions = {}) {
		const opts = { ...DEFAULTS, ...options };
		this.renderer = new THREE.WebGLRenderer({
			canvas,
			alpha: true, 
			antialias: true,
			powerPreference: 'low-power' 
		});
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		canvas.addEventListener('webglcontextlost', (event) => {
			event.preventDefault();
		});
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(VERTICAL_FOV_DEG, 1, 0.1, 100);
		this.camera.position.set(0, 0, CAMERA_DISTANCE);
		this.camera.updateMatrixWorld();
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
		this.mesh.position.y = opts.verticalOffset;
		this.scene.add(this.mesh);
		this.clock = new THREE.Clock();
	}
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
	resize(width: number, height: number): void {
		if (this.disposed || width === 0 || height === 0) return;
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(width, height, false);
	}
	setPointer(x: number, y: number): void {
		this.targetHoverX = x;
		this.targetHoverY = y;
		this.pointerNdc.set(x, y);
	}
	clearPointer(): void {
		this.touchInfluenceTarget = 0;
	}
	setGlitchIntensity(intensity: number): void {
		this.glitchTarget = intensity;
	}
	render(): void {
		if (this.disposed) return;
		const delta = this.clock.getDelta();
		const elapsed = this.clock.elapsedTime;
		this.hoverX += (this.targetHoverX - this.hoverX) * Math.min(delta * 3, 1);
		this.hoverY += (this.targetHoverY - this.hoverY) * Math.min(delta * 3, 1);
		this.glitchCurrent += (this.glitchTarget - this.glitchCurrent) * Math.min(delta * 8, 1);
		this.mesh.rotation.y = elapsed * 0.05 + this.hoverX * 0.3;
		this.mesh.rotation.x = this.hoverY * 0.2;
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
	dispose(): void {
		if (this.disposed) return;
		this.disposed = true;
		this.mesh.geometry.dispose();
		this.material.dispose();
		this.renderer.dispose();
	}
}
