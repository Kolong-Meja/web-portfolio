<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/dist/ScrollTrigger';
	import { t } from '$lib/translations';
	import ProjectCard from '../ProjectCard.svelte';

	let sectionEl: HTMLElement;
	let cardsContainer: HTMLDivElement;
	let isInViewed: boolean;

	const inviewOptions: Options = {
		rootMargin: '-15%',
		unobserveOnEnter: true
	};

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) =>
		(isInViewed = detail.inView);

	interface ProjectEntry {
		title: string;
		desc: string;
		githubLink: string;
		isDemoLinkExist: boolean;
		demoLink?: string;
		techStack?: string[];
	}

	const projects: ProjectEntry[] = [
		{
			title: 'Cakes Online Store',
			desc: `An online cake shop that I developed in 2024 as my personal project with a focus on frontend development using Sveltekit and Tailwind CSS.`,
			githubLink: 'https://github.com/Kolong-Meja/Cake-Dungeon-Frontend-Template',
			isDemoLinkExist: true,
			demoLink: 'https://cakedungeon.netlify.app/',
			techStack: ['SvelteKit', 'Tailwind CSS']
		},
		{
			title: 'PokeWiki Website',
			desc: `PokeWiki is a wiki website for finding information about Pokemon. This project is private and does not represent the Pokemon trademark.`,
			githubLink: 'https://github.com/Kolong-Meja/pokewiki-website',
			isDemoLinkExist: true,
			demoLink: 'https://pokewiki-website.vercel.app'
		},
		{
			title: 'MobilizeMate',
			desc: `A mobile-based sales and distribution application that aims to help make sales and distribution activities easier and more effective.`,
			githubLink: 'https://github.com/MobilizeMate',
			isDemoLinkExist: false
		},
		{
			title: 'Allin CLI',
			desc: `A modern full-stack CLI tool based on TypeScript designed to accelerate your app development process — setup your entire stack in one seamless command.`,
			githubLink: 'https://github.com/Kolong-Meja/allin-cli',
			isDemoLinkExist: true,
			demoLink: 'https://www.npmjs.com/package/@faisalrmdhn08/allin-cli',
			techStack: ['TypeScript']
		},
		{
			title: 'Web Data Kendaraan Advance',
			desc: `Website Data Kendaraan menggunakan Vanilla Javascript + Spring Boot dengan tambahan Authentication System, API Caching, Pagination, API Rate Limiter, Logging File, etc.`,
			githubLink: 'https://github.com/Kolong-Meja/web-data-kendaraan-advance',
			isDemoLinkExist: false,
			techStack: ['Vanilla JavaScript', 'Spring Boot']
		}
	];

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);
		const cards = cardsContainer.querySelectorAll<HTMLElement>('.project-card-wrapper');

		const ctx = gsap.context(() => {
			gsap.set(cards, { opacity: 0, y: 48 });
			gsap.to(cards, {
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: 'power3.out',
				stagger: 0.12,
				scrollTrigger: {
					trigger: sectionEl,
					start: 'top 70%',
					once: true
				}
			});
		}, sectionEl);

		return () => ctx.revert();
	});
</script>

<section
	bind:this={sectionEl}
	class="project-section dark:bg-soft-black font-hanken-grotesk relative max-h-full min-h-screen w-full max-w-full bg-black transition-colors duration-300 ease-in-out"
	use:inview={inviewOptions}
	on:inview_change={handleChange}
>
	<div class="relative z-10 container mx-auto">
		<div id="projects" class="px-4 py-8 sm:px-5 sm:py-12 md:px-6 md:py-16 lg:px-7 lg:py-20 xl:px-8 xl:py-24">
			{#if isInViewed}
				<p
					class="group font-space-grotesk relative mb-4 w-full text-center text-xl font-bold text-emerald-300 md:text-2xl lg:text-4xl xl:mb-8 dark:text-emerald-400"
					in:fade={{ duration: 1000 }}
				>
					{String($t('content.projects.header')).toUpperCase()}
				</p>
			{/if}
			<div
				bind:this={cardsContainer}
				class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
			>
				{#each projects as project, i (project.title)}
					<div class="project-card-wrapper perspective-[1000px]">
						<ProjectCard props={project} index={i} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>