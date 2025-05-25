<script lang="ts">
	import { onMount } from 'svelte';
	import Swiper from 'swiper/bundle';
	import { CitiasiaLogo, MTGLogo, PeruriLogo } from '$lib';
	import { t } from '$lib/translations';

	import 'swiper/css/bundle';
	import SwiperContent from './SwiperContent.svelte';
	import { _achievedSkills } from '$lib/constants/constant';

	onMount(() => {
		let swiper = new Swiper('.swiper', {
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
	class="swiper bg-soft-black dark:bg-soft-dark flex h-[30rem] w-full rounded-lg transition-colors duration-300 ease-in-out sm:h-[25rem] md:h-[30rem] lg:h-[25rem] lg:w-[60rem]"
>
	<div class="swiper-wrapper">
		<div class="swiper-slide">
			<SwiperContent
				props={{
					logoSrc: CitiasiaLogo,
					name: 'PT Citiasia, Inc.',
					contentTitle: $t('content.experience.swipe.content.first.title'),
					contentDuration: $t('content.experience.swipe.content.first.duration'),
					contentDesc: $t('content.experience.swipe.content.first.desc'),
					skills: _achievedSkills._f
				}}
			/>
		</div>
		<div class="swiper-slide">
			<SwiperContent
				props={{
					logoSrc: MTGLogo,
					name: 'Martha Tilaar Group',
					contentTitle: $t('content.experience.swipe.content.second.title'),
					contentDuration: $t('content.experience.swipe.content.second.duration'),
					contentDesc: $t('content.experience.swipe.content.second.desc'),
					skills: _achievedSkills._s
				}}
			/>
		</div>
		<!-- <div class="swiper-slide">
			<SwiperContent
				props={{
					logoSrc: PeruriLogo,
					name: 'Perum Peruri',
					contentTitle: $t('content.experience.swipe.content.third.title'),
					contentDuration: $t('content.experience.swipe.content.third.duration'),
					contentDesc: $t('content.experience.swipe.content.third.desc'),
					skills: _achievedSkills._t
				}}
			/>
		</div> -->
	</div>
	<div class="swiper-scrollbar"></div>
</div>
