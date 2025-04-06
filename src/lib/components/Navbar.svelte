<script lang="ts">
	import { t, locales, locale } from '$lib/translations';
	import { onMount } from 'svelte';

	let dark: boolean;
	let hidden: boolean = true;

	const switchLanguageHandler = (event: Event) => {
		const target = event.currentTarget as HTMLSelectElement;
		localStorage.lang = target.value;
	};

	const smoothScrolling = () => {
		const links = document.querySelectorAll('.navbar ul a');

		for (const link of links) {
			link.addEventListener('click', clickHandler);
		}

		function clickHandler(event: Event) {
			event.preventDefault();

			const element = event.currentTarget as HTMLAnchorElement;
			const href = element.getAttribute('href');

			if (href) {
				const targetElement = document.querySelector(href);

				if (targetElement) {
					targetElement.scrollIntoView({ behavior: 'smooth' });
				}
			}
		}
	};

	const toggleMenu = () => {
		const menu = document.querySelector('.menu') as HTMLElement;

		if (menu) {
			const isMenuHidden = menu.classList.contains('hidden');

			if (isMenuHidden) {
				menu.classList.remove('hidden');
				menu.classList.remove('animate-slide-out-up');
				menu.classList.add('animate-slide-in-down');
			} else {
				menu.classList.remove('animate-slide-in-down');
				menu.classList.add('animate-slide-out-up');

				if (menu.classList.contains('animate-slide-out-up')) {
					menu.addEventListener(
						'animationend',
						() => {
							menu.classList.add('hidden');
						},
						{ once: true }
					);
				}
			}
		}
	};

	const switchThemeModeHandler = ({ matches: dark }: MediaQueryListEvent) => {
		if (!localStorage.theme) {
			setThemeMode(dark);
		}
	};

	const toggleTheme = () => {
		setThemeMode(!dark);
	};

	const setThemeMode = (value: boolean) => {
		dark = value;

		if (dark) {
			document.documentElement.classList.remove('dark');
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		localStorage.theme = dark ? 'dark' : 'default';

		if (window.matchMedia(`(prefers-color-scheme: ${localStorage.theme})`).matches) {
			localStorage.removeItem('theme');
		}
	};

	onMount(() => {
		smoothScrolling();

		dark = document.documentElement.classList.contains('dark');
		hidden = false;

		const matcher = window.matchMedia('(prefers-color-scheme: dark)');
		matcher.addEventListener('change', switchThemeModeHandler);

		return () => matcher.removeEventListener('change', switchThemeModeHandler);
	});
</script>

<svelte:head>
	<script>
		if (
			localStorage.theme === 'dark' ||
			(!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	</script>
</svelte:head>

<nav
	class="navbar font-hanken-grotesk dark:bg-soft-black fixed start-0 top-0 z-20 w-full border-b border-gray-900 bg-black transition-all duration-300 ease-in-out dark:border-gray-800"
>
	<div class="container mx-auto">
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<div class="flex h-full flex-row items-center justify-between px-3 py-2">
			<div class="flex flex-row items-center justify-normal">
				<button
					class="{dark
						? 'bg-gray-600 ring-offset-gray-700 focus:ring-gray-400'
						: 'bg-emerald-300 ring-offset-emerald-200 focus:ring-emerald-500'} relative m-4 inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 focus:outline-none"
					class:hidden
					type="button"
					on:click={toggleTheme}
				>
					<span class="sr-only">Toggle Dark Mode</span>
					<span
						class="{dark
							? 'translate-x-0 bg-gray-300'
							: 'translate-x-4 bg-white'} pointer-events-none relative inline-block h-4 w-4 transform rounded-full shadow ring-0 transition duration-200 ease-in-out"
					>
						<span
							class="{dark
								? 'opacity-100 duration-200 ease-in'
								: 'opacity-0 duration-100 ease-out'} absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
							aria-hidden="true"
						>
							<!-- moon icon -->
							<svg class="h-3 w-3 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
								<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
							</svg>
						</span>
						<span
							class="{dark
								? 'opacity-0 duration-100 ease-out'
								: 'opacity-100 duration-200 ease-in'} absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
							aria-hidden="true"
						>
							<!-- sun icon -->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								class="bi bi-moon-stars-fill h-3 w-3 text-emerald-300"
								viewBox="0 0 16 16"
							>
								<path
									d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"
								/>
								<path
									d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"
								/>
							</svg>
						</span>
					</span>
				</button>

				<!-- Translations -->
				<select
					bind:value={$locale}
					on:change={switchLanguageHandler}
					id="countries"
					class="bg-soft-black dark:bg-soft-dark rounded-lg border border-gray-800 p-2.5 text-sm text-white focus:border-2 focus:border-emerald-300 focus:ring-emerald-300 focus:outline-none dark:border-gray-700 dark:text-white dark:focus:border-emerald-300 dark:focus:ring-emerald-300"
				>
					<option disabled value="">Select Language</option>
					{#each $locales as locale}
						<option value={locale}>{$t(`lang.${locale}`)}</option>
					{/each}
				</select>
				<!-- End of Translations -->
			</div>

			<!-- Links -->
			<ul class="hidden flex-row items-center justify-normal space-x-8 lg:flex">
				<li class="list-none">
					<a
						href={'#about'}
						class="group relative text-base text-white transition-all duration-400 ease-in-out hover:font-bold hover:text-emerald-300"
					>
						<span> {$t('navbar.about')} </span>
						<span
							class="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-emerald-300 transition-all duration-400 group-hover:w-full"
						></span>
					</a>
				</li>
				<li class="list-none">
					<a
						href={'#skill'}
						class="group relative text-base text-white transition-all duration-400 ease-in-out hover:font-bold hover:text-emerald-300"
					>
						<span> {$t('navbar.skill')} </span>
						<span
							class="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-emerald-300 transition-all duration-400 group-hover:w-full"
						></span>
					</a>
				</li>
				<li class="list-none">
					<a
						href={'#experience'}
						class="group relative text-base text-white transition-all duration-400 ease-in-out hover:font-bold hover:text-emerald-300"
					>
						<span> {$t('navbar.experience')} </span>
						<span
							class="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-emerald-300 transition-all duration-400 group-hover:w-full"
						></span>
					</a>
				</li>
			</ul>

			<!-- Mobile Menu Button -->
			<button class="text-white lg:hidden" on:click={toggleMenu}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16m-7 6h7"
					/>
				</svg>
			</button>

			<!-- Menu -->
			<div
				class="menu dark:bg-soft-black absolute top-17 right-0 hidden w-full border-b border-gray-900 bg-black transition-all duration-300 ease-in-out dark:border-gray-800"
			>
				<ul class="flex flex-col items-center justify-center space-y-6 p-4">
					<li class="list-none">
						<a href={'#about'}>
							<span class="text-base text-white underline underline-offset-4"
								>{$t('navbar.about')}</span
							>
						</a>
					</li>
					<li class="list-none">
						<a href={'#skill'}>
							<span class="text-base text-white underline underline-offset-4"
								>{$t('navbar.skill')}</span
							>
						</a>
					</li>
					<li class="list-none">
						<a href={'#experience'}>
							<span class="text-base text-white underline underline-offset-4"
								>{$t('navbar.experience')}</span
							>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</nav>
