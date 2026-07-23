<script lang="ts">
	import SkillsBadgeAnimated from './SkillsBadgeAnimated.svelte';

	type SwiperContentProps = {
		name: string;
		contentTitle: string;
		contentProject: string;
		contentDuration: string;
		contentDesc: string[];
		skills: string[];
	};

	export let props: SwiperContentProps;
</script>

<div class="relative flex h-full w-full flex-col p-6 sm:p-7 lg:p-9">
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
		<ul class="list-inside list-disc space-y-1">
			{#each props.contentDesc as desc, i (`${i}-${desc}`)}
				<li class="text-justify text-sm font-normal text-wrap text-white/90 sm:text-lg">
					{desc}
				</li>
			{/each}
		</ul>
	</div>

	<div data-parallax-layer="badges" class="mt-4 flex shrink-0 flex-row flex-wrap items-center gap-2">
		{#each props.skills.sort() as skill, i (`${i}-${skill}`)}
			<SkillsBadgeAnimated value={skill} />
		{/each}
	</div>
</div>