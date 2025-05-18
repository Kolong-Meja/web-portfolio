<script lang="ts">
	import { AlienFigure, AstronautFigure, UFOFigure } from '$lib';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark-dimmed.css';
	import { onMount } from 'svelte';
	import TypeIt from 'typeit';
	import SkillsBadge from '../SkillsBadge.svelte';
	import { t } from '$lib/translations';

	const value = `const skills = [
  "Laravel",
  "Spring Boot",
  "NestJS",
  "Next.js",
  "Vue.js",
  "Sveltekit",
  "Git",
  "Docker",
  "PostgreSQL",
  "Typescript",
  "Java",
  "PHP",
  "Go",
  "Node.js",
  "Restful API",
  "Microservices",
  "Linux",
];

function expertise(skills: Array<string>): Array<string> {
  skills.sort(
    (initial, next) => initial.localeCompare(next)
  );
  return skills;
}

function main() {
  console.log(expertise(skills));
}

main();
`;

	const skills = [
		'Laravel',
		'Spring Boot',
		'NestJS',
		'Next.js',
		'Vue.js',
		'Sveltekit',
		'Git',
		'Docker',
		'PostgreSQL',
		'Typescript',
		'Java',
		'PHP',
		'Go',
		'Node.js',
		'Restful API',
		'Microservices',
		'Linux'
	];

	onMount(() => {
		const panel = document.querySelector('pre #code') as HTMLElement;

		hljs.highlightElement(panel);
		hljs.initHighlightingOnLoad();

		const codeTypeIt = new TypeIt('#code', {
			speed: 40,
			waitUntilVisible: true,
			loop: false,
			lifeLike: false
		});
		codeTypeIt.go();
	});
</script>

<section
	id="skill"
	class="dark:bg-soft-black font-hanken-grotesk max-h-full min-h-screen w-screen max-w-full bg-black transition-colors duration-300 ease-in-out"
>
	<div class="container mx-auto">
		<div class="px-4 py-8 sm:px-5 sm:py-12 md:px-6 md:py-16 lg:px-7 lg:py-20 xl:px-8 xl:py-24">
			<p
				class="group font-space-grotesk relative mb-6 w-full text-center text-xl font-bold text-emerald-300 md:text-2xl lg:text-4xl xl:mb-12 dark:text-emerald-400"
			>
				{$t('content.skills.header')}
			</p>
			<div class="flex w-full flex-col items-start space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
				<!-- Left Panel Code -->
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
						class="language-typescript h-[25rem] overflow-x-auto rounded-b-xl text-sm text-wrap md:text-base"
						>{value}</code
					>
      </pre>
				<div class="flex flex-wrap items-center gap-3 sm:gap-4 p-2 lg:w-[35rem] xl:w-[40rem]">
					{#each skills as skill}
						<SkillsBadge value={skill} />
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
