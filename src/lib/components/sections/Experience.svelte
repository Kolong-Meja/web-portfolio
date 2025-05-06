<script lang="ts">
	import { CitiasiaLogo, MTGLogo, PeruriLogo } from '$lib';
	import { t } from '$lib/translations';
	import { onMount } from 'svelte';
	import Swiper from 'swiper/bundle';

	import 'swiper/css/bundle';

	onMount(() => {
		const swiper = new Swiper('.swiper', {
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

<section
	id="experience"
	class="dark:bg-soft-black font-hanken-grotesk max-h-full min-h-screen w-full max-w-full bg-black transition-colors duration-300 ease-in-out"
>
	<div
		class="max-h-full min-h-screen w-screen max-w-full transition-colors duration-300 ease-in-out"
	>
		<!-- Animation -->
		
		<!-- End of Animation -->
		<div class="container mx-auto">
			<div class="px-4 py-8 sm:px-5 sm:py-12 md:px-6 md:py-16 lg:px-7 lg:py-20 xl:px-8 xl:py-24">
				<p
					class="group font-space-grotesk relative mb-4 w-full text-center text-xl font-bold text-emerald-300 md:text-2xl lg:text-4xl xl:mb-8 dark:text-emerald-400"
				>
					{$t('content.experience.header')}
				</p>
				<div
					class="swiper bg-soft-black dark:bg-soft-dark flex h-[30rem] w-full rounded-lg transition-colors duration-300 ease-in-out sm:h-[25rem] md:h-[30rem] lg:h-[25rem] lg:w-[60rem]"
				>
					<!-- Additional required wrapper -->
					<div class="swiper-wrapper">
						<!-- Slides -->
						<div class="swiper-slide">
							<div
								class="flex h-full w-full flex-row items-center justify-between gap-4 p-3 sm:gap-5 sm:p-4 md:gap-6 md:p-5"
							>
								<img
									src={CitiasiaLogo}
									alt="Citiasia Logo"
									class="hidden md:block md:h-[18rem] md:w-[18rem] lg:h-[20rem] lg:w-[20rem]"
									loading="lazy"
								/>
								<div class="flex flex-col space-y-4">
									<div class="flex flex-col space-y-1 md:space-y-2">
										<h4
											class="block text-base font-semibold text-gray-50 md:hidden dark:text-white"
										>
											PT. Citiasia, Inc.
										</h4>
										<h1
											class="text-xl font-bold text-emerald-400 sm:text-2xl lg:text-3xl dark:text-emerald-300"
										>
											{$t('content.experience.swipe.content.first.title')}
										</h1>
										<h6 class="text-lg font-normal text-gray-50 lg:text-xl dark:text-white">
											{$t('content.experience.swipe.content.first.duration')}
										</h6>
										<p
											class="text-base font-normal text-wrap text-gray-50 lg:text-lg dark:text-white"
										>
											{$t('content.experience.swipe.content.first.desc')}
										</p>
									</div>
									<div
										class="flex flex-row flex-wrap items-center justify-normal gap-2 lg:gap-0 lg:space-x-3"
									>
										<div
											class="group bg-soft-dark dark:bg-soft-black relative inline-flex items-center justify-start overflow-hidden rounded-full px-3 py-1 font-normal transition-colors duration-300 ease-in-out sm:py-1.5"
										>
											<span
												class="absolute top-0 left-0 h-32 w-32 translate-x-12 -translate-y-2 rotate-45 bg-emerald-400 opacity-[0%] dark:bg-emerald-300"
											></span>
											<span
												class="absolute top-0 left-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-emerald-400 opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8 dark:bg-emerald-300"
											></span>
											<span
												class="relative w-full text-left text-base font-normal text-gray-100 transition-colors duration-200 ease-in-out group-hover:text-black dark:text-gray-300"
												>Javascript</span
											>
										</div>
										<div
											class="group bg-soft-dark dark:bg-soft-black relative inline-flex items-center justify-start overflow-hidden rounded-full px-3 py-1 font-normal transition-colors duration-300 ease-in-out sm:py-1.5"
										>
											<span
												class="absolute top-0 left-0 h-32 w-32 translate-x-12 -translate-y-2 rotate-45 bg-emerald-400 opacity-[0%] dark:bg-emerald-300"
											></span>
											<span
												class="absolute top-0 left-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-emerald-400 opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8 dark:bg-emerald-300"
											></span>
											<span
												class="relative w-full text-left text-base font-normal text-gray-100 transition-colors duration-200 ease-in-out group-hover:text-black dark:text-gray-300"
												>PostgreSQL</span
											>
										</div>
										<div
											class="group bg-soft-dark dark:bg-soft-black relative inline-flex items-center justify-start overflow-hidden rounded-full px-3 py-1 font-normal transition-colors duration-300 ease-in-out sm:py-1.5"
										>
											<span
												class="absolute top-0 left-0 h-32 w-32 translate-x-12 -translate-y-2 rotate-45 bg-emerald-400 opacity-[0%] dark:bg-emerald-300"
											></span>
											<span
												class="absolute top-0 left-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-emerald-400 opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8 dark:bg-emerald-300"
											></span>
											<span
												class="relative w-full text-left text-base font-normal text-gray-100 transition-colors duration-200 ease-in-out group-hover:text-black dark:text-gray-300"
												>NestJS</span
											>
										</div>
										<div
											class="group bg-soft-dark dark:bg-soft-black relative inline-flex items-center justify-start overflow-hidden rounded-full px-3 py-1 font-normal transition-colors duration-300 ease-in-out sm:py-1.5"
										>
											<span
												class="absolute top-0 left-0 h-32 w-32 translate-x-12 -translate-y-2 rotate-45 bg-emerald-400 opacity-[0%] dark:bg-emerald-300"
											></span>
											<span
												class="absolute top-0 left-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-emerald-400 opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8 dark:bg-emerald-300"
											></span>
											<span
												class="relative w-full text-left text-base font-normal text-gray-100 transition-colors duration-200 ease-in-out group-hover:text-black dark:text-gray-300"
												>Typescript</span
											>
										</div>
										<div
											class="group bg-soft-dark dark:bg-soft-black relative inline-flex items-center justify-start overflow-hidden rounded-full px-3 py-1 font-normal transition-colors duration-300 ease-in-out sm:py-1.5"
										>
											<span
												class="absolute top-0 left-0 h-32 w-32 translate-x-12 -translate-y-2 rotate-45 bg-emerald-400 opacity-[0%] dark:bg-emerald-300"
											></span>
											<span
												class="absolute top-0 left-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-emerald-400 opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8 dark:bg-emerald-300"
											></span>
											<span
												class="relative w-full text-left text-base font-normal text-gray-100 transition-colors duration-200 ease-in-out group-hover:text-black dark:text-gray-300"
												>Laravel</span
											>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div
								class="flex h-full w-full flex-row items-center justify-between gap-4 p-3 sm:gap-5 sm:p-4 md:gap-6 md:p-5"
							>
								<img
									src={MTGLogo}
									alt="Martha Tilaar Group Logo"
									class="hidden rounded-lg md:block md:h-[18rem] md:w-[18rem]"
									loading="lazy"
								/>
								<div class="flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
									<div class="flex flex-col space-y-1 md:space-y-2">
										<h4
											class="block text-base font-semibold text-gray-50 md:hidden dark:text-white"
										>
											Martha Tilaar Group
										</h4>
										<h1
											class="text-xl font-bold text-emerald-400 sm:text-2xl lg:text-3xl dark:text-emerald-300"
										>
											{$t('content.experience.swipe.content.second.title')}
										</h1>
										<h6 class="text-lg font-normal text-gray-50 lg:text-xl dark:text-white">
											{$t('content.experience.swipe.content.second.duration')}
										</h6>
										<p
											class="text-base font-normal text-wrap text-gray-50 lg:text-lg dark:text-white"
										>
											{$t('content.experience.swipe.content.second.desc')}
										</p>
									</div>
									<div
										class="flex flex-row flex-wrap items-center justify-normal gap-3 lg:gap-0 lg:space-x-3"
									>
										<div
											class="group bg-soft-dark dark:bg-soft-black relative inline-flex items-center justify-start overflow-hidden rounded-full px-3 py-1 font-normal transition-colors duration-300 ease-in-out sm:py-1.5"
										>
											<span
												class="absolute top-0 left-0 h-32 w-32 translate-x-12 -translate-y-2 rotate-45 bg-emerald-400 opacity-[0%] dark:bg-emerald-300"
											></span>
											<span
												class="absolute top-0 left-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-emerald-400 opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8 dark:bg-emerald-300"
											></span>
											<span
												class="relative w-full text-left text-base font-normal text-gray-100 transition-colors duration-200 ease-in-out group-hover:text-black dark:text-gray-300"
												>Restful API</span
											>
										</div>
										<div
											class="group bg-soft-dark dark:bg-soft-black relative inline-flex items-center justify-start overflow-hidden rounded-full px-3 py-1 font-normal transition-colors duration-300 ease-in-out sm:py-1.5"
										>
											<span
												class="absolute top-0 left-0 h-32 w-32 translate-x-12 -translate-y-2 rotate-45 bg-emerald-400 opacity-[0%] dark:bg-emerald-300"
											></span>
											<span
												class="absolute top-0 left-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-emerald-400 opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8 dark:bg-emerald-300"
											></span>
											<span
												class="relative w-full text-left text-base font-normal text-gray-100 transition-colors duration-200 ease-in-out group-hover:text-black dark:text-gray-300"
												>Vue.js</span
											>
										</div>
										<div
											class="group bg-soft-dark dark:bg-soft-black relative inline-flex items-center justify-start overflow-hidden rounded-full px-3 py-1 font-normal transition-colors duration-300 ease-in-out sm:py-1.5"
										>
											<span
												class="absolute top-0 left-0 h-32 w-32 translate-x-12 -translate-y-2 rotate-45 bg-emerald-400 opacity-[0%] dark:bg-emerald-300"
											></span>
											<span
												class="absolute top-0 left-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-emerald-400 opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8 dark:bg-emerald-300"
											></span>
											<span
												class="relative w-full text-left text-base font-normal text-gray-100 transition-colors duration-200 ease-in-out group-hover:text-black dark:text-gray-300"
												>Ionic Framework</span
											>
										</div>
										<div
											class="group bg-soft-dark dark:bg-soft-black relative inline-flex items-center justify-start overflow-hidden rounded-full px-3 py-1 font-normal transition-colors duration-300 ease-in-out sm:py-1.5"
										>
											<span
												class="absolute top-0 left-0 h-32 w-32 translate-x-12 -translate-y-2 rotate-45 bg-emerald-400 opacity-[0%] dark:bg-emerald-300"
											></span>
											<span
												class="absolute top-0 left-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-emerald-400 opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8 dark:bg-emerald-300"
											></span>
											<span
												class="relative w-full text-left text-base font-normal text-gray-100 transition-colors duration-200 ease-in-out group-hover:text-black dark:text-gray-300"
												>Docker</span
											>
										</div>
										<div
											class="group bg-soft-dark dark:bg-soft-black relative inline-flex items-center justify-start overflow-hidden rounded-full px-3 py-1 font-normal transition-colors duration-300 ease-in-out sm:py-1.5"
										>
											<span
												class="absolute top-0 left-0 h-32 w-32 translate-x-12 -translate-y-2 rotate-45 bg-emerald-400 opacity-[0%] dark:bg-emerald-300"
											></span>
											<span
												class="absolute top-0 left-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-emerald-400 opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8 dark:bg-emerald-300"
											></span>
											<span
												class="relative w-full text-left text-base font-normal text-gray-100 transition-colors duration-200 ease-in-out group-hover:text-black dark:text-gray-300"
												>Figma</span
											>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="swiper-slide">
							<div
								class="flex h-full w-full flex-row items-center justify-between gap-4 p-3 sm:gap-5 sm:p-3 md:gap-6 md:p-4"
							>
								<img
									src={PeruriLogo}
									alt="Peruri Logo"
									class="hidden md:block md:h-[12rem] md:w-[18rem] lg:h-[14rem] lg:w-[20rem]"
									loading="lazy"
								/>
								<div class="flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
									<div class="flex flex-col space-y-1 md:space-y-2">
										<h4
											class="block text-base font-semibold text-gray-50 md:hidden dark:text-white"
										>
											Perum Peruri
										</h4>
										<h1
											class="text-xl font-bold text-emerald-400 sm:text-2xl lg:text-3xl dark:text-emerald-300"
										>
											{$t('content.experience.swipe.content.third.title')}
										</h1>
										<h6 class="text-lg font-normal text-gray-50 lg:text-xl dark:text-white">
											{$t('content.experience.swipe.content.third.duration')}
										</h6>
										<p
											class="text-base font-normal text-wrap text-gray-50 lg:text-lg dark:text-white"
										>
											{$t('content.experience.swipe.content.third.desc')}
										</p>
									</div>
									<div
										class="flex flex-row flex-wrap items-center justify-normal gap-3 lg:gap-0 lg:space-x-3"
									>
										<div
											class="group bg-soft-dark dark:bg-soft-black relative inline-flex items-center justify-start overflow-hidden rounded-full px-3 py-1 font-normal transition-colors duration-300 ease-in-out sm:py-1.5"
										>
											<span
												class="absolute top-0 left-0 h-32 w-32 translate-x-12 -translate-y-2 rotate-45 bg-emerald-400 opacity-[0%] dark:bg-emerald-300"
											></span>
											<span
												class="absolute top-0 left-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-emerald-400 opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8 dark:bg-emerald-300"
											></span>
											<span
												class="relative w-full text-left text-base font-normal text-gray-100 transition-colors duration-200 ease-in-out group-hover:text-black dark:text-gray-300"
												>Canva</span
											>
										</div>
										<div
											class="group bg-soft-dark dark:bg-soft-black relative inline-flex items-center justify-start overflow-hidden rounded-full px-3 py-1 font-normal transition-colors duration-300 ease-in-out sm:py-1.5"
										>
											<span
												class="absolute top-0 left-0 h-32 w-32 translate-x-12 -translate-y-2 rotate-45 bg-emerald-400 opacity-[0%] dark:bg-emerald-300"
											></span>
											<span
												class="absolute top-0 left-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-emerald-400 opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8 dark:bg-emerald-300"
											></span>
											<span
												class="relative w-full text-left text-base font-normal text-gray-100 transition-colors duration-200 ease-in-out group-hover:text-black dark:text-gray-300"
												>Zoom</span
											>
										</div>
										<div
											class="group bg-soft-dark dark:bg-soft-black relative inline-flex items-center justify-start overflow-hidden rounded-full px-3 py-1 font-normal transition-colors duration-300 ease-in-out sm:py-1.5"
										>
											<span
												class="absolute top-0 left-0 h-32 w-32 translate-x-12 -translate-y-2 rotate-45 bg-emerald-400 opacity-[0%] dark:bg-emerald-300"
											></span>
											<span
												class="absolute top-0 left-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-emerald-400 opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8 dark:bg-emerald-300"
											></span>
											<span
												class="relative w-full text-left text-base font-normal text-gray-100 transition-colors duration-200 ease-in-out group-hover:text-black dark:text-gray-300"
												>Vue.js</span
											>
										</div>
										<div
											class="group bg-soft-dark dark:bg-soft-black relative inline-flex items-center justify-start overflow-hidden rounded-full px-3 py-1 font-normal transition-colors duration-300 ease-in-out sm:py-1.5"
										>
											<span
												class="absolute top-0 left-0 h-32 w-32 translate-x-12 -translate-y-2 rotate-45 bg-emerald-400 opacity-[0%] dark:bg-emerald-300"
											></span>
											<span
												class="absolute top-0 left-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-emerald-400 opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8 dark:bg-emerald-300"
											></span>
											<span
												class="relative w-full text-left text-base font-normal text-gray-100 transition-colors duration-200 ease-in-out group-hover:text-black dark:text-gray-300"
												>Laravel</span
											>
										</div>
										<div
											class="group bg-soft-dark dark:bg-soft-black relative inline-flex items-center justify-start overflow-hidden rounded-full px-3 py-1 font-normal transition-colors duration-300 ease-in-out sm:py-1.5"
										>
											<span
												class="absolute top-0 left-0 h-32 w-32 translate-x-12 -translate-y-2 rotate-45 bg-emerald-400 opacity-[0%] dark:bg-emerald-300"
											></span>
											<span
												class="absolute top-0 left-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-emerald-400 opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8 dark:bg-emerald-300"
											></span>
											<span
												class="relative w-full text-left text-base font-normal text-gray-100 transition-colors duration-200 ease-in-out group-hover:text-black dark:text-gray-300"
												>Tailwind CSS</span
											>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- If we need scrollbar -->
					<div class="swiper-scrollbar"></div>
				</div>
			</div>
		</div>
	</div>
</section>
