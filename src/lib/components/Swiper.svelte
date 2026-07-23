<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import SwiperLib from 'swiper/bundle';
	import 'swiper/css/bundle';
	import gsap from 'gsap';
	import SwiperContent from './SwiperContent.svelte';
	import { _experiences, resolveExperienceDuration as resolveDuration } from '$lib/constants/constant';
	import { t } from '$lib/translations';

	let swiperContainer: HTMLDivElement;
	let swiperInstance: SwiperInstance;
	let activeIndex = $state(0);
	let totalSlides = $state(0);
	let rafId: number | null = null;

	type SwiperInstance = InstanceType<typeof SwiperLib>;
	type ProgressSlide = HTMLElement & { progress?: number };

	const experiences = _experiences;

	// Whether each entry is the ongoing role — derived once from the shape of
	// `duration` (a function means "still counting", a string means "closed").
	const isOngoingFlags = experiences.map((exp) => typeof exp.duration === 'function');

	/** Deterministic 7-char pseudo commit hash — same company always renders the same "hash". Purely decorative. */
	function pseudoHash(input: string): string {
		let hash = 0;
		for (let i = 0; i < input.length; i++) {
			hash = (hash << 5) - hash + input.charCodeAt(i);
			hash |= 0;
		}
		return Math.abs(hash).toString(16).padStart(7, '0').slice(0, 7);
	}

	const PARALLAX_DEPTH = {
		header: 8,
		eyebrow: 6,
		title: 16,
		meta: 24,
		description: 12,
		badges: 34
	} as const;

	function applyParallax(swiper: SwiperInstance) {
		(swiper.slides as ProgressSlide[]).forEach((slideEl) => {
			const progress = Math.max(-1, Math.min(1, slideEl.progress ?? 0));
			const fade = 1 - Math.min(1, Math.abs(progress)) * 0.85;

			(Object.keys(PARALLAX_DEPTH) as Array<keyof typeof PARALLAX_DEPTH>).forEach((layer) => {
				const el = slideEl.querySelector<HTMLElement>(`[data-parallax-layer="${layer}"]`);
				if (!el) return;
				gsap.set(el, {
					yPercent: progress * -PARALLAX_DEPTH[layer],
					opacity: fade
				});
			});
		});
	}

	function scheduleParallax(swiper: SwiperInstance) {
		if (rafId !== null) return;
		rafId = requestAnimationFrame(() => {
			applyParallax(swiper);
			rafId = null;
		});
	}

	function goToSlide(index: number) {
		swiperInstance?.slideTo(index);
	}

	onMount(() => {
		swiperInstance = new SwiperLib(swiperContainer, {
			effect: 'cards',
			direction: 'horizontal',
			grabCursor: true,
			watchSlidesProgress: true,
			rewind: true,
			speed: 700,
			cardsEffect: {
				slideShadows: true,
				rotate: true,
				perSlideRotate: 3,
				perSlideOffset: 9
			},
			keyboard: {
				enabled: true,
				onlyInViewport: true
			},
			a11y: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true
			},
			navigation: {
				nextEl: '.swiper-next-custom',
				prevEl: '.swiper-prev-custom'
			},
			on: {
				init(swiper) {
					totalSlides = swiper.slides.length;
					activeIndex = swiper.activeIndex;
					applyParallax(swiper);
				},
				progress(swiper) {
					scheduleParallax(swiper);
				},
				slideChange(swiper) {
					activeIndex = swiper.activeIndex;
				}
			}
		});

		return () => {
			if (rafId !== null) cancelAnimationFrame(rafId);
			swiperInstance?.destroy(true, true);
		};
	});

	onDestroy(() => {
		if (rafId !== null) cancelAnimationFrame(rafId);
	});
</script>

<div class="flex w-full flex-col items-center gap-5 overflow-x-hidden overflow-y-visible lg:w-[80vw]">
	<div
		bind:this={swiperContainer}
		class="swiper h-124 w-full max-w-md sm:h-134 sm:max-w-lg lg:h-144 lg:max-w-xl"
	>
		<div class="swiper-wrapper">
			{#each experiences as exp, i (exp.name)}
				<div
					class="swiper-slide bg-soft-black dark:bg-soft-dark overflow-hidden rounded-2xl border border-white/5 shadow-2xl transition-colors duration-300 ease-in-out"
				>
					<SwiperContent
						props={{
							name: exp.name,
							contentTitle: exp.title,
							contentProject: exp.project,
							contentDuration: resolveDuration(exp.duration),
							contentDesc: $t(exp.descriptionKey).split('|'),
							skills: exp.skills,
							commitHash: pseudoHash(exp.name),
							isOngoing: isOngoingFlags[i]
						}}
					/>
				</div>
			{/each}
		</div>
	</div>

	<div class="flex w-full items-center justify-center gap-3 sm:gap-4">
		<button
			type="button"
			aria-label="Previous experience"
			class="swiper-prev-custom group flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-white/15 transition-colors duration-300 hover:border-emerald-400/60 focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:outline-none"
		>
			<svg class="h-3.5 w-3.5 stroke-white/60 transition-colors duration-300 group-hover:stroke-emerald-400" viewBox="0 0 24 24" fill="none" stroke-width="2">
				<path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>

		<div class="flex items-center" role="tablist" aria-label="Experience timeline">
			{#each experiences as exp, i (exp.name)}
				<div class="flex items-center">
					<button
						type="button"
						role="tab"
						aria-selected={activeIndex === i}
						aria-label={`${exp.name} — ${resolveDuration(exp.duration)}`}
						class="group relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:outline-none"
						onclick={() => goToSlide(i)}
					>
						{#if isOngoingFlags[i]}
							<span class="timeline-ping absolute h-3 w-3 rounded-full bg-emerald-400/50" aria-hidden="true"></span>
						{/if}
						<span
							class="relative h-2.5 w-2.5 rounded-full border-2 transition-all duration-300 {activeIndex === i
								? 'scale-125 border-emerald-400 bg-emerald-400'
								: isOngoingFlags[i]
									? 'border-emerald-400/70 bg-emerald-400/70'
									: 'border-white/25 bg-transparent group-hover:border-white/50'}"
						></span>
					</button>
					{#if i < experiences.length - 1}
						<span class="h-px w-6 bg-white/15 sm:w-10" aria-hidden="true"></span>
					{/if}
				</div>
			{/each}
		</div>

		<button
			type="button"
			aria-label="Next experience"
			class="swiper-next-custom group flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/15 transition-colors duration-300 hover:border-emerald-400/60 focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:outline-none"
		>
			<svg class="h-3.5 w-3.5 stroke-white/60 transition-colors duration-300 group-hover:stroke-emerald-400" viewBox="0 0 24 24" fill="none" stroke-width="2">
				<path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>
	</div>

	<div class="flex flex-col items-center gap-1 text-center sm:flex-row sm:gap-2">
		<span class="font-inconsolata text-xs text-emerald-400/70 sm:text-sm">
			commit {String(activeIndex + 1).padStart(2, '0')}/{String(totalSlides).padStart(2, '0')}
		</span>
		<span class="hidden text-white/20 sm:inline" aria-hidden="true">·</span>
		<span class="font-inconsolata text-xs text-white/40 sm:text-sm">
			{resolveDuration(experiences[activeIndex].duration)}
		</span>
	</div>
</div>

<style>
	.timeline-ping {
		animation: timeline-pulse 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	@keyframes timeline-pulse {
		75%,
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.timeline-ping {
			animation: none;
		}
	}
</style>