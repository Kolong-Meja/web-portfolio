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
	class="bg-soft-black dark:bg-soft-dark relative flex w-full flex-col rounded-xl transition-colors duration-300 ease-in-out lg:w-[35rem] xl:w-[40rem]">
        <img
		id="logo"
		src={AstronautFigure}
		alt="Astronaut Pixel Icon"
		class="show-on-scroll absolute top-[-3rem] left-3 h-[3rem] w-[3rem] md:top-[-4rem] md:left-4 md:h-[4rem] md:w-[4rem]"
		loading="lazy"
	/>
        <img
		id="logo"
		src={AlienFigure}
		alt="Astronaut Pixel Icon"
		class="show-on-scroll absolute top-[-3rem] right-20 h-[3rem] w-[3.5rem] md:top-[-4rem] md:right-32 md:h-[4rem] md:w-[4.5rem]"
		loading="lazy"
	/>
        <img
		id="logo"
		src={UFOFigure}
		alt="Astronaut Pixel Icon"
		class="show-on-scroll absolute top-[-2rem] right-10 h-[2rem] w-[2.5rem] md:top-[-3rem] md:right-16 md:h-[3rem] md:w-[3.5rem]"
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
		class="language-typescript h-[35rem] overflow-x-auto rounded-b-xl text-sm text-nowrap md:text-base"
		>{value}</code
	>
      </pre>
