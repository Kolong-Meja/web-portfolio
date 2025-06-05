<script lang="ts">
	import MarqueeContent from './MarqueeContent.svelte';

	type MarqueeProps = {
		texts: string[];
		fontSize: string;
	};

	export let props: MarqueeProps;
</script>

<div class="font-space-grotesk absolute -bottom-1 overflow-hidden whitespace-nowrap">
	<div class="animate-marquee flex w-max transition-colors duration-300 ease-in-out">
		<MarqueeContent props={{ texts: props.texts, fontSize: props.fontSize }} />
		<MarqueeContent props={{ texts: props.texts, fontSize: props.fontSize }} />
	</div>
</div>
