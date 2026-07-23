<script lang="ts">
	import { tiltCard } from '$lib/actions/tilt-card';
	import { magnetic } from '$lib/actions/magnetic';
	import { toSlug } from '$lib/constants/constant';
	import SkillsBadge from './SkillsBadge.svelte';

	type ProjectCardProps = {
		title: string;
		desc: string;
		githubLink: string;
		isDemoLinkExist: boolean;
		demoLink?: string;
		techStack?: string[];
	};

	interface Props {
		props: ProjectCardProps;
		index?: number;
	}

	const { props, index = 0 }: Props = $props();

	// svelte-ignore state_referenced_locally
	const path = toSlug(props.title);
	// svelte-ignore state_referenced_locally
	const isNpmLink = props.demoLink?.includes('npmjs.com') ?? false;
	const demoLabel = isNpmLink ? 'View on npm' : 'Live Demo';
</script>

<div
	use:tiltCard
	class="project-card group bg-soft-black dark:bg-soft-dark relative h-full w-full overflow-hidden rounded-2xl border border-white/10 p-5 shadow-xl transition-[border-color,box-shadow] duration-300 ease-out hover:border-emerald-400/40 hover:shadow-[0_0_45px_-12px_rgba(16,185,129,0.35)] sm:p-6"
	style="--spotlight-x: 50%; --spotlight-y: 50%;"
>
	<div
		class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		style="background: radial-gradient(480px circle at var(--spotlight-x) var(--spotlight-y), rgba(16,185,129,0.16), transparent 70%);"
	></div>

	<div class="relative z-10 flex h-full flex-col" style="transform: translateZ(40px);">
		<!-- Terminal-style header: fake window dots + fake path, echoes CodePanel's chrome -->
		<div class="mb-4 flex items-center justify-between gap-3 border-b border-white/5 pb-3">
			<div class="flex min-w-0 items-center gap-2.5">
				<span class="flex shrink-0 items-center gap-1.5" aria-hidden="true">
					<span class="h-2 w-2 rounded-full bg-red-400/70"></span>
					<span class="h-2 w-2 rounded-full bg-yellow-400/70"></span>
					<span class="h-2 w-2 rounded-full bg-green-400/70"></span>
				</span>
				<span class="font-inconsolata truncate text-xs text-white/35 sm:text-sm">
					~/projects/{path}
				</span>
			</div>
			<span class="font-inconsolata shrink-0 text-xs text-white/25 sm:text-sm">
				//{String(index + 1).padStart(2, '0')}
			</span>
		</div>

		<div class="mb-3 flex items-center gap-2.5">
			<span
				aria-hidden="true"
				class="font-space-grotesk flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-emerald-400/20 bg-emerald-400/10 text-sm font-bold text-emerald-300"
			>
				&lt;/&gt;
			</span>
			<h5 class="text-lg font-bold text-white sm:text-xl">{props.title}</h5>
		</div>

		<p class="mb-4 block flex-1 text-sm leading-relaxed font-light text-white/85 sm:text-base">
			{props.desc}
		</p>

		{#if props.techStack?.length}
			<ul class="mb-4 flex list-none flex-wrap items-center gap-2">
				{#each props.techStack as tech, i (tech)}
					<SkillsBadge skill={{ id: toSlug(tech), name: tech }} index={i} />
				{/each}
			</ul>
		{/if}

		<div class="mt-auto flex flex-row flex-wrap items-center gap-x-4 gap-y-2">
			<a
				use:magnetic
				href={props.githubLink}
				rel="external noopener noreferrer"
				target="_blank"
				class="flex flex-row items-center space-x-2 text-sm font-bold text-white transition-colors duration-300 ease-in-out hover:text-emerald-300 dark:hover:text-emerald-400"
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 16 16">
					<path
						d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
					/>
				</svg>
				Repository
				<svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-4 w-4 -rotate-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
				</svg>
			</a>

			{#if props.isDemoLinkExist}
				<a
					use:magnetic
					href={props.demoLink}
					rel="external noopener noreferrer"
					target="_blank"
					class="flex items-center space-x-2 text-sm font-bold text-white transition-colors duration-300 ease-in-out hover:text-emerald-300 dark:hover:text-emerald-400"
				>
					{demoLabel}
					<svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-3 w-3 -rotate-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
				</a>
			{:else}
				<span class="flex items-center gap-1.5 text-sm font-medium text-white/30">
					<svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
						<rect x="5" y="11" width="14" height="9" rx="1.5" />
						<path d="M8 11V7a4 4 0 0 1 8 0v4" />
					</svg>
					No public demo
				</span>
			{/if}
		</div>
	</div>
</div>