<script lang="ts">
	import { DarkSignature } from '$lib';
	import { onMount } from 'svelte';
	import { t } from '$lib/translations';
	import type { GlitchOrb } from '$lib/three/glitch-orb';

	let canvas: HTMLCanvasElement;
	let orbCanvas: HTMLCanvasElement;
	let pointerX = 0;
	let pointerY = 0;

	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		text: string;
		size: number;
		age: number;
		lifespan: number;
		baseOpacity: number;
	}

	// Ambient particles are drawn from real code syntax tokens rather than
	// arbitrary glyphs — a small, deliberate detail that reads as "this is a
	// programmer's space" even at a glance, without spelling anything out.
	const PARTICLE_GLYPHS = [
		'{', '}', '<', '>', '/>', '=>', '();', '[]', '&&', '||', '===', 'fn', 'let', 'const', '0', '1'
	] as const;

	const MAX_PARTICLES = 32;
	const SPAWN_INTERVAL_MS = 550;
	const FADE_DURATION_MS = 700;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animationId: number;
		let particles: Particle[] = [];
		let spawnAccumulator = 0;
		let lastFrameTime = performance.now();

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
				accentColor: '#34d399',
				radius: 2.6,
				verticalOffset: 0.35,
				segments: 96
			});
			orb.resize(orbCanvas.offsetWidth, orbCanvas.offsetHeight);
		};
		void initOrb();

		function spawnParticle(width: number, height: number): Particle {
			return {
				x: Math.random() * width,
				y: height + 24,
				vx: (Math.random() - 0.5) * 8,
				vy: -(14 + Math.random() * 18),
				text: PARTICLE_GLYPHS[Math.floor(Math.random() * PARTICLE_GLYPHS.length)],
				size: 11 + Math.random() * 7,
				age: 0,
				lifespan: 5200 + Math.random() * 3200,
				baseOpacity: 0.35 + Math.random() * 0.35
			};
		}

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			const width = canvas.offsetWidth;
			const height = canvas.offsetHeight;
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			orb?.resize(orbCanvas.offsetWidth, orbCanvas.offsetHeight);
		};
		resize();

		const draw = (now: number) => {
			const deltaMs = Math.min(now - lastFrameTime, 100);
			lastFrameTime = now;
			const deltaSeconds = deltaMs / 1000;

			const width = canvas.offsetWidth;
			const height = canvas.offsetHeight;
			ctx.clearRect(0, 0, width, height);

			if (!prefersReducedMotion) {
				spawnAccumulator += deltaMs;
				while (spawnAccumulator >= SPAWN_INTERVAL_MS && particles.length < MAX_PARTICLES) {
					particles.push(spawnParticle(width, height));
					spawnAccumulator -= SPAWN_INTERVAL_MS;
				}
			}

			for (let i = particles.length - 1; i >= 0; i--) {
				const p = particles[i];
				p.age += deltaMs;

				if (p.age >= p.lifespan) {
					particles.splice(i, 1);
					continue;
				}

				const dx = p.x - pointerX;
				const dy = p.y - pointerY;
				const dist = Math.sqrt(dx * dx + dy * dy);
				const influence = Math.max(0, 1 - dist / 200);

				p.x += (p.vx + dx * influence * 0.4) * deltaSeconds;
				p.y += (p.vy + dy * influence * 0.4) * deltaSeconds;

				const fadeIn = Math.min(1, p.age / FADE_DURATION_MS);
				const fadeOut = Math.min(1, (p.lifespan - p.age) / FADE_DURATION_MS);
				const alpha = Math.max(0, Math.min(fadeIn, fadeOut)) * p.baseOpacity;

				ctx.save();
				ctx.globalAlpha = alpha;
				ctx.font = `${p.size}px "Inconsolata", monospace`;
				ctx.fillStyle = '#34d399';
				ctx.fillText(p.text, p.x, p.y);
				ctx.restore();
			}

			orb?.render();
			animationId = requestAnimationFrame(draw);
		};

		const handlePointerMove = (e: PointerEvent) => {
			const rect = canvas.getBoundingClientRect();
			pointerX = e.clientX - rect.left;
			pointerY = e.clientY - rect.top;
			const nx = (pointerX / rect.width) * 2 - 1;
			const ny = -((pointerY / rect.height) * 2 - 1);
			orb?.setPointer(nx, ny);
		};

		const handlePointerLeave = () => {
			orb?.clearPointer();
		};

		animationId = requestAnimationFrame(draw);
		window.addEventListener('resize', resize);
		canvas.addEventListener('pointermove', handlePointerMove, { passive: true });
		canvas.addEventListener('pointerleave', handlePointerLeave);

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', resize);
			canvas.removeEventListener('pointermove', handlePointerMove);
			canvas.removeEventListener('pointerleave', handlePointerLeave);
			orb?.dispose();
		};
	});
</script>

<div
	class="dark:bg-soft-black relative flex min-h-screen w-screen max-w-full items-center justify-center overflow-hidden bg-black transition-colors duration-300 ease-in-out"
>
	<div
		class="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#34d3990d_1px,transparent_1px),linear-gradient(to_bottom,#34d3990d_1px,transparent_1px)] mask-[radial-gradient(ellipse_70%_60%_at_50%_30%,#000_30%,transparent_100%)] bg-size-[36px_36px]"
	></div>

	<div class="orb-glow pointer-events-none absolute inset-0 z-1" aria-hidden="true"></div>

	<canvas bind:this={orbCanvas} class="pointer-events-none absolute inset-0 z-2 h-full w-full"></canvas>

	<canvas
		bind:this={canvas}
		class="absolute inset-0 z-3 h-full w-full"
		style="mix-blend-mode: screen;"
	></canvas>

	<div class="pointer-events-none absolute inset-0 z-4 scanline-layer"></div>

	<div class="pointer-events-none relative z-5 container mx-auto flex flex-col items-center gap-4 sm:gap-5">
		<div class="flex items-center justify-center px-8 py-10 md:px-16 md:py-16">
			<div class="signature-wrapper">
				<img
					src={DarkSignature}
					alt="Faisal Ramadhan signature"
					class="relative h-56 w-56 select-none sm:h-72 sm:w-72 md:h-88 md:w-88 lg:h-104 lg:w-104 xl:h-120 xl:w-120"
					loading="eager"
				/>
			</div>
		</div>

		<div class="flex flex-col items-center gap-1.5 px-6 text-center">
			<span class="font-inconsolata text-xs text-emerald-400/70 sm:text-sm">$ whoami</span>
			<p class="font-inconsolata max-w-md text-xs text-white/60 sm:max-w-lg sm:text-sm md:text-base">
				{$t('about.short_desc')}<span class="cursor-blink" aria-hidden="true"></span>
			</p>
		</div>
	</div>

	<span class="hud-corner hud-corner--tl" aria-hidden="true"></span>
	<span class="hud-corner hud-corner--tr" aria-hidden="true"></span>
	<span class="hud-corner hud-corner--bl" aria-hidden="true"></span>
	<span class="hud-corner hud-corner--br" aria-hidden="true"></span>

	<div class="pointer-events-none absolute inset-0 z-6 noise-layer"></div>
	<div
		class="pointer-events-none absolute inset-x-0 bottom-0 z-7 h-40 bg-[linear-gradient(to_bottom,transparent,black)] sm:h-56 md:h-64 lg:h-72 dark:bg-[linear-gradient(to_bottom,transparent,var(--color-soft-black))]"
		aria-hidden="true"
	></div>

	<div class="pointer-events-none absolute bottom-6 left-1/2 z-8 -translate-x-1/2 sm:bottom-9">
		<div class="flex flex-col items-center gap-2">
			<span class="font-inconsolata text-[0.6rem] tracking-[0.3em] text-white/30 uppercase sm:text-xs">
				scroll
			</span>
			<div class="scroll-cue relative h-8 w-5 rounded-full border border-white/20 sm:h-9">
				<span class="scroll-cue__dot absolute top-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-emerald-400"></span>
			</div>
		</div>
	</div>
</div>

<style>
	.signature-wrapper {
		position: relative;
		display: inline-block;
		animation: signature-in 1.1s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	@keyframes signature-in {
		from {
			opacity: 0;
			transform: scale(0.94) translateY(12px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	.orb-glow {
		background: radial-gradient(
			38rem circle at 50% 46%,
			rgba(52, 211, 153, 0.12) 0%,
			rgba(52, 211, 153, 0.04) 40%,
			transparent 70%
		);
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

	.noise-layer {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		background-repeat: repeat;
		opacity: 0.05;
		mix-blend-mode: overlay;
	}

	.hud-corner {
		position: absolute;
		z-index: 5;
		width: 22px;
		height: 22px;
		border-color: rgba(52, 211, 153, 0.25);
		pointer-events: none;
	}
	.hud-corner--tl {
		top: 18px;
		left: 18px;
		border-top: 1px solid;
		border-left: 1px solid;
	}
	.hud-corner--tr {
		top: 18px;
		right: 18px;
		border-top: 1px solid;
		border-right: 1px solid;
	}
	.hud-corner--bl {
		bottom: 18px;
		left: 18px;
		border-bottom: 1px solid;
		border-left: 1px solid;
	}
	.hud-corner--br {
		bottom: 18px;
		right: 18px;
		border-bottom: 1px solid;
		border-right: 1px solid;
	}

	.cursor-blink {
		display: inline-block;
		width: 0.45em;
		height: 0.9em;
		margin-left: 0.15em;
		background: currentColor;
		vertical-align: -0.1em;
		animation: blink 1.1s step-end infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	.scroll-cue__dot {
		animation: scroll-cue-move 1.8s ease-in-out infinite;
	}

	@keyframes scroll-cue-move {
		0% {
			transform: translate(-50%, 0);
			opacity: 1;
		}
		70% {
			opacity: 0.2;
		}
		100% {
			transform: translate(-50%, 14px);
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.signature-wrapper {
			animation: none;
		}
		.cursor-blink {
			animation: none;
			opacity: 1;
		}
		.scroll-cue__dot {
			animation: none;
		}
	}
</style>