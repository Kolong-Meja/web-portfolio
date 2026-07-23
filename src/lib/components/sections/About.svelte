<script lang="ts">
	import { fade } from 'svelte/transition';
	import { inview } from 'svelte-inview';
	import { t } from '$lib/translations';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import DocumentLink from '../DocumentLink.svelte';

	let isInViewed = $state(false);

	const options: Options = {
		rootMargin: '-15%',
		unobserveOnEnter: true
	};

	function handleChange({ detail }: CustomEvent<ObserverEventDetails>) {
		isInViewed = detail.inView;
	}

	interface DocLink {
		id: string;
		link: string;
		translationKey: string;
	}

	const documentLinks: DocLink[] = [
		{
			id: 'cv',
			link: 'https://drive.google.com/file/d/1Krl0gr29D7ZJWRIc8spswGlYOmdT5TaQ/view?usp=sharing',
			translationKey: 'about.links.first'
		},
		{
			id: 'certificates',
			link: 'https://drive.google.com/file/d/1CWNnv7h82f26WPMn-1P-MyjQc07ZHTQf/view?usp=sharing',
			translationKey: 'about.links.second'
		},
		{
			id: 'portfolio',
			link: 'https://drive.google.com/file/d/10Y64DAU9lT8Afh-CQDfe04Mv-vqSiefv/view?usp=sharing',
			translationKey: 'about.links.third'
		}
	];

	const longDescKeys = ['about.long_desc.first', 'about.long_desc.second', 'about.long_desc.third'];
</script>

<section
	class="about-section dark:bg-soft-black relative h-full max-h-full w-full max-w-full bg-black transition-colors duration-300 ease-in-out"
	use:inview={options}
	oninview_change={handleChange}
>
	<div id="about" class="relative z-10 container mx-auto">
		{#if isInViewed}
			<div
				class="flex min-h-screen flex-col justify-normal space-y-4 lg:flex-row lg:items-center lg:space-x-8 lg:py-24"
				in:fade={{ duration: 1000 }}
			>
				<div class="font-hanken-grotesk flex w-full flex-col space-y-5 pt-16 pb-8">
					<span aria-hidden="true" class="font-inconsolata px-5 text-xs sm:px-8 sm:text-sm">
						<span class="text-violet-400/80">const</span>
						<span class="text-white/60">developer</span><span class="text-white/30">:</span>
						<span class="text-emerald-300/80">Developer</span>
						<span class="text-white/30"> = &#123;</span>
					</span>

					<div class="flex w-full flex-col space-y-2 px-5 sm:px-8">
						<h1 class="text-4xl font-bold text-balance text-white md:text-5xl lg:text-7xl">
							Faisal Ramadhan
						</h1>
						<h2 class="text-2xl font-semibold text-balance text-white lg:text-3xl">
							Full Stack Developer
						</h2>
					</div>

					<div class="flex w-full flex-col space-y-6 px-5 sm:px-8">
						<p class="text-base font-normal text-wrap text-white md:text-lg">
							{$t('about.short_desc')}
						</p>

						<div class="flex w-full flex-col gap-2.5">
							<span aria-hidden="true" class="font-inconsolata text-xs text-white/40 sm:text-sm">
								documents: [
							</span>
							<div class="flex w-full flex-col gap-2 pl-2 sm:gap-2.5 sm:pl-4">
								{#each documentLinks as doc, i (doc.id)}
									<DocumentLink
										props={{
											link: doc.link,
											name: $t(doc.translationKey),
											fileId: doc.id
										}}
										index={i}
									/>
								{/each}
							</div>
							<span aria-hidden="true" class="font-inconsolata text-xs text-white/40 sm:text-sm"
								>],</span
							>
						</div>
					</div>

					<span
						aria-hidden="true"
						class="font-inconsolata px-5 text-xs text-white/30 sm:px-8 sm:text-sm">&#125;;</span
					>
				</div>

				<div class="font-space-grotesk flex w-full flex-col space-y-4 pt-8 pb-16 lg:pt-0 lg:pb-0">
					<span aria-hidden="true" class="font-inconsolata px-5 text-xs text-white/30 sm:px-8 sm:text-sm">
						/** about.md */
					</span>
					<p class="px-5 text-lg font-bold text-wrap text-white sm:px-8 lg:text-xl">
						{$t('about.long_desc.opening')}
					</p>
					{#each longDescKeys as key, i (key)}
						<div class="flex items-start gap-3 px-5 sm:px-8">
							<span
								aria-hidden="true"
								class="font-inconsolata mt-1 shrink-0 text-xs text-emerald-400/50 sm:text-sm"
							>
								{String(i + 1).padStart(2, '0')}
							</span>
							<p class="text-base font-normal text-wrap text-white lg:text-lg">
								{$t(key)}
								{#if i === longDescKeys.length - 1}
									<span class="cursor-blink" aria-hidden="true"></span>
								{/if}
							</p>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.cursor-blink {
		display: inline-block;
		width: 0.5em;
		height: 1em;
		margin-left: 0.15em;
		background: var(--color-primary);
		vertical-align: -0.15em;
		animation: blink 1.1s step-end infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.cursor-blink {
			animation: none;
			opacity: 1;
		}
	}
</style>