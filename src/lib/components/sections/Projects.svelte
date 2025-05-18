<script lang="ts">
	import { t } from '$lib/translations';
	import ProjectCard from '../ProjectCard.svelte';
</script>

<section
	id="projects"
	class="dark:bg-soft-black font-hanken-grotesk max-h-full min-h-screen w-full max-w-full bg-black transition-colors duration-300 ease-in-out"
>
	<div class="container mx-auto">
		<div class="px-4 py-8 sm:px-5 sm:py-12 md:px-6 md:py-16 lg:px-7 lg:py-20 xl:px-8 xl:py-24">
			<p
				class="group font-space-grotesk relative mb-4 w-full text-center text-xl font-bold text-emerald-300 md:text-2xl lg:text-4xl xl:mb-8 dark:text-emerald-400"
			>
				{$t('content.projects.header')}
			</p>
			<div class="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
				<ProjectCard
					title={'Cakes Online Store'}
					description={`An online cake shop that I developed in 2024 as my personal project with a focus on
							frontend development using Sveltekit and Tailwind CSS.`}
					githubLink={'https://github.com/Kolong-Meja/Cake-Dungeon-Frontend-Template'}
					isDemoLinkExist={true}
					demoLink={'https://cakedungeon.netlify.app/'}
				/>
				<ProjectCard
					title={'PokeWiki Website'}
					description={`PokeWiki is a wiki website for finding information about Pokemon. This project is
						private and does not represent the Pokemon trademark.`}
					githubLink={'https://github.com/Kolong-Meja/pokewiki-website'}
					isDemoLinkExist={true}
					demoLink={'https://pokewiki-website.vercel.app'}
				/>
				<ProjectCard
					title={'MobilizeMate'}
					description={`A mobile-based sales and distribution application that aims to help make sales and distribution activities easier and more effective.`}
					githubLink={'https://github.com/MobilizeMate'}
					isDemoLinkExist={false}
				/>
			</div>
		</div>
	</div>
</section>
