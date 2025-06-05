<script lang="ts">
	import { onMount } from 'svelte';
	import Swiper from 'swiper/bundle';
	import 'swiper/css/bundle';
	import SwiperContent from './SwiperContent.svelte';
	import { _achievedSkills } from '$lib/constants/constant';

	const _citiasiaDesc = [
		'Developing backend RESTful API system using Laravel and NestJS framework.',
		'Create API documentation for mobile developer team using Swagger.',
		'Developing and refactoring the frontend interface of the website using Vue.js and Laravel Blade.',
		'Working in a team with Agile/Scrum methods.'
	];

	const _mtgDesc = [
		'Create and develop SIDIA (Sales Distribution Application) mobile app using the Vue.js and Ionic frameworks.',
		'Creating and developing Restful API system using Laravel to be consumed by the SIDIA (Sales Distribution Application) mobile app.',
		'Used Docker and Vite.js to accelerate mobile application development in development stage.',
		'Working in a team with RAD (Rapid Application Development) method.'
	];

	onMount(() => {
		new Swiper('.swiper', {
			speed: 2000,
			direction: 'horizontal',
			loop: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
				dragSize: 'auto'
			}
		});
	});
</script>

<div
	class="swiper bg-soft-black dark:bg-soft-dark flex h-full w-full rounded-lg shadow-2xl shadow-neutral-800/35 transition-colors duration-300 ease-in-out lg:w-[60rem]"
>
	<div class="swiper-wrapper">
		<div class="swiper-slide">
			<SwiperContent
				props={{
					name: 'PT Citiasia, Inc.',
					contentTitle: 'Full Stack Developer ─ Internship',
					contentProject: 'SurveyAsia Website',
					contentDuration: 'Feb 2023 ─ Jun 2023 • 5 Months',
					contentDesc: _citiasiaDesc,
					skills: _achievedSkills._f
				}}
			/>
		</div>
		<div class="swiper-slide">
			<SwiperContent
				props={{
					name: 'Martha Tilaar Group',
					contentTitle: 'IT Developer ─ Internship',
					contentProject: 'SIDIA (Sales Distribution Application)',
					contentDuration: 'Feb 2024 ─ Jun 2023 • 5 Months',
					contentDesc: _mtgDesc,
					skills: _achievedSkills._s
				}}
			/>
		</div>
	</div>
	<div class="swiper-scrollbar"></div>
</div>
