<script lang="ts">
	import SkillsBadgeAnimated from './SkillsBadgeAnimated.svelte';

	type SwiperContentProps = {
		logoSrc: string;
		name: string;
		contentTitle: string;
		contentDuration: string;
		contentDesc: string;
		skills: string[];
	};

	export let props: SwiperContentProps;
</script>

<div
	class="flex h-full w-full flex-row items-center justify-between gap-4 p-3 sm:gap-5 sm:p-4 md:gap-6 md:p-5"
>
	<img
		src={props.logoSrc}
		alt="Citiasia Logo"
		class="hidden md:block md:h-[18rem] md:w-[18rem] lg:h-[20rem] lg:w-[20rem] rounded-full"
		loading="lazy"
	/>
	<div class="flex flex-col space-y-4">
		<div class="flex flex-col space-y-1 md:space-y-2">
			<h4 class="block text-base font-semibold md:hidden text-white">
				{props.name}
			</h4>
			<h1 class="text-xl font-bold text-emerald-400 sm:text-2xl lg:text-3xl dark:text-emerald-300">
				{props.contentTitle}
			</h1>
			<h6 class="text-lg font-normal lg:text-xl text-white">
				{props.contentDuration}
			</h6>
			<p class="text-base font-normal text-wrap lg:text-lg text-white">
				{props.contentDesc}
			</p>
		</div>
		<div class="flex flex-row flex-wrap items-center justify-normal gap-2 lg:space-x-3">
			{#each props.skills as skill}
				<SkillsBadgeAnimated value={skill} />
			{/each}
		</div>
	</div>
</div>
