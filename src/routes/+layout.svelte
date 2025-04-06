<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	interface Props {
		children: Snippet;
	}
	const { children }: Props = $props();
</script>

<Navbar />

<div>
	{@render children()}
</div>
