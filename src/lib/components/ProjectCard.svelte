<script lang="ts">
	import { tiltCard } from '$lib/actions/tilt-card';
	import { magnetic } from '$lib/actions/magnetic';

	type ProjectCardProps = {
		title: string;
		desc: string;
		githubLink: string;
		isDemoLinkExist: boolean;
		demoLink?: string;
		techStack?: string[];
	};

	export let props: ProjectCardProps;
	export let index: number = 0;
</script>

<div
	use:tiltCard
	class="project-card group bg-soft-black dark:bg-soft-dark relative h-full w-full overflow-hidden rounded-2xl border border-white/10 p-6 shadow-xl transition-[border-color,box-shadow] duration-300 ease-out hover:border-emerald-400/40 hover:shadow-[0_0_45px_-12px_rgba(16,185,129,0.35)]"
	style="--spotlight-x: 50%; --spotlight-y: 50%;"
>
	<div
		class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		style="background: radial-gradient(480px circle at var(--spotlight-x) var(--spotlight-y), rgba(16,185,129,0.16), transparent 70%);"
	></div>
	<div class="relative z-10 flex h-full flex-col" style="transform: translateZ(40px);">
		<div class="mb-4 flex items-center justify-between">
			<div class="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-6 w-6 text-emerald-400"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
					/>
				</svg>
				<h5 class="ml-3 text-xl font-bold text-white">{props.title}</h5>
			</div>
			<span class="font-space-grotesk text-xs font-semibold text-white/30">
				{String(index + 1).padStart(2, '0')}
			</span>
		</div>

		<p class="mb-4 block flex-1 leading-normal font-light text-white/85">
			{props.desc}
		</p>

		{#if props.techStack?.length}
			<div class="mb-4 flex flex-wrap gap-1.5">
				{#each props.techStack as tech (tech)}
					<span
						class="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-white/70"
					>
						{tech}
					</span>
				{/each}
			</div>
		{/if}

		<div class="mt-auto flex flex-row space-x-3">
			<a
				use:magnetic
				href={props.githubLink}
				rel="external"
				class="flex flex-row items-center space-x-2 text-sm font-bold text-white transition-colors duration-300 ease-in-out hover:text-emerald-300 dark:hover:text-emerald-400"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					class="h-4 w-4 md:h-5 md:w-5"
					viewBox="0 0 16 16"
				>
					<path
						d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"
					/>
				</svg>
				Project Repository
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="ml-1 h-4 w-4 -rotate-40"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M14 5l7 7m0 0l-7 7m7-7H3"
					/>
				</svg>
			</a>
			{#if props.isDemoLinkExist}
				<a
					use:magnetic
					href={props.demoLink}
					rel="external"
					class="flex items-center space-x-2 text-sm font-bold text-white transition-colors duration-300 ease-in-out hover:text-emerald-300 dark:hover:text-emerald-400"
				>
					Live Demo
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="ml-1 h-3 w-3 -rotate-40"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</a>
			{/if}
		</div>
	</div>
</div>