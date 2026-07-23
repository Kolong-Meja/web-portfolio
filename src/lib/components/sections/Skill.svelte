<script lang="ts">
	import { fade } from 'svelte/transition';
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, Options } from 'svelte-inview';
	import { t } from '$lib/translations';
	import { _codePanelValue, _defaultSkills } from '$lib/constants/constant';
	import {
		CATEGORY_ACCENT,
		CATEGORY_LABEL,
		resolveSkillMeta,
		type SkillCategory
	} from '$lib/constants/skill-meta';
	import CodePanel from '../CodePanel.svelte';
	import SkillsBadge from '../SkillsBadge.svelte';

	let isInViewed = $state(false);

	const inviewOptions: Options = {
		rootMargin: '-20%',
		unobserveOnEnter: true
	};

	function handleChange({ detail }: CustomEvent<ObserverEventDetails>) {
		isInViewed = detail.inView;
	}

	const CATEGORY_ORDER: SkillCategory[] = ['language', 'framework', 'database', 'tool', 'practice'];

	interface SkillGroup {
		category: SkillCategory;
		label: string;
		accent: string;
		skills: typeof _defaultSkills;
	}

	// Computed once at init — _defaultSkills is a static readonly array, so
	// there's nothing reactive to track here.
	const skillGroups: SkillGroup[] = CATEGORY_ORDER.map((category) => ({
		category,
		label: CATEGORY_LABEL[category],
		accent: CATEGORY_ACCENT[category],
		skills: _defaultSkills.filter((skill) => resolveSkillMeta(skill.id).category === category)
	})).filter((group) => group.skills.length > 0);
</script>

<section
	class="skill-section dark:bg-soft-black font-hanken-grotesk relative max-h-full min-h-screen w-screen max-w-full bg-black transition-colors duration-300 ease-in-out"
	use:inview={inviewOptions}
	oninview_change={handleChange}
>
	<div class="skill-grid-backdrop" aria-hidden="true"></div>

	<div id="skill" class="relative container mx-auto">
		{#if isInViewed}
			<div
				class="px-4 py-8 sm:px-5 sm:py-12 md:px-6 md:py-16 lg:px-7 lg:py-20 xl:px-8 xl:py-24"
				in:fade={{ duration: 800 }}
			>
				<div class="mb-8 flex flex-col items-center gap-2 text-center xl:mb-14">
					<span
						class="font-inconsolata text-xs tracking-[0.3em] text-emerald-400/70 uppercase sm:text-sm"
					>
						// tech_stack.ts
					</span>
					<p
						class="font-space-grotesk relative text-xl font-bold text-emerald-300 md:text-2xl lg:text-4xl dark:text-emerald-400"
					>
						{String($t('content.skills.header')).toUpperCase()}
						<span class="cursor-blink" aria-hidden="true"></span>
					</p>
				</div>

				<div class="flex w-full flex-col items-start gap-6 lg:flex-row lg:items-stretch">
					<CodePanel value={_codePanelValue} />

					<div class="flex w-full flex-1 flex-col gap-6">
						{#each skillGroups as group, gi (group.category)}
							<div style="--group-delay: {gi * 100}ms; --accent: #{group.accent}" class="skills-group">
								<p
									class="mb-2.5 flex items-center gap-2 font-inconsolata text-[0.7rem] tracking-[0.08em] text-gray-400 uppercase sm:text-xs"
								>
									<span
										class="inline-block h-1.5 w-1.5 shrink-0 rounded-xs bg-(--accent) shadow-[0_0_6px_var(--accent)]"
										aria-hidden="true"
									></span>
									<span aria-hidden="true" class="text-(--accent) opacity-70">//</span>
									{group.label}
								</p>
								<ul
									class="flex list-none flex-wrap items-center gap-2 sm:gap-2.5"
									aria-label={`${group.label} skills`}
								>
									{#each group.skills as skill, si (skill.id)}
										<SkillsBadge {skill} index={si} />
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	.skill-grid-backdrop {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		background-image:
			linear-gradient(to right, rgba(52, 211, 153, 0.06) 1px, transparent 1px),
			linear-gradient(to bottom, rgba(52, 211, 153, 0.06) 1px, transparent 1px);
		background-size: 36px 36px;
		mask-image: radial-gradient(ellipse 75% 55% at 50% 35%, black 35%, transparent 100%);
		-webkit-mask-image: radial-gradient(ellipse 75% 55% at 50% 35%, black 35%, transparent 100%);
	}

	.cursor-blink {
		display: inline-block;
		width: 0.5em;
		height: 1em;
		margin-left: 0.15em;
		background: currentColor;
		vertical-align: -0.1em;
		animation: blink 1.1s step-end infinite;
	}

	@keyframes blink {
		50% {
			opacity: 0;
		}
	}

	.skills-group {
		opacity: 0;
		transform: translateY(10px);
		animation: group-in 0.6s ease-out forwards;
		animation-delay: var(--group-delay);
	}

	@keyframes group-in {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.skills-group {
			opacity: 1;
			transform: none;
			animation: none;
		}
		.cursor-blink {
			animation: none;
			opacity: 1;
		}
	}
</style>