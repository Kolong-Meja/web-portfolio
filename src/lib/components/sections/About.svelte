<script lang="ts">
	import { t } from '$lib/translations';
</script>

<section
	class="about-section dark:bg-soft-black h-full max-h-full w-full max-w-full bg-black transition-colors duration-300 ease-in-out"
>
	<div class="container mx-auto">
		<div
			id="about"
			class="flex min-h-screen flex-col justify-normal space-y-4 lg:flex-row lg:items-center lg:space-x-8 lg:py-24"
		>
			<!-- Left Side -->
			<div class="font-hanken-grotesk flex w-full flex-col space-y-4 pt-16 pb-8">
				<div class="flex w-full flex-col space-y-2 px-8">
					<h1 class="text-4xl font-bold text-balance text-white md:text-5xl lg:text-7xl">
						Faisal Ramadhan
					</h1>
					<h6 class="text-2xl font-semibold text-balance text-white lg:text-3xl">
						Full Stack Developer
					</h6>
				</div>
				<div class="flex w-full flex-col space-y-8 px-8">
					<p class="text-base font-normal text-wrap whitespace-normal text-white md:text-lg">
						{$t('about.short_desc')}
					</p>
					<div
						class="flex w-full flex-row flex-wrap items-center justify-normal gap-5 lg:gap-0 lg:space-x-6"
					>
						<a
							href="https://drive.google.com/file/d/1Krl0gr29D7ZJWRIc8spswGlYOmdT5TaQ/view?usp=sharing"
						>
							<button class="group relative inline-block px-2.5 py-1.5 font-medium">
								<span
									class="absolute inset-0 h-full w-full -translate-x-1 translate-y-1 transform bg-emerald-400 transition duration-400 ease-out group-hover:-translate-x-0 group-hover:-translate-y-0 dark:bg-emerald-500"
								></span>
								<span
									class="bg-soft-black dark:group-hover:bg-soft-black absolute inset-0 h-full w-full border border-emerald-400 group-hover:bg-black dark:border-emerald-500 dark:bg-black"
								></span>
								<span class="relative text-emerald-300 dark:text-emerald-400"
									>{$t('about.links.first')}</span
								>
							</button>
						</a>

						<a
							href="https://drive.google.com/file/d/1CWNnv7h82f26WPMn-1P-MyjQc07ZHTQf/view?usp=sharing"
						>
							<button class="group relative inline-block px-2.5 py-1.5 font-medium">
								<span
									class="absolute inset-0 h-full w-full -translate-x-1 translate-y-1 transform bg-emerald-400 transition duration-400 ease-out group-hover:-translate-x-0 group-hover:-translate-y-0 dark:bg-emerald-500"
								></span>
								<span
									class="bg-soft-black dark:group-hover:bg-soft-black absolute inset-0 h-full w-full border border-emerald-400 group-hover:bg-black dark:border-emerald-500 dark:bg-black"
								></span>
								<span class="relative text-emerald-300 dark:text-emerald-400"
									>{$t('about.links.second')}</span
								>
							</button>
						</a>

						<a
							href="https://drive.google.com/file/d/10Y64DAU9lT8Afh-CQDfe04Mv-vqSiefv/view?usp=sharing"
						>
							<button class="group relative inline-block px-2.5 py-1.5 font-medium">
								<span
									class="absolute inset-0 h-full w-full -translate-x-1 translate-y-1 transform bg-emerald-400 transition duration-400 ease-out group-hover:-translate-x-0 group-hover:-translate-y-0 dark:bg-emerald-500"
								></span>
								<span
									class="bg-soft-black dark:group-hover:bg-soft-black absolute inset-0 h-full w-full border border-emerald-400 group-hover:bg-black dark:border-emerald-500 dark:bg-black"
								></span>
								<span class="relative text-emerald-300 dark:text-emerald-400"
									>{$t('about.links.third')}</span
								>
							</button>
						</a>
					</div>
				</div>
			</div>
			<!-- Right Side -->
			<div
				class="font-space-grotesk flex w-full flex-col space-y-4 border-t border-gray-900 pt-8 pb-16 lg:border-none lg:pt-0 lg:pb-0 dark:border-gray-800"
			>
				<h6 class="px-8 text-lg font-bold text-wrap whitespace-normal text-white lg:text-xl">
					{$t('about.long_desc.opening')}
				</h6>
				<p class="px-8 text-base font-normal text-wrap whitespace-normal text-white lg:text-lg">
					{$t('about.long_desc.first')}
				</p>
				<p class="px-8 text-base font-normal text-wrap whitespace-normal text-white lg:text-lg">
					{$t('about.long_desc.second')}
				</p>
				<p class="px-8 text-base font-normal text-wrap whitespace-normal text-white lg:text-lg">
					{$t('about.long_desc.third')}
				</p>
			</div>
		</div>
	</div>
</section>
