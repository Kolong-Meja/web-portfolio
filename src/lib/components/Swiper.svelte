<script lang="ts">
	import { onMount } from 'svelte';
	import SwiperLib from 'swiper/bundle';
	import 'swiper/css/bundle';
	import SwiperContent from './SwiperContent.svelte';
	import { _achievedSkills } from '$lib/constants/constant';
	import { t } from '$lib/translations';

	let swiperContainer: HTMLDivElement;

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
			(now.getFullYear() - start.getFullYear()) * 12 +
			(now.getMonth() - start.getMonth());
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
			duration: 'Feb 2024 ─ Jun 2024 • 5 Months', // [BUG #3 FIX] was "Jun 2023"
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

	onMount(() => {
		const swiperInstance = new SwiperLib(swiperContainer, {
			speed: 800,
			direction: 'horizontal',
			loop: false,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true
			},
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
				dragSize: 'auto'
			}
		});

		return () => {
			swiperInstance.destroy(true, true);
		};
	});
</script>

<div
	bind:this={swiperContainer}
	class="swiper bg-soft-black dark:bg-soft-dark flex h-full w-full rounded-lg shadow-xl transition-colors duration-300 ease-in-out lg:w-[80vw]"
>
	<div class="swiper-wrapper">
		{#each experiences as exp (exp.name)}
			<div class="swiper-slide">
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
	<div class="swiper-scrollbar"></div>
</div>