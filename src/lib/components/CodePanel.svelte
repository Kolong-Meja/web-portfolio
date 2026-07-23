<script lang="ts">
	import { AlienFigure, AstronautFigure, UFOFigure } from '$lib';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.min.css';
	import { onDestroy, onMount } from 'svelte';
	import TypeIt from 'typeit';

	interface Props {
		value: string;
		typingSpeed?: number;
	}

	const { value, typingSpeed = 22 }: Props = $props();

	let codeEl: HTMLElement | undefined = $state();
	let copied = $state(false);
	let copyTimeout: ReturnType<typeof setTimeout> | undefined;

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(value);
			copied = true;
			clearTimeout(copyTimeout);
			copyTimeout = setTimeout(() => (copied = false), 1800);
		} catch (error) {
			console.error('Failed to copy the code snippet:', error);
		}
	}

	onMount(() => {
		if (!codeEl) return;
		hljs.highlightElement(codeEl);

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) {
			return;
		}

		const typer = new TypeIt(codeEl, {
			speed: typingSpeed,
			waitUntilVisible: true,
			loop: false,
			lifeLike: true,
			cursorChar: '▍'
		});
		typer.go();

		return () => typer.destroy();
	});

	onDestroy(() => clearTimeout(copyTimeout));
</script>

<div
	class="code-panel bg-soft-black dark:bg-soft-dark relative flex h-64 w-full flex-col overflow-hidden rounded-xl border border-white/5 shadow-2xl shadow-black/40 transition-colors duration-300 ease-in-out sm:h-72 md:h-96 lg:h-120 lg:w-140 xl:h-140 xl:w-160"
>
	<img
		src={AstronautFigure}
		alt=""
		aria-hidden="true"
		loading="lazy"
		class="pointer-events-none absolute -top-12 left-3 h-12 w-12 md:-top-16 md:left-4 md:h-16 md:w-16"
	/>
	<img
		src={AlienFigure}
		alt=""
		aria-hidden="true"
		loading="lazy"
		class="pointer-events-none absolute -top-12 right-20 h-12 w-14 md:-top-16 md:right-32 md:h-16 md:w-18"
	/>
	<img
		src={UFOFigure}
		alt=""
		aria-hidden="true"
		loading="lazy"
		class="pointer-events-none absolute -top-8 right-10 h-8 w-10 md:-top-12 md:right-16 md:h-12 md:w-14"
	/>

	<div class="flex shrink-0 flex-row items-center justify-between gap-2 border-b border-white/5 px-3 py-2">
		<div class="flex items-center gap-2">
			<span class="h-2.5 w-2.5 rounded-full bg-red-400 dark:bg-rose-400"></span>
			<span class="h-2.5 w-2.5 rounded-full bg-yellow-400 dark:bg-orange-300"></span>
			<span class="h-2.5 w-2.5 rounded-full bg-green-400 dark:bg-emerald-400"></span>
			<p class="font-inconsolata ml-2 text-xs text-white/70 sm:text-sm">skills.ts</p>
		</div>

		<button
			type="button"
			class="font-inconsolata flex items-center gap-1.5 rounded-md border border-white/10 px-2 py-1 text-[0.65rem] text-white/60 transition-colors duration-200 hover:border-emerald-400/50 hover:text-emerald-300 sm:text-xs"
			onclick={handleCopy}
		>
			{#if copied}
				<svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M20 6 9 17l-5-5" />
				</svg>
			{:else}
				<svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<rect x="9" y="9" width="12" height="12" rx="2" />
					<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
				</svg>
			{/if}
			{copied ? 'Copied!' : 'Copy'}
			<span class="sr-only" aria-live="polite">{copied ? 'Code copied to clipboard' : ''}</span>
		</button>
	</div>

	<pre class="min-h-0 flex-1 overflow-hidden"><code
			bind:this={codeEl}
			id="code"
			class="language-typescript block h-full overflow-x-auto overflow-y-auto overscroll-contain px-3 py-2 text-sm text-nowrap md:text-base"
		>{value}</code
		></pre>
</div>

<style>
	.code-panel :global(.hljs) {
		background: transparent;
	}
</style>