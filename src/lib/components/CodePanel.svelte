<script lang="ts">
	import { AlienFigure, AstronautFigure, UFOFigure } from '$lib';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.min.css';
	import { onMount } from 'svelte';
	import TypeIt from 'typeit';

	export let value: string;

	onMount(() => {
		const panel = document.querySelector('pre #code') as HTMLElement;

		hljs.highlightElement(panel);
		hljs.highlightAll();

		const codeTypeIt = new TypeIt('#code', {
				speed: 0,
				waitUntilVisible: false,
				loop: false,
				lifeLike: true
			});
			codeTypeIt.go();
	});
</script>

<pre
	class="bg-soft-black dark:bg-soft-dark relative flex w-full flex-col rounded-xl transition-colors duration-300 ease-in-out lg:w-140 xl:w-160">
        <img
		id="logo"
		src={AstronautFigure}
		alt="Astronaut Pixel Icon"
		class="show-on-scroll absolute -top-12 left-3 h-12 w-12 md:-top-16 md:left-4 md:h-16 md:w-16"
		loading="lazy"
	/>
        <img
		id="logo"
		src={AlienFigure}
		alt="Astronaut Pixel Icon"
		class="show-on-scroll absolute -top-12 right-20 h-12 w-14 md:-top-16 md:right-32 md:h-16 md:w-18"
		loading="lazy"
	/>
        <img
		id="logo"
		src={UFOFigure}
		alt="Astronaut Pixel Icon"
		class="show-on-scroll absolute -top-8 right-10 h-8 w-10 md:-top-12 md:right-16 md:h-12 md:w-14"
		loading="lazy"
	/>
          <div class="flex flex-row items-center justify-between p-2">
            <p class="text-base text-white">skills.ts</p>
            <div class="flex flex-row items-center space-x-2">
              <div class="h-3 w-3 rounded-full bg-red-400 dark:bg-rose-400"></div>
              <div class="h-3 w-3 rounded-full bg-yellow-400 dark:bg-orange-300"></div>
              <div class="h-3 w-3 rounded-full bg-green-400 dark:bg-emerald-400"></div>
            </div>
          </div>
          <code
		id="code"
		class="language-typescript h-140 overflow-x-auto rounded-b-xl text-sm text-nowrap md:text-base"
		>{value}</code
	>
      </pre>
