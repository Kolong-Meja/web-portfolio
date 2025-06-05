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

<div
	class="flex h-full w-full flex-row items-center justify-between gap-4 p-3 sm:gap-5 sm:p-4 md:gap-6 md:p-5"
>
	<div class="flex flex-col space-y-4">
		<div class="flex flex-col space-y-1 md:space-y-2">
			<h4 class="block text-base font-semibold text-white md:hidden">
				{props.name}
			</h4>
			<div class="flex flex-col space-y-2 md:space-y-4">
				<div class="flex flex-col">
					<h1
						class="text-xl font-bold text-emerald-400 sm:text-2xl lg:text-3xl dark:text-emerald-300"
					>
						{props.contentTitle}
					</h1>
					<h6 class="text-lg font-normal text-white lg:text-xl">
						{props.contentDuration}
					</h6>
				</div>
				<div class="flex flex-col">
					<h6 class="text-base font-normal text-white lg:text-lg">
						Project: <span class="font-bold">{props.contentProject}</span>
					</h6>
					<ul class="list-inside list-disc">
						{#each props.contentDesc as desc}
							<li class="text-base font-normal text-wrap text-white lg:text-lg">
								{desc}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
		<div class="flex flex-row flex-wrap items-center justify-normal gap-2 lg:space-x-3">
			{#each props.skills as skill}
				<SkillsBadgeAnimated value={skill} />
			{/each}
		</div>
	</div>
</div>
