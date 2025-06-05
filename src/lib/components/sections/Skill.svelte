<script lang="ts">
	import SkillsBadge from '../SkillsBadge.svelte';
	import { t } from '$lib/translations';
	import { fade } from 'svelte/transition';
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import { _codePanelValue, _defaultSkills } from '$lib/constants/constant';
	import CodePanel from '../CodePanel.svelte';

	let isInViewed: boolean;
	const options: Options = {
		rootMargin: '-20%',
		unobserveOnEnter: true
	};

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) =>
		(isInViewed = detail.inView);
</script>

<section
	class="skill-section dark:bg-soft-black font-hanken-grotesk max-h-full min-h-screen w-screen max-w-full bg-black transition-colors duration-300 ease-in-out"
	use:inview={options}
	on:inview_change={handleChange}
>
	{#if isInViewed}
		<div class="container mx-auto" in:fade={{ duration: 1000 }}>
			<div class="px-4 py-8 sm:px-5 sm:py-12 md:px-6 md:py-16 lg:px-7 lg:py-20 xl:px-8 xl:py-24">
				<p
					class="group font-space-grotesk relative mb-6 w-full text-center text-xl font-bold text-emerald-300 md:text-2xl lg:text-4xl xl:mb-12 dark:text-emerald-400"
				>
					{$t('content.skills.header')}
				</p>
				<div
					class="flex w-full flex-col items-start space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4"
				>
					<CodePanel value={_codePanelValue} />
					<div class="flex flex-wrap items-center gap-3 p-2 sm:gap-4 lg:w-[35rem] xl:w-[40rem]">
						{#each _defaultSkills as skill}
							<SkillsBadge value={skill} />
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/if}
</section>
