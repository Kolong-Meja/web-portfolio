<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { t } from '$lib/translations';
	import { toSlug } from '$lib/constants/constant';
	import SkillsBadge from './SkillsBadge.svelte';

	interface SocialLink {
		label: string;
		href: string;
		icon: 'github' | 'linkedin' | 'medium' | 'threads' | 'instagram';
	}

	const SOCIAL_LINKS: SocialLink[] = [
		{ label: 'GitHub', href: 'https://github.com/Kolong-Meja', icon: 'github' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/faisal-ramadhan-9ab18a269/', icon: 'linkedin' },
		{ label: 'Medium', href: 'https://medium.com/@faisalramadhan1299', icon: 'medium' },
		{ label: 'Threads', href: 'https://www.threads.com/@fsl4rmdhn', icon: 'threads' },
		{ label: 'Instagram', href: 'https://www.instagram.com/fsl4rmdhn/', icon: 'instagram' }
	];

	interface NavEntry {
		key: 'about' | 'skill' | 'project' | 'experience';
		labelKey: string;
	}

	const NAV_ENTRIES: NavEntry[] = [
		{ key: 'about', labelKey: 'navbar.about' },
		{ key: 'skill', labelKey: 'navbar.skill' },
		{ key: 'project', labelKey: 'navbar.projects' },
		{ key: 'experience', labelKey: 'navbar.experience' }
	];

	const STACK = ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Three.js', 'GSAP'];

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	let now = $state(new Date());
	let intervalId: ReturnType<typeof setInterval> | undefined;

	const jakartaTimeFormatter = new Intl.DateTimeFormat('en-GB', {
		timeZone: 'Asia/Jakarta',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});

	onMount(() => {
		intervalId = setInterval(() => {
			now = new Date();
		}, 15000);
	});

	onDestroy(() => {
		if (intervalId) clearInterval(intervalId);
	});
</script>

<footer class="dark:bg-soft-black font-hanken-grotesk relative w-full max-w-full bg-black transition-colors duration-300 ease-in-out">
	<div class="footer-glow-border" aria-hidden="true"></div>

	<div class="border-b border-white/5 px-4 py-2.5 sm:px-6">
		<div class="font-inconsolata container mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[0.65rem] text-white/40 sm:justify-between sm:text-xs">
			<span class="flex items-center gap-1.5">
				<span class="status-dot h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true"></span>
				Asia/Jakarta · {jakartaTimeFormatter.format(now)} WIB
			</span>
			<span class="hidden items-center gap-4 sm:flex">
				<span>UTF-8</span>
				<span>main</span>
			</span>
			<span>deployed on Netlify</span>
		</div>
	</div>

	<div class="container mx-auto">
		<div class="grid grid-cols-1 gap-10 px-4 py-10 sm:px-6 md:grid-cols-3 md:gap-6 md:py-14">
			<div class="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
				<button
					type="button"
					class="font-space-grotesk text-lg font-bold text-white transition-opacity hover:opacity-80"
					onclick={scrollToTop}
					aria-label="Back to top"
				>
					<span class="text-emerald-400">&lt;/</span>FR<span class="text-emerald-400">&gt;</span>
				</button>
				<p class="text-sm text-white/50">
					Copyright © {new Date().getFullYear()} Faisal Ramadhan
				</p>
				<div class="flex flex-col items-center gap-2 md:items-start">
					<span class="font-inconsolata text-xs text-white/30">// built with</span>
					<ul class="flex list-none flex-wrap items-center justify-center gap-2 md:justify-start">
						{#each STACK as tech, i (tech)}
							<SkillsBadge skill={{ id: toSlug(tech), name: tech }} index={i} />
						{/each}
					</ul>
				</div>
			</div>

			<div class="flex flex-col items-center gap-3 md:items-start">
				<span class="font-inconsolata text-xs text-white/30">// navigate</span>
				<ul class="flex flex-col items-center gap-2 md:items-start">
					{#each NAV_ENTRIES as entry (entry.key)}
						<li class="list-none">
							<button
								class="{entry.key}-link group flex items-center gap-1.5 text-sm text-white/70 transition-colors duration-200 hover:text-emerald-300"
							>
								<span class="text-emerald-400/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">[</span>
								<span>{$t(entry.labelKey)}</span>
								<span class="text-emerald-400/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">]</span>
							</button>
						</li>
					{/each}
				</ul>
			</div>

			<div class="flex flex-col items-center gap-3 md:items-start">
				<span class="font-inconsolata text-xs text-white/30">// connect</span>
				<div class="flex flex-row flex-wrap items-center justify-center gap-2 md:justify-start">
					{#each SOCIAL_LINKS as social (social.icon)}
						<a
							href={social.href}
							title={social.label}
							aria-label={social.label}
							target="_blank"
							rel="external noopener noreferrer"
							class="social-icon flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-400/40 hover:text-emerald-300 hover:shadow-[0_6px_16px_-8px_rgba(52,211,153,0.4)]"
						>
							{#if social.icon === 'github'}
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-4 w-4" viewBox="0 0 16 16">
									<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
								</svg>
							{:else if social.icon === 'linkedin'}
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-4 w-4" viewBox="0 0 16 16">
									<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
								</svg>
							{:else if social.icon === 'medium'}
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-4 w-4" viewBox="0 0 16 16">
									<path d="M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5A4.506 4.506 0 0 1 9.025 8m4.95 0c0 2.34-1.01 4.236-2.256 4.236S9.463 10.339 9.463 8c0-2.34 1.01-4.236 2.256-4.236S13.975 5.661 13.975 8M16 8c0 2.096-.355 3.795-.794 3.795-.438 0-.793-1.699-.793-3.795 0-2.096.355-3.795.794-3.795.438 0 .793 1.699.793 3.795" />
								</svg>
							{:else if social.icon === 'threads'}
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-4 w-4" viewBox="0 0 16 16">
									<path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161" />
								</svg>
							{:else if social.icon === 'instagram'}
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="h-4 w-4" viewBox="0 0 16 16">
									<path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
								</svg>
							{/if}
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer-glow-border {
		height: 1px;
		background: linear-gradient(to right, transparent, rgba(52, 211, 153, 0.5), transparent);
	}

	.status-dot {
		animation: status-dot-pulse 2.4s ease-in-out infinite;
	}

	@keyframes status-dot-pulse {
		50% {
			opacity: 0.4;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.status-dot {
			animation: none;
		}
	}
</style>