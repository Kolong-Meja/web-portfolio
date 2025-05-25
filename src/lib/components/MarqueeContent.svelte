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
			class={`px-1.25 sm:px-1.5 md:px-1.75 lg:px-2 xl:px-2.5 ${props.fontSize} font-semibold text-white`}
			>{text}</span
		>
	{/each}
</div>
