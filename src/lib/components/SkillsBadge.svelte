<script lang="ts">
	import type { Skill } from '$lib/constants/constant';
	import { CATEGORY_ACCENT, resolveSkillMeta, getSkillInitials } from '$lib/constants/skill-meta';

	interface Props {
		skill: Skill;
		index?: number;
	}

	const { skill, index = 0 }: Props = $props();
	// svelte-ignore state_referenced_locally
	const meta = resolveSkillMeta(skill.id);
	const accent = meta.color ?? CATEGORY_ACCENT[meta.category];
	const initials = getSkillInitials(skill.name);
	let iconFailed = $state(false);
	const showIcon = $derived(Boolean(meta.iconSlug) && !iconFailed);
</script>

<li
	class="skill-chip inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 font-inconsolata text-sm text-gray-300 backdrop-blur-sm sm:gap-2.5 sm:px-3.5 sm:py-1.5"
	style="--accent: #{accent}; --stagger: {index * 45}ms"
>
	<span
		class="flex h-4 w-4 shrink-0 items-center justify-center sm:h-[1.15rem] sm:w-[1.15rem]"
		aria-hidden="true"
	>
		{#if showIcon}
			<img
				src="https://cdn.simpleicons.org/{meta.iconSlug}/{accent}"
				alt=""
				width="16"
				height="16"
				loading="lazy"
				decoding="async"
				class="skill-chip__icon h-full w-full object-contain"
				onerror={() => (iconFailed = true)}
			/>
		{:else}
			<span class="skill-chip__glyph text-[0.6rem] font-bold tracking-tight">{initials}</span>
		{/if}
	</span>
	<span class="skill-chip__label">{skill.name}</span>
</li>

<style>
	.skill-chip {
		max-width: 100%;
		opacity: 0;
		transform: translateY(8px);
		border-color: color-mix(in srgb, var(--accent) 25%, transparent);
		background-color: color-mix(in srgb, var(--accent) 7%, rgba(255, 255, 255, 0.03));
		animation: chip-in 0.45s ease-out forwards;
		animation-delay: var(--stagger);
		transition:
			border-color 0.25s ease,
			background-color 0.25s ease,
			transform 0.2s ease,
			box-shadow 0.25s ease,
			color 0.2s ease;
	}

	.skill-chip:hover {
		border-color: color-mix(in srgb, var(--accent) 55%, transparent);
		background-color: color-mix(in srgb, var(--accent) 14%, rgba(255, 255, 255, 0.04));
		color: #f9fafb;
		transform: translateY(-2px);
		box-shadow: 0 8px 20px -10px var(--accent);
	}

	.skill-chip__glyph {
		color: var(--accent);
	}

	.skill-chip__icon {
		transition: transform 0.2s ease;
	}

	.skill-chip:hover .skill-chip__icon {
		transform: scale(1.15);
	}

	@keyframes chip-in {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.skill-chip {
			opacity: 1;
			transform: none;
			animation: none;
		}
		.skill-chip:hover {
			transform: none;
		}
	}
</style>