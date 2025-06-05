<script lang="ts">
	import { fade } from 'svelte/transition';
	import { inview } from 'svelte-inview';
	import { t } from '$lib/translations';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import DocumentLink from '../DocumentLink.svelte';
	import { _welcomeTexts } from '$lib/constants/constant';

	let isInViewed: boolean;
	const options: Options = {
		rootMargin: '-15%',
		unobserveOnEnter: true
	};

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) =>
		(isInViewed = detail.inView);
</script>

<section
	class="about-section dark:bg-soft-black relative h-full max-h-full w-full max-w-full bg-black transition-colors duration-300 ease-in-out"
	use:inview={options}
	on:inview_change={handleChange}
>
	<div
		class="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,#000_20%,transparent_80%)] bg-[size:14px_24px]"
	></div>
	{#if isInViewed}
		<div class="relative z-10 container mx-auto" in:fade={{ duration: 1000 }}>
			<div
				id="about"
				class="flex min-h-screen flex-col justify-normal space-y-4 lg:flex-row lg:items-center lg:space-x-8 lg:py-24"
			>
				<!-- Left Side -->
				<div class="font-hanken-grotesk flex w-full flex-col space-y-4 pt-16 pb-8">
					<div class="font-inconsolata flex w-full flex-col space-y-2 px-8">
						<h1 class="text-4xl font-bold text-balance text-white md:text-5xl lg:text-7xl">
							Faisal Ramadhan
						</h1>
						<h6 class="text-2xl font-semibold text-balance text-white lg:text-3xl">
							Full Stack Developer
						</h6>
					</div>
					<div class="flex w-full flex-col space-y-8 px-8">
						<p class="text-base font-normal text-wrap whitespace-normal text-white md:text-lg">
							{$t('about.short_desc')}
						</p>
						<div
							class="flex w-full flex-row flex-wrap items-center justify-normal gap-5 lg:gap-0 lg:space-x-6"
						>
							<DocumentLink
								props={{
									link: 'https://drive.google.com/file/d/1Krl0gr29D7ZJWRIc8spswGlYOmdT5TaQ/view?usp=sharing',
									name: $t('about.links.first')
								}}
							/>
							<DocumentLink
								props={{
									link: 'https://drive.google.com/file/d/1CWNnv7h82f26WPMn-1P-MyjQc07ZHTQf/view?usp=sharing',
									name: $t('about.links.second')
								}}
							/>
							<DocumentLink
								props={{
									link: 'https://drive.google.com/file/d/10Y64DAU9lT8Afh-CQDfe04Mv-vqSiefv/view?usp=sharing',
									name: $t('about.links.third')
								}}
							/>
						</div>
					</div>
				</div>
				<!-- Right Side -->
				<div class="font-space-grotesk flex w-full flex-col space-y-4 pt-8 pb-16 lg:pt-0 lg:pb-0">
					<h6 class="px-8 text-lg font-bold text-wrap whitespace-normal text-white lg:text-xl">
						{$t('about.long_desc.opening')}
					</h6>
					<p class="px-8 text-base font-normal text-wrap whitespace-normal text-white lg:text-lg">
						{$t('about.long_desc.first')}
					</p>
					<p class="px-8 text-base font-normal text-wrap whitespace-normal text-white lg:text-lg">
						{$t('about.long_desc.second')}
					</p>
					<p class="px-8 text-base font-normal text-wrap whitespace-normal text-white lg:text-lg">
						{$t('about.long_desc.third')}
					</p>
				</div>
			</div>
		</div>
	{/if}
</section>
