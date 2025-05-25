<script lang="ts">
	import { fade } from 'svelte/transition';
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import { t } from '$lib/translations';
	import ProjectCard from '../ProjectCard.svelte';

	let isInViewed: boolean;
	const options: Options = {
		rootMargin: '-30%',
		unobserveOnEnter: true
	};

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) =>
		(isInViewed = detail.inView);
</script>

<section
	class="project-section dark:bg-soft-black font-hanken-grotesk max-h-full min-h-screen w-full max-w-full bg-black transition-colors duration-300 ease-in-out"
	use:inview={options}
	on:inview_change={handleChange}
>
	{#if isInViewed}
		<div class="container mx-auto" in:fade={{ duration: 1200 }}>
			<div class="px-4 py-8 sm:px-5 sm:py-12 md:px-6 md:py-16 lg:px-7 lg:py-20 xl:px-8 xl:py-24">
				<p
					class="group font-space-grotesk relative mb-4 w-full text-center text-xl font-bold text-emerald-300 md:text-2xl lg:text-4xl xl:mb-8 dark:text-emerald-400"
				>
					{$t('content.projects.header')}
				</p>
				<div class="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
					<ProjectCard
						props={{
							title: 'Cakes Online Store',
							desc: `An online cake shop that I developed in 2024 as my personal project with a focus on frontend development using Sveltekit and Tailwind CSS.`,
							githubLink: 'https://github.com/Kolong-Meja/Cake-Dungeon-Frontend-Template',
							isDemoLinkExist: true,
							demoLink: 'https://cakedungeon.netlify.app/'
						}}
					/>
					<ProjectCard
						props={{
							title: 'PokeWiki Website',
							desc: `PokeWiki is a wiki website for finding information about Pokemon. This project is private and does not represent the Pokemon trademark.`,
							githubLink: 'https://github.com/Kolong-Meja/pokewiki-website',
							isDemoLinkExist: true,
							demoLink: 'https://pokewiki-website.vercel.app'
						}}
					/>
					<ProjectCard
						props={{
							title: 'MobilizeMate',
							desc: `A mobile-based sales and distribution application that aims to help make sales and distribution activities easier and more effective.`,
							githubLink: 'https://github.com/MobilizeMate',
							isDemoLinkExist: false
						}}
					/>
				</div>
			</div>
		</div>
	{/if}
</section>
