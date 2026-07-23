<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import { t } from '$lib/translations';
	import ProjectCard from '../ProjectCard.svelte';

	let isInViewed = $state(false);
	let prefersReducedMotion = $state(false);
	let activeFilter = $state<string | null>(null);

	const inviewOptions: Options = {
		rootMargin: '-15%',
		unobserveOnEnter: true
	};

	function handleChange({ detail }: CustomEvent<ObserverEventDetails>) {
		isInViewed = detail.inView;
	}

	onMount(() => {
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

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

	// Tech name -> how many projects use it, computed once from static data.
	const techEntries = $derived.by(() => {
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const counts = new Map<string, number>();
		for (const project of projects) {
			project.techStack?.forEach((tech) => counts.set(tech, (counts.get(tech) ?? 0) + 1));
		}
		return Array.from(counts.entries()).sort((a, b) => a[0].localeCompare(b[0]));
	});

	const filteredProjects = $derived(
		activeFilter ? projects.filter((project) => project.techStack?.includes(activeFilter!)) : projects
	);

	function revealParams(i: number) {
		return prefersReducedMotion
			? { y: 0, duration: 0, delay: 0 }
			: { y: 32, duration: 500, delay: i * 80 };
	}
</script>

<section
	class="project-section dark:bg-soft-black font-hanken-grotesk relative max-h-full min-h-screen w-full max-w-full bg-black transition-colors duration-300 ease-in-out"
	use:inview={inviewOptions}
	oninview_change={handleChange}
>
	<div class="relative z-10 container mx-auto">
		<div id="projects" class="px-4 py-8 sm:px-5 sm:py-12 md:px-6 md:py-16 lg:px-7 lg:py-20 xl:px-8 xl:py-24">
			{#if isInViewed}
				<div class="mb-6 flex flex-col items-center gap-2 text-center sm:mb-8" in:fade={{ duration: 800 }}>
					<span class="font-inconsolata text-xs tracking-[0.3em] text-emerald-400/70 uppercase sm:text-sm">
						// projects.ts
					</span>
					<p class="font-space-grotesk relative text-xl font-bold text-emerald-300 md:text-2xl lg:text-4xl dark:text-emerald-400">
						{String($t('content.projects.header')).toUpperCase()}
					</p>
					<span class="font-inconsolata text-xs text-white/30 sm:text-sm">
						{projects.length} repositories · filter by stack
					</span>
				</div>

				<div
					class="mb-6 flex flex-wrap items-center justify-center gap-2 sm:mb-10"
					role="group"
					aria-label="Filter projects by technology"
				>
					<button
						type="button"
						class="rounded-md border px-3 py-1.5 font-inconsolata text-xs transition-colors duration-200 sm:text-sm {activeFilter ===
						null
							? 'border-emerald-400/60 bg-emerald-400/10 text-emerald-300'
							: 'border-white/10 bg-white/2 text-white/50 hover:border-white/20 hover:text-white/80'}"
						aria-pressed={activeFilter === null}
						aria-label="Show all projects"
						onclick={() => (activeFilter = null)}
					>
						all ({projects.length})
					</button>
					{#each techEntries as [tech, count] (tech)}
						<button
							type="button"
							class="rounded-md border px-3 py-1.5 font-inconsolata text-xs transition-colors duration-200 sm:text-sm {activeFilter ===
							tech
								? 'border-emerald-400/60 bg-emerald-400/10 text-emerald-300'
								: 'border-white/10 bg-white/2 text-white/50 hover:border-white/20 hover:text-white/80'}"
							aria-pressed={activeFilter === tech}
							aria-label={`Filter by ${tech}`}
							onclick={() => (activeFilter = activeFilter === tech ? null : tech)}
						>
							#{tech} ({count})
						</button>
					{/each}
					<span class="sr-only" aria-live="polite">
						Showing {filteredProjects.length} of {projects.length} projects
					</span>
				</div>

				<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
					{#each filteredProjects as project, i (project.title)}
						<div
							class="project-card-wrapper perspective-[1000px]"
							in:fly={revealParams(i)}
							out:fade={{ duration: 200 }}
							animate:flip={{ duration: 350 }}
						>
							<ProjectCard props={project} index={i} />
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</section>