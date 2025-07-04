<script lang="ts">
	import { fade } from 'svelte/transition';
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import { t } from '$lib/translations';
	import Swiper from '../Swiper.svelte';

	let isInViewed: boolean;
	const options: Options = {
		rootMargin: '-30%',
		unobserveOnEnter: true
	};

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) =>
		(isInViewed = detail.inView);
</script>

<section
	class="experience-section dark:bg-soft-black font-hanken-grotesk max-h-full min-h-screen w-full max-w-full bg-black transition-colors duration-300 ease-in-out"
	use:inview={options}
	on:inview_change={handleChange}
>
	{#if isInViewed}
		<div
			class="max-h-full min-h-screen w-screen max-w-full transition-colors duration-300 ease-in-out"
			in:fade={{ duration: 1000 }}
		>
			<div class="container mx-auto">
				<div class="px-4 py-8 sm:px-5 sm:py-12 md:px-6 md:py-16 lg:px-7 lg:py-20 xl:px-8 xl:py-24">
					<p
						class="group font-space-grotesk relative mb-4 w-full text-center text-xl font-bold text-emerald-300 md:text-2xl lg:text-4xl xl:mb-8 dark:text-emerald-400"
					>
						{String($t('content.experience.header')).toUpperCase()}
					</p>
					<Swiper />
				</div>
			</div>
		</div>
	{/if}
</section>
