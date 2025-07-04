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
	class="flex h-full w-full flex-row items-center justify-center px-8 py-6 lg:p-0 lg:px-12 lg:py-8"
>
	<div class="flex h-full flex-col items-start space-y-4">
		<div class="flex flex-col space-y-1 md:space-y-2">
			<h2 class="block text-xl font-semibold text-white lg:text-2xl">
				{props.name}
			</h2>
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
							<li class="text-base font-normal text-justify text-wrap text-white lg:text-lg">
								{desc}
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
		<div class="flex flex-row flex-wrap items-center gap-2">
			{#each props.skills.sort() as skill}
				<SkillsBadgeAnimated value={skill} />
			{/each}
		</div>
	</div>
</div>
