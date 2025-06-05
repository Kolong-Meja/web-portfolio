<script lang="ts">
	type MarqueeContentProps = {
		texts: string[];
		fontSize: string;
	};

	export let props: MarqueeContentProps;
</script>

<div class="flex">
	{#each props.texts as text}
		<span
			class={`px-1.5 sm:px-1.75 md:px-2 lg:px-2.5 xl:px-3 ${props.fontSize} font-semibold text-emerald-400 dark:text-emerald-300`}
			>{text}</span
		>
	{/each}
</div>
