<script lang="ts">
	import { DarkSignature } from '$lib';
	import { onMount } from 'svelte';
	import type { GlitchOrb } from '$lib/three/glitch-orb';

	let canvas: HTMLCanvasElement;
	let orbCanvas: HTMLCanvasElement;
	let mouseX = 0;
	let mouseY = 0;

	const FRAGMENTS: string[] = [
		'0xDEAD', '0xBEEF', 'null', '&&', '=>',
		'void', '/**/', '::', '!==', '?.', '|>',
		'█░▒▓', '◉', '∞', '⌬', '⟁',
		'ERR', 'NaN', '////', '0x00', '>>>',
		'0x1A2B3C', 'SYS_ERR', 'AUTH_FAIL', 'root', 'sudo',
		'SEGV', '0b1010', '[ENCRYPTED]', 'TTL=64', '::1',
		'panic!', 'EOF', '404', 'await', 'yield'
	];

	const TERMINAL_LINES: string[] = [
		'> ACCESS_GRANTED',
		'> decrypting_signature.sig',
		'root@faisal:~$ whoami',
		'[ WARN ] integrity_check_failed',
		'0xC0FFEE :: sync_complete',
		'> tracing_route...',
		'> injecting_payload... done',
		'[ OK ] handshake_established'
	];

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
		corrupted: boolean;
		corruptFrames: number;
	}

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		let animationId: number;
		let particles: Particle[] = [];
		const MAX_PARTICLES = 28;

		let globalGlitchTimer = 0;
		let globalGlitchActive = false;
		let globalGlitchDuration = 0;
		let currentGlitchIsMega = false;
		const GLITCH_INTERVAL_MIN = 220;
		const GLITCH_INTERVAL_MAX = 480;
		let nextGlitchAt =
			GLITCH_INTERVAL_MIN + Math.random() * (GLITCH_INTERVAL_MAX - GLITCH_INTERVAL_MIN);

		let flashPulseFrames = 0;
		const FLASH_PULSE_TOTAL = 4;

		let terminalLine = '';
		let terminalFlashFrames = 0;
		let terminalFlashTotal = 1;

		let orb: GlitchOrb | null = null;

		const prefersReducedMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)'
		).matches;

		const initOrb = async () => {
			if (prefersReducedMotion) return;

			const { GlitchOrb: GlitchOrbClass } = await import('$lib/three/glitch-orb');
			if (!GlitchOrbClass.isSupported()) return;
			if (!orbCanvas) return;

			orb = new GlitchOrbClass(orbCanvas, {
				baseColor: '#0a0a0a',
				rimColor: '#242424',
				highlightColor: '#4a4a4a',
				radius: 2.2,
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

		const spawn = (fromCenter = false): Particle => {
			let x: number, y: number, vx: number, vy: number;
			if (fromCenter) {
				const centerX = canvas.width / 2;
				const centerY = canvas.height / 2;
				const angle = Math.random() * Math.PI * 2;
				const startRadius = Math.random() * 24;
				x = centerX + Math.cos(angle) * startRadius;
				y = centerY + Math.sin(angle) * startRadius;
				const burstSpeed = 0.5 + Math.random() * 0.8;
				vx = Math.cos(angle) * burstSpeed;
				vy = Math.sin(angle) * burstSpeed;
			} else {
				x = Math.random() * canvas.width;
				y = Math.random() * canvas.height;
				vx = (Math.random() - 0.5) * 0.3;
				vy = (Math.random() - 0.5) * 0.3;
			}

			return {
				x,
				y,
				vx,
				vy,
				text: FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)],
				opacity: 0.08 + Math.random() * 0.15,
				size: 12 + Math.random() * 10,
				decay: 0.0001 + Math.random() * 0.0004,
				age: 0,
				corrupted: false,
				corruptFrames: 0
			};
		};

		for (let i = 0; i < MAX_PARTICLES; i++) {
			particles.push(spawn(true));
		}

		const draw = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// ── Global glitch timing ──
			globalGlitchTimer++;
			if (globalGlitchTimer >= nextGlitchAt && !globalGlitchActive) {
				globalGlitchActive = true;
				
				currentGlitchIsMega = Math.random() < 0.22;

				globalGlitchDuration = currentGlitchIsMega
					? 45 + Math.floor(Math.random() * 30)
					: 15 + Math.floor(Math.random() * 25);

				orb?.setGlitchIntensity(currentGlitchIsMega ? 1.6 : 1);

				if (currentGlitchIsMega) {
					flashPulseFrames = FLASH_PULSE_TOTAL;
					terminalLine = TERMINAL_LINES[Math.floor(Math.random() * TERMINAL_LINES.length)];
					terminalFlashTotal = globalGlitchDuration + 10;
					terminalFlashFrames = terminalFlashTotal;
				}
			}

			if (globalGlitchActive) {
				globalGlitchDuration--;
				if (globalGlitchDuration <= 0) {
					globalGlitchActive = false;
					globalGlitchTimer = 0;
					nextGlitchAt =
						GLITCH_INTERVAL_MIN +
						Math.random() * (GLITCH_INTERVAL_MAX - GLITCH_INTERVAL_MIN);
					orb?.setGlitchIntensity(0);
				}
			}

			// ── NEW: brief full-canvas flash pulse (mega burst only) ──
			if (flashPulseFrames > 0) {
				ctx.save();
				ctx.globalAlpha = (flashPulseFrames / FLASH_PULSE_TOTAL) * 0.12;
				ctx.fillStyle = '#34d399';
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.restore();
				flashPulseFrames--;
			}

			if (globalGlitchActive) {
				const tearCount =
					(currentGlitchIsMega ? 5 : 2) +
					Math.floor(Math.random() * (currentGlitchIsMega ? 7 : 4));
				for (let t = 0; t < tearCount; t++) {
					const y = Math.random() * canvas.height;
					const h = currentGlitchIsMega ? 2 + Math.random() * 4 : 1 + Math.random() * 2;
					ctx.save();
					ctx.globalAlpha = 0.08 + Math.random() * 0.15;
					ctx.fillStyle = '#34d399';
					ctx.fillRect(0, y, canvas.width, h);
					ctx.restore();
				}
			}

			// ── Particles ──
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

				// Per-particle corruption — denser during a mega burst.
				const corruptChance = globalGlitchActive
					? currentGlitchIsMega
						? 0.09
						: 0.04
					: 0.003;
				if (!p.corrupted && Math.random() < corruptChance) {
					p.corrupted = true;
					p.corruptFrames = 3 + Math.floor(Math.random() * 8);
					p.text = FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)];
					p.x += (Math.random() - 0.5) * 30;
					p.y += (Math.random() - 0.5) * 15;
				}

				if (p.corrupted) {
					p.corruptFrames--;
					if (p.corruptFrames <= 0) p.corrupted = false;
				}

				// Respawn
				if (
					p.opacity <= 0 ||
					p.x < -80 ||
					p.x > canvas.width + 80 ||
					p.y < -80 ||
					p.y > canvas.height + 80
				) {
					particles[i] = spawn();
					continue;
				}

				const displayOpacity = p.corrupted ? Math.min(p.opacity * 3, 0.7) : p.opacity;

				if (p.corrupted) {
					// RGB channel split rendering
					ctx.save();
					ctx.globalCompositeOperation = 'lighter';
					ctx.font = `${p.size}px "Inconsolata", monospace`;

					ctx.globalAlpha = displayOpacity * 0.6;
					ctx.fillStyle = '#ff2040';
					ctx.fillText(p.text, p.x - 3, p.y);

					ctx.globalAlpha = displayOpacity;
					ctx.fillStyle = '#34d399';
					ctx.fillText(p.text, p.x, p.y);

					ctx.globalAlpha = displayOpacity * 0.5;
					ctx.fillStyle = '#3060ff';
					ctx.fillText(p.text, p.x + 2, p.y + 1);

					ctx.restore();
				} else {
					ctx.save();
					ctx.globalAlpha = displayOpacity;
					ctx.font = `${p.size}px "Inconsolata", monospace`;
					ctx.fillStyle = '#34d399';
					ctx.fillText(p.text, p.x, p.y);
					ctx.restore();
				}
			}

			const flickerChance = globalGlitchActive
				? currentGlitchIsMega
					? 0.32
					: 0.15
				: 0.01;
			if (Math.random() < flickerChance) {
				const y = Math.random() * canvas.height;
				const h = 1 + Math.random() * 4;
				ctx.save();
				ctx.globalAlpha = 0.03 + Math.random() * 0.06;
				ctx.fillStyle = '#34d399';
				ctx.fillRect(0, y, canvas.width, h);
				ctx.restore();
			}

			// ── NEW: typewriter-style terminal line (mega burst only) ──
			if (terminalFlashFrames > 0) {
				terminalFlashFrames--;
				const progress = 1 - terminalFlashFrames / terminalFlashTotal;
				const revealCount = Math.min(
					terminalLine.length,
					Math.floor(progress * terminalLine.length * 1.8)
				);
				const opacity = Math.sin(Math.min(Math.max(progress, 0), 1) * Math.PI);
				const cursor = revealCount < terminalLine.length ? '▌' : '';
				const shownText = terminalLine.slice(0, revealCount) + cursor;

				ctx.save();
				ctx.globalAlpha = Math.max(opacity, 0) * 0.85;
				ctx.font = '16px "Inconsolata", monospace';
				ctx.fillStyle = '#34d399';
				ctx.fillText(shownText, canvas.width * 0.05, canvas.height * 0.12);
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

	<div class="relative z-3 container mx-auto">
		<div class="flex items-center justify-center px-10 py-14 md:px-20 md:py-24">
			<div class="glitch-wrapper">
				<img
					src={DarkSignature}
					alt="Faisal Logo"
					class="glitch-img relative h-80 w-80 select-none sm:h-96 sm:w-96 md:h-112 md:w-md lg:h-128 lg:w-lg xl:h-144 xl:w-xl"
					loading="eager"
				/>
			</div>
		</div>
	</div>

	<div class="pointer-events-none absolute inset-0 z-4 noise-layer"></div>
</div>

<style>
	.glitch-wrapper {
		position: relative;
		display: inline-block;
	}

	.glitch-wrapper::before,
	.glitch-wrapper::after {
		content: '';
		position: absolute;
		inset: 0;
		background: inherit;
		pointer-events: none;
		opacity: 0;
	}

	.glitch-wrapper::before {
		animation: glitch-red 8s ease-in-out infinite;
	}

	.glitch-wrapper::after {
		animation: glitch-blue 8s ease-in-out infinite;
	}

	.glitch-img {
		animation: glitch-main 8s ease-in-out infinite;
	}

	@keyframes glitch-main {
		0%,
		85% {
			transform: translate(0);
			filter: none;
		}
		86% {
			transform: translate(0);
			filter: brightness(1.8);
		}
		87% {
			transform: translate(-6px, 2px);
			filter: hue-rotate(30deg) contrast(1.4);
			clip-path: polygon(
				0 0,
				100% 0,
				100% 15%,
				0 15%,
				0 25%,
				100% 25%,
				100% 45%,
				0 45%,
				0 55%,
				100% 55%,
				100% 70%,
				0 70%,
				0 80%,
				100% 80%,
				100% 100%,
				0 100%
			);
		}
		88.5% {
			transform: translate(8px, -3px);
			filter: hue-rotate(-40deg) saturate(2);
			clip-path: polygon(
				0 5%,
				100% 5%,
				100% 20%,
				0 20%,
				0 35%,
				100% 35%,
				100% 50%,
				0 50%,
				0 65%,
				100% 65%,
				100% 85%,
				0 85%,
				0 90%,
				100% 90%,
				100% 100%,
				0 100%
			);
		}
		89.5% {
			transform: translate(-12px, 0px) skewX(-2deg);
			filter: hue-rotate(60deg) saturate(3) brightness(1.3);
			clip-path: inset(30% 0 20% 0);
		}
		90.5% {
			transform: translate(5px, 4px) skewX(1deg);
			filter: hue-rotate(-20deg) contrast(1.6);
			clip-path: inset(10% 0 50% 0);
		}
		91% {
			transform: translate(-2px, -1px);
			filter: saturate(1.5);
			clip-path: none;
		}
		91.5% {
			transform: translate(3px, 1px);
			filter: brightness(0.7);
		}
		92% {
			transform: translate(-1px, 2px);
			filter: hue-rotate(15deg);
		}
		92.5% {
			transform: translate(0);
			filter: brightness(2);
		}
		93% {
			transform: translate(0);
			filter: none;
		}
		100% {
			transform: translate(0);
			filter: none;
		}
	}

	@keyframes glitch-red {
		0%,
		85% {
			opacity: 0;
			transform: translate(0);
		}
		86% {
			opacity: 0.4;
			transform: translate(-4px, -2px);
			filter: hue-rotate(-60deg) saturate(4) brightness(2);
			clip-path: inset(10% 0 40% 0);
			mix-blend-mode: screen;
		}
		88% {
			opacity: 0.6;
			transform: translate(-8px, 1px);
			clip-path: inset(30% 0 15% 0);
		}
		89.5% {
			opacity: 0.5;
			transform: translate(-12px, -3px);
			clip-path: inset(5% 0 55% 0);
		}
		91% {
			opacity: 0.3;
			transform: translate(-3px, 0);
			clip-path: none;
		}
		93% {
			opacity: 0;
			transform: translate(0);
		}
		100% {
			opacity: 0;
		}
	}

	@keyframes glitch-blue {
		0%,
		85% {
			opacity: 0;
			transform: translate(0);
		}
		86.5% {
			opacity: 0.35;
			transform: translate(3px, 2px);
			filter: hue-rotate(160deg) saturate(3) brightness(1.8);
			clip-path: inset(35% 0 20% 0);
			mix-blend-mode: screen;
		}
		88.5% {
			opacity: 0.5;
			transform: translate(7px, -1px);
			clip-path: inset(15% 0 35% 0);
		}
		90% {
			opacity: 0.45;
			transform: translate(10px, 2px);
			clip-path: inset(50% 0 5% 0);
		}
		91.5% {
			opacity: 0.25;
			transform: translate(2px, 0);
			clip-path: none;
		}
		93% {
			opacity: 0;
			transform: translate(0);
		}
		100% {
			opacity: 0;
		}
	}

	/* ═══════════════════════════════════════════
	 * SCANLINES — tighter, more visible
	 * ═══════════════════════════════════════════ */
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

	/* ═══════════════════════════════════════════
	 * NOISE GRAIN
	 * ═══════════════════════════════════════════ */
	.noise-layer {
		opacity: 0.04;
		animation: noise-shift 0.15s steps(4) infinite;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
	}

	@keyframes noise-shift {
		0% {
			transform: translate(0, 0);
		}
		25% {
			transform: translate(-4px, 4px);
		}
		50% {
			transform: translate(4px, -3px);
		}
		75% {
			transform: translate(-3px, -4px);
		}
		100% {
			transform: translate(0, 0);
		}
	}
</style>