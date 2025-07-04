<script lang="ts">
	import { onMount } from 'svelte';
	import Swiper from 'swiper/bundle';
	import 'swiper/css/bundle';
	import SwiperContent from './SwiperContent.svelte';
	import { _achievedSkills } from '$lib/constants/constant';
	import { t } from '$lib/translations';

	onMount(() => {
		new Swiper('.swiper', {
			speed: 4000,
			direction: 'horizontal',
			loop: false,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			// pagination: {
			// 	el: '.swiper-pagination',
			// 	clickable: true
			// },
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
				dragSize: 'auto'
			}
		});
	});
</script>

<div
	class="swiper bg-soft-black dark:bg-soft-dark flex h-full w-full rounded-lg shadow-xl transition-colors duration-300 ease-in-out lg:w-[80vw]"
>
	<div class="swiper-wrapper">
		<div class="swiper-slide">
			<SwiperContent
				props={{
					name: 'PT. Citiasia, Inc.',
					contentTitle: 'Full Stack Developer ─ Internship',
					contentProject: 'SurveyAsia Website',
					contentDuration: 'Feb 2023 ─ Jun 2023 • 5 Months',
					contentDesc: $t('content.experience.body.citiasia.description').split('|'),
					skills: _achievedSkills._f
				}}
			/>
		</div>
		<div class="swiper-slide">
			<SwiperContent
				props={{
					name: 'PT. Sinergi Global Servis',
					contentTitle: 'IT Developer ─ Internship',
					contentProject: 'SIDIA (Sales Distribution Application)',
					contentDuration: 'Feb 2024 ─ Jun 2023 • 5 Months',
					contentDesc: $t('content.experience.body.sgs.description').split('|'),
					skills: _achievedSkills._s
				}}
			/>
		</div>
	</div>
	<div class="swiper-scrollbar"></div>
</div>
