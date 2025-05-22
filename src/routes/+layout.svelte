<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}
	const { children }: Props = $props();
</script>

<div>
	{@render children()}
</div>
