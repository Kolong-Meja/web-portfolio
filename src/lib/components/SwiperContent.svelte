<script lang="ts">
	import { toSlug } from '$lib/constants/constant';
	import SkillsBadge from './SkillsBadge.svelte';

	type SwiperContentProps = {
		name: string;
		contentTitle: string;
		contentProject: string;
		contentDuration: string;
		contentDesc: string[];
		skills: string[];
		commitHash: string;
		isOngoing: boolean;
	};

	interface Props {
		props: SwiperContentProps;
	}

	const { props }: Props = $props();
</script>

<div class="relative flex h-full w-full flex-col p-6 sm:p-7 lg:p-9">
	<div
		data-parallax-layer="header"
		class="mb-2 flex shrink-0 items-center justify-between gap-2 font-inconsolata text-xs text-white/35 sm:text-sm"
	>
		<span>commit {props.commitHash}</span>
		{#if props.isOngoing}
			<span class="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-emerald-300">
				<span class="relative flex h-1.5 w-1.5" aria-hidden="true">
					<span class="status-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
					<span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
				</span>
				current
			</span>
		{:else}
			<span class="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-white/40">
				✓ merged
			</span>
		{/if}
	</div>

	<div class="shrink-0 space-y-1">
		<p
			data-parallax-layer="eyebrow"
			class="font-space-grotesk text-xs font-semibold tracking-[0.2em] text-white/60 uppercase sm:text-sm"
		>
			{props.name}
		</p>
		<h1
			data-parallax-layer="title"
			class="text-xl leading-tight font-bold text-emerald-400 sm:text-2xl lg:text-3xl dark:text-emerald-300"
		>
			{props.contentTitle}
		</h1>
		<h6 class="text-sm font-normal text-white/80 sm:text-base">
			{props.contentDuration}
		</h6>
	</div>

	<p data-parallax-layer="meta" class="mt-3 shrink-0 text-sm font-normal text-white sm:text-base">
		Project: <span class="font-bold">{props.contentProject}</span>
	</p>

	<div
		data-parallax-layer="description"
		class="mt-3 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain pr-1"
	>
		<ul class="space-y-1.5">
			{#each props.contentDesc as desc, i (`${i}-${desc}`)}
				<li class="flex gap-2 text-sm font-normal text-white/90 sm:text-lg">
					<span class="font-inconsolata mt-0.5 shrink-0 text-emerald-400/70" aria-hidden="true">+</span>
					<span class="text-wrap text-justify">{desc}</span>
				</li>
			{/each}
		</ul>
	</div>

	<ul
		data-parallax-layer="badges"
		class="mt-4 flex list-none shrink-0 flex-row flex-wrap items-center gap-2"
	>
		{#each props.skills.slice().sort() as skill, i (`${i}-${skill}`)}
			<SkillsBadge skill={{ id: toSlug(skill), name: skill }} index={i} />
		{/each}
	</ul>
</div>

<style>
	.status-ping {
		animation: status-pulse 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	@keyframes status-pulse {
		75%,
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.status-ping {
			animation: none;
		}
	}
</style>