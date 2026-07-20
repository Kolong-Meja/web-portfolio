<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import SwiperLib from 'swiper/bundle';
	import 'swiper/css/bundle';
	import gsap from 'gsap';
	import SwiperContent from './SwiperContent.svelte';
	import { _achievedSkills } from '$lib/constants/constant';
	import { t } from '$lib/translations';

	let swiperContainer: HTMLDivElement;
	let swiperInstance: SwiperInstance;
	let activeIndex = 0;
	let totalSlides = 0;
	let rafId: number | null = null;

	type SwiperInstance = InstanceType<typeof SwiperLib>;
	type ProgressSlide = HTMLElement & { progress?: number };

	interface ExperienceEntry {
		name: string;
		title: string;
		project: string;
		duration: string | (() => string);
		descriptionKey: string;
		skills: string[];
	}

	function computeOngoingDuration(startYear: number, startMonth: number, startLabel: string): string {
		const now = new Date();
		const start = new Date(startYear, startMonth);
		const months =
			(now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
		const monthName = now.toLocaleDateString('en-US', { month: 'short' });

		return `${startLabel} ─ ${monthName} ${now.getFullYear()} • ${months} ${months === 1 ? 'Month' : 'Months'}`;
	}

	const experiences: ExperienceEntry[] = [
		{
			name: 'PT. Citiasia, Inc.',
			title: 'Full Stack Developer ─ Internship',
			project: 'SurveyAsia Website',
			duration: 'Feb 2023 ─ Jun 2023 • 5 Months',
			descriptionKey: 'content.experience.body.citiasia.description',
			skills: _achievedSkills._f
		},
		{
			name: 'PT. Sinergi Global Servis',
			title: 'IT Developer ─ Internship',
			project: 'SIDIA (Sales Distribution Application)',
			duration: 'Feb 2024 ─ Jun 2024 • 5 Months',
			descriptionKey: 'content.experience.body.sgs.description',
			skills: _achievedSkills._s
		},
		{
			name: 'PT. Astra Honda Motor',
			title: 'Junior Developer',
			project: 'AHMAS (Astra Honda Management Assistant System)',
			duration: () => computeOngoingDuration(2025, 7, 'Aug 2025'),
			descriptionKey: 'content.experience.body.ahm.description',
			skills: _achievedSkills._t
		}
	];

	function resolveDuration(d: string | (() => string)): string {
		return typeof d === 'function' ? d() : d;
	}

	const PARALLAX_DEPTH = {
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

<div class="flex w-full flex-col items-center gap-5 lg:w-[80vw]">
	<div
		bind:this={swiperContainer}
		class="swiper h-120 w-full max-w-md sm:h-130 sm:max-w-lg lg:h-140 lg:max-w-xl"
	>
		<div class="swiper-wrapper">
			{#each experiences as exp (exp.name)}
				<div
					class="swiper-slide bg-soft-black dark:bg-soft-dark overflow-hidden rounded-2xl shadow-2xl transition-colors duration-300 ease-in-out"
				>
					<SwiperContent
						props={{
							name: exp.name,
							contentTitle: exp.title,
							contentProject: exp.project,
							contentDuration: resolveDuration(exp.duration),
							contentDesc: $t(exp.descriptionKey).split('|'),
							skills: exp.skills
						}}
					/>
				</div>
			{/each}
		</div>
	</div>

	<div class="flex items-center gap-6">
		<button
			type="button"
			aria-label="Previous experience"
			class="swiper-prev-custom group flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors duration-300 hover:border-emerald-400"
		>
			<svg class="h-4 w-4 stroke-white transition-colors duration-300 group-hover:stroke-emerald-400" viewBox="0 0 24 24" fill="none" stroke-width="2">
				<path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>

		<span class="font-space-grotesk text-sm tracking-widest text-white/70">
			{String(activeIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
		</span>

		<button
			type="button"
			aria-label="Next experience"
			class="swiper-next-custom group flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors duration-300 hover:border-emerald-400"
		>
			<svg class="h-4 w-4 stroke-white transition-colors duration-300 group-hover:stroke-emerald-400" viewBox="0 0 24 24" fill="none" stroke-width="2">
				<path d="M9 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>
	</div>
</div>