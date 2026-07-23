<script lang="ts">
	import { fade } from 'svelte/transition';
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import { t } from '$lib/translations';
	import { _experiences } from '$lib/constants/constant';
	import Swiper from '../Swiper.svelte';

	let isInViewed = $state(false);

	const options: Options = {
		rootMargin: '-30%',
		unobserveOnEnter: true
	};

	function handleChange({ detail }: CustomEvent<ObserverEventDetails>) {
		isInViewed = detail.inView;
	}
</script>

<section
	class="experience-section dark:bg-soft-black font-hanken-grotesk relative max-h-full min-h-screen w-full max-w-full bg-black transition-colors duration-300 ease-in-out"
	use:inview={options}
	oninview_change={handleChange}
>
	<div class="relative z-10 max-h-full min-h-screen w-screen max-w-full transition-colors duration-300 ease-in-out">
		<div id="experience" class="container mx-auto">
			{#if isInViewed}
				<div
					class="flex flex-col items-center px-4 py-8 sm:px-5 sm:py-12 md:px-6 md:py-16 lg:px-7 lg:py-20 xl:px-8 xl:py-24"
					in:fade={{ duration: 1000 }}
				>
					<div class="mb-6 flex flex-col items-center gap-2 text-center sm:mb-10">
						<span class="font-inconsolata text-xs tracking-[0.3em] text-emerald-400/70 uppercase sm:text-sm">
							// experience.log
						</span>
						<p class="font-space-grotesk relative text-xl font-bold text-emerald-300 md:text-2xl lg:text-4xl dark:text-emerald-400">
							{String($t('content.experience.header')).toUpperCase()}
						</p>
						<span class="font-inconsolata text-xs text-white/30 sm:text-sm">
							git log --oneline · {_experiences.length} entries
						</span>
					</div>
					<Swiper />
				</div>
			{/if}
		</div>
	</div>
</section>