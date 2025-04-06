<script lang="ts">
	import { AlienFigure, AstronautFigure, UFOFigure } from '$lib';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark-dimmed.css';
	import { onMount } from 'svelte';
	import TypeIt from 'typeit';

	const value = `const skills = [
  "Time Management",
  "Attention to Detail",
  "Adaptability",
  "Problem Solving",
  "Restful API Development",
  "Database Management Software",
  "Backend Development",
  "Frontend Development",
  "ERP Software Development",
  "Version Control Systems",
  "Linux Environments",
  "Docker",
  "Message Broker",
  "Microservices",
  "NoSQL Database",
  "Java",
  "PHP",
  "Javascript",
];

function expertise(skills: Array<string>): Array<string> {
  skills.sort((initial, next) => initial.localeCompare(next));
  return skills;
}

function main() {
  console.log(expertise(skills));
}

main();
`;

	const otherValue = `import (
	"cmp"
	"fmt"
	"slices"
)

func main() {
	skills := []string{
		"Time Management",
		"Attention to Detail",
		"Adaptability",
		"Problem Solving",
		"Restful API Development",
		"Database Management Software",
		"Backend Development",
		"Frontend Development",
		"ERP Software Development",
		"Version Control Systems",
		"Linux Environments",
		"Docker",
		"Message Broker",
		"Microservices",
		"NoSQL Database",
		"Java",
		"PHP",
		"Javascript",
	}

	e := expertise(skills)

	for i := range e {
		fmt.Println(e[i])
	}
}

func expertise(skills []string) []string {
	customSort := func(a, b string) int {
		return cmp.Compare(a, b)
	}

	slices.SortFunc(skills, customSort)

	return skills
}
`;

	onMount(() => {
		const panel = document.querySelector('pre #code') as HTMLElement;
		const otherPanel = document.querySelector('pre #other-code') as HTMLElement;

		hljs.highlightElement(panel);
		hljs.highlightElement(otherPanel);
		hljs.initHighlightingOnLoad();

		const codeTypeIt = new TypeIt('#code', {
			speed: 30,
			waitUntilVisible: true,
			loop: false,
			lifeLike: false
		});
		codeTypeIt.go();

		const otherCodeTypeIt = new TypeIt('#other-code', {
			speed: 30,
			waitUntilVisible: true,
			loop: false,
			lifeLike: false
		});
		otherCodeTypeIt.go();
	});
</script>

<section
	id="skill"
	class="dark:bg-soft-black max-h-full min-h-screen w-screen max-w-full bg-black transition-colors duration-300 ease-in-out"
>
	<div class="container mx-auto">
		<div
			class="flex flex-col w-full items-center space-y-4 px-4 py-8 sm:px-5 sm:py-12 md:px-6 md:py-16 lg:flex-row lg:space-y-0 lg:space-x-4 lg:px-7 lg:py-20 xl:px-8 xl:py-24"
		>
			<!-- Left Panel Code -->
			<pre
				class="bg-soft-black dark:bg-soft-dark relative flex w-full flex-col rounded-xl transition-colors duration-300 ease-in-out lg:w-[40rem]">
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
					class="language-typescript h-[25rem] overflow-x-auto rounded-b-xl text-sm md:text-base"
					>{value}</code
				>
    </pre>

			<!-- Right Panel Code -->
			<pre
				class="bg-soft-black dark:bg-soft-dark relative flex w-full flex-col rounded-xl transition-colors duration-300 ease-in-out lg:w-[40rem]">
      <div class="flex flex-row items-center justify-between p-2">
        <p class="text-base text-white">skills.go</p>
        <div class="flex flex-row items-center space-x-2">
          <div class="h-3 w-3 rounded-full bg-red-400 dark:bg-rose-400"></div>
          <div class="h-3 w-3 rounded-full bg-yellow-400 dark:bg-orange-300"></div>
          <div class="h-3 w-3 rounded-full bg-green-400 dark:bg-emerald-400"></div>
        </div>
      </div>
      <code
					id="other-code"
					class="language-go h-[25rem] overflow-x-auto rounded-b-xl text-sm md:text-base"
					>{otherValue}</code
				>
  </pre>
		</div>
	</div>
</section>
