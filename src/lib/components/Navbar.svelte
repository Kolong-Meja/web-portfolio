<script lang="ts">
	import { locale, locales, t } from '$lib/translations';
	import { onMount } from 'svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	type NavKey = 'about' | 'skill' | 'project' | 'experience';

	interface NavItem {
		key: NavKey;
		labelKey: string;
	}

	const NAV_ITEMS: NavItem[] = [
		{ key: 'about', labelKey: 'navbar.about' },
		{ key: 'skill', labelKey: 'navbar.skill' },
		{ key: 'project', labelKey: 'navbar.projects' },
		{ key: 'experience', labelKey: 'navbar.experience' }
	];

	let dark = $state(false);
	let hidden = $state(true);
	let mobileMenuOpen = $state(false);
	let scrolled = $state(false);
	let activeSection = $state<NavKey | null>(null);

	const switchLanguageHandler = (event: Event) => {
		const target = event.currentTarget as HTMLSelectElement;
		localStorage.lang = target.value;
	};

	const switchThemeModeHandler = ({ matches: prefersDark }: MediaQueryListEvent) => {
		if (!localStorage.theme) {
			setThemeMode(prefersDark);
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

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	function handleWindowKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && mobileMenuOpen) {
			closeMobileMenu();
		}
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		closeMobileMenu();
	}

	onMount(() => {
		dark = document.documentElement.classList.contains('dark');
		hidden = false;

		const matcher = window.matchMedia('(prefers-color-scheme: dark)');
		matcher.addEventListener('change', switchThemeModeHandler);

		let scrollRaf: number | null = null;
		const handleScroll = () => {
			if (scrollRaf !== null) return;
			scrollRaf = requestAnimationFrame(() => {
				scrolled = window.scrollY > 40;
				scrollRaf = null;
			});
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		const desktopQuery = window.matchMedia('(min-width: 768px)');
		const handleDesktopChange = (e: MediaQueryListEvent) => {
			if (e.matches) mobileMenuOpen = false;
		};
		desktopQuery.addEventListener('change', handleDesktopChange);
		const sectionEntries = NAV_ITEMS.map((item) => ({
			key: item.key,
			el: document.querySelector<HTMLElement>(`.${item.key}-section`)
		})).filter((entry): entry is { key: NavKey; el: HTMLElement } => entry.el !== null);

		let observer: IntersectionObserver | undefined;
		if (sectionEntries.length > 0) {
			const obs = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (!entry.isIntersecting) continue;
						const match = sectionEntries.find((s) => s.el === entry.target);
						if (match) activeSection = match.key;
					}
				},
				{ rootMargin: '-45% 0px -45% 0px', threshold: 0 }
			);
			sectionEntries.forEach((s) => obs.observe(s.el));
			observer = obs;
		}

		return () => {
			matcher.removeEventListener('change', switchThemeModeHandler);
			window.removeEventListener('scroll', handleScroll);
			desktopQuery.removeEventListener('change', handleDesktopChange);
			observer?.disconnect();
			if (scrollRaf !== null) cancelAnimationFrame(scrollRaf);
		};
	});
</script>

<svelte:window on:keydown={handleWindowKeydown} />

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
	class="navbar font-hanken-grotesk fixed inset-x-0 top-0 z-20 w-full border-b transition-all duration-300 ease-in-out {scrolled
		? 'border-white/10 bg-black/85 backdrop-blur-md dark:border-white/10 dark:bg-soft-black/80'
		: 'border-transparent bg-black/40 backdrop-blur-sm dark:border-transparent dark:bg-soft-black/40'}"
>
	<div class="container mx-auto">
		<div class="flex h-16 flex-row items-center justify-between px-4 sm:px-6">
			<button
				type="button"
				class="brand-mark flex items-center gap-2 font-space-grotesk text-base font-bold text-white transition-opacity hover:opacity-80 sm:text-lg"
				onclick={scrollToTop}
				aria-label="Scroll to top"
			>
				<span class="text-emerald-400">&lt;</span>FR<span class="text-emerald-400">/&gt;</span>
				<span class="font-inconsolata hidden text-xs font-normal text-white/30 sm:inline">
					/{activeSection ?? 'home'}
				</span>
			</button>

			<!-- Desktop links -->
			<ul class="hidden flex-row items-center gap-8 md:flex">
				{#each NAV_ITEMS as item (item.key)}
					<li class="list-none">
						<button
							class="{item.key}-link group relative text-sm font-medium transition-colors duration-300 ease-in-out {activeSection ===
							item.key
								? 'text-emerald-300'
								: 'text-white/80 hover:text-emerald-300'}"
						>
							<span>{$t(item.labelKey)}</span>
							<span
								class="absolute -bottom-1 left-0 h-0.5 bg-emerald-300 transition-all duration-300 {activeSection ===
								item.key
									? 'w-full'
									: 'w-0 group-hover:w-full'}"
							></span>
						</button>
					</li>
				{/each}
			</ul>

			<!-- Desktop utilities -->
			<div class="hidden items-center gap-4 md:flex">
				<span class="h-5 w-px bg-white/10" aria-hidden="true"></span>
				<ThemeToggle {dark} {hidden} onToggle={toggleTheme} />
				<select
					bind:value={$locale}
					onchange={switchLanguageHandler}
					id="countries"
					class="font-inconsolata bg-soft-black dark:bg-soft-dark rounded-md border border-white/10 px-2 py-1.5 text-xs text-white focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 focus:outline-none"
				>
					<option disabled value="">Select Language</option>
					{#each $locales as loc (loc)}
						<option value={loc}>{$t(`lang.${loc}`)}</option>
					{/each}
				</select>
			</div>

			<!-- Mobile hamburger -->
			<button
				type="button"
				class="hamburger md:hidden"
				aria-expanded={mobileMenuOpen}
				aria-controls="mobile-menu-panel"
				aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			>
				<span class="hamburger__bar" class:is-open={mobileMenuOpen}></span>
				<span class="hamburger__bar" class:is-open={mobileMenuOpen}></span>
				<span class="hamburger__bar" class:is-open={mobileMenuOpen}></span>
			</button>
		</div>
		<div
			id="mobile-menu-panel"
			class="mobile-panel md:hidden"
			class:mobile-panel--open={mobileMenuOpen}
			aria-hidden={!mobileMenuOpen}
		>
			<ul class="flex flex-col gap-1 px-4 pt-2 pb-4">
				{#each NAV_ITEMS as item (item.key)}
					<li class="list-none">
						<button
							class="{item.key}-link group flex w-full items-center gap-2 rounded-md px-3 py-3 text-left font-inconsolata text-sm transition-colors duration-200 {activeSection ===
							item.key
								? 'bg-emerald-400/10 text-emerald-300'
								: 'text-white/80 hover:bg-white/5 hover:text-emerald-300'}"
							onclick={closeMobileMenu}
							tabindex={mobileMenuOpen ? 0 : -1}
						>
							<span class="text-emerald-400/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">[</span>
							<span class="flex-1">{$t(item.labelKey)}</span>
							<span class="text-emerald-400/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">]</span>
						</button>
					</li>
				{/each}
			</ul>

			<div class="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-3">
				<div class="flex items-center gap-2">
					<span class="font-inconsolata text-xs text-white/40">theme</span>
					<ThemeToggle {dark} {hidden} onToggle={toggleTheme} />
				</div>

				<select
					bind:value={$locale}
					onchange={switchLanguageHandler}
					class="font-inconsolata bg-soft-black dark:bg-soft-dark rounded-md border border-white/10 px-2 py-1.5 text-xs text-white focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 focus:outline-none"
					tabindex={mobileMenuOpen ? 0 : -1}
				>
					<option disabled value="">Select Language</option>
					{#each $locales as loc (loc)}
						<option value={loc}>{$t(`lang.${loc}`)}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>
</nav>

<style>
	.hamburger {
		position: relative;
		display: flex;
		height: 2.5rem;
		width: 2.5rem;
		flex-shrink: 0;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 5px;
	}

	.hamburger__bar {
		display: block;
		height: 2px;
		width: 20px;
		background: white;
		border-radius: 1px;
		transition:
			transform 0.3s ease,
			opacity 0.3s ease;
	}

	.hamburger__bar.is-open:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}
	.hamburger__bar.is-open:nth-child(2) {
		opacity: 0;
	}
	.hamburger__bar.is-open:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	.mobile-panel {
		max-height: 0;
		overflow: hidden;
		opacity: 0;
		visibility: hidden;
		transition:
			max-height 0.4s ease,
			opacity 0.3s ease,
			visibility 0s linear 0.4s;
	}

	.mobile-panel--open {
		max-height: 28rem;
		opacity: 1;
		visibility: visible;
		transition:
			max-height 0.4s ease,
			opacity 0.3s ease,
			visibility 0s linear 0s;
	}

	@media (prefers-reduced-motion: reduce) {
		.hamburger__bar,
		.mobile-panel {
			transition: none;
		}
	}
</style>