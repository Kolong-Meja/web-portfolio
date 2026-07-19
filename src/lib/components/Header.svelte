<script lang="ts">
	import { DarkSignature } from '$lib';
	import { onMount } from 'svelte';
	import type { GlitchOrb } from '$lib/three/glitch-orb';

	let canvas: HTMLCanvasElement;
	let orbCanvas: HTMLCanvasElement;
	let mouseX = 0;
	let mouseY = 0;

	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		text: string;
		opacity: number;
		size: number;
		decay: number;
		age: number;
	}

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animationId: number;
		let particles: Particle[] = [];

		let orb: GlitchOrb | null = null;
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const initOrb = async () => {
			if (prefersReducedMotion) return;
			const { GlitchOrb: GlitchOrbClass } = await import('$lib/three/glitch-orb');
			if (!GlitchOrbClass.isSupported()) return;
			if (!orbCanvas) return;
			orb = new GlitchOrbClass(orbCanvas, {
				baseColor: '#0a0a0a',
				rimColor: '#242424',
				highlightColor: '#4a4a4a',
				radius: 2.6,
				verticalOffset: 0.35,
				segments: 96
			});
			orb.resize(orbCanvas.offsetWidth, orbCanvas.offsetHeight);
		};
		void initOrb();

		const resize = () => {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
			orb?.resize(orbCanvas.offsetWidth, orbCanvas.offsetHeight);
		};
		resize();

		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for (let i = particles.length - 1; i >= 0; i--) {
				const p = particles[i];
				p.age++;
				const dx = p.x - mouseX;
				const dy = p.y - mouseY;
				const dist = Math.sqrt(dx * dx + dy * dy);
				const influence = Math.max(0, 1 - dist / 200);
				p.x += p.vx + dx * influence * 0.012;
				p.y += p.vy + dy * influence * 0.012;
				p.opacity -= p.decay;

				ctx.save();
				ctx.globalAlpha = p.opacity;
				ctx.font = `${p.size}px "Inconsolata", monospace`;
				ctx.fillStyle = '#34d399';
				ctx.fillText(p.text, p.x, p.y);
				ctx.restore();
			}

			orb?.render();
			animationId = requestAnimationFrame(draw);
		};

		const handleMouse = (e: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			mouseX = e.clientX - rect.left;
			mouseY = e.clientY - rect.top;
			const nx = (mouseX / rect.width) * 2 - 1;
			const ny = -((mouseY / rect.height) * 2 - 1);
			orb?.setPointer(nx, ny);
		};

		const handleMouseLeave = () => {
			orb?.clearPointer();
		};

		draw();
		window.addEventListener('resize', resize);
		canvas.addEventListener('mousemove', handleMouse);
		canvas.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', resize);
			canvas.removeEventListener('mousemove', handleMouse);
			canvas.removeEventListener('mouseleave', handleMouseLeave);
			orb?.dispose();
		};
	});
</script>

<div
	class="dark:bg-soft-black relative flex h-240 max-h-full min-h-screen w-screen max-w-full items-center justify-center overflow-hidden bg-black transition-colors duration-300 ease-in-out"
>
	<div
		class="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"
	></div>
	<canvas
		bind:this={orbCanvas}
		class="pointer-events-none absolute inset-0 z-0 h-full w-full"
	></canvas>
	<canvas
		bind:this={canvas}
		class="absolute inset-0 z-1 h-full w-full"
		style="mix-blend-mode: screen;"
	></canvas>
	<div class="pointer-events-none absolute inset-0 z-2 scanline-layer"></div>
	<div class="relative z-3 container mx-auto pointer-events-none">
		<div class="flex items-center justify-center px-10 py-14 md:px-20 md:py-24">
			<div class="signature-wrapper">
				<img
					src={DarkSignature}
					alt="Faisal Logo"
					class="relative h-80 w-80 select-none sm:h-96 sm:w-96 md:h-112 md:w-md lg:h-128 lg:w-lg xl:h-144 xl:w-xl"
					loading="eager"
				/>
			</div>
		</div>
	</div>
	<div class="pointer-events-none absolute inset-0 z-4 noise-layer"></div>
</div>

<style>
	.signature-wrapper {
		position: relative;
		display: inline-block;
	}

	.scanline-layer {
		background: repeating-linear-gradient(
			0deg,
			transparent,
			transparent 1px,
			rgba(52, 211, 153, 0.3) 1px,
			rgba(52, 211, 153, 0.3) 2px
		);
		opacity: 0.06;
		animation: scanline-drift 4s linear infinite;
	}
	@keyframes scanline-drift {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(2px);
		}
	}
</style>