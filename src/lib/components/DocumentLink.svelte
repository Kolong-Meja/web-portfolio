<script lang="ts">
	interface DocumentLinkProps {
		link: string;
		name: string;
		fileId: string;
	}

	interface Props {
		props: DocumentLinkProps;
		index?: number;
	}

	const { props, index = 0 }: Props = $props();
</script>

<a
	href={props.link}
	rel="external noopener noreferrer"
	target="_blank"
	class="file-row group relative flex w-full items-center gap-3 overflow-hidden rounded-lg border border-white/10 bg-white/2 px-4 py-3 transition-colors duration-300 ease-out hover:border-emerald-400/40 hover:bg-emerald-400/6 focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none sm:gap-4 sm:px-5 sm:py-3.5"
	style="--stagger: {index * 90}ms">
	<!-- Left accent bar — "unrolls" downward on hover, like an active-file marker in an IDE sidebar -->
	<span
		aria-hidden="true"
		class="absolute inset-y-0 left-0 w-0.75 origin-top scale-y-0 bg-emerald-400 transition-transform duration-300 ease-out group-hover:scale-y-100"
	></span>

	<span
		aria-hidden="true"
		class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-black/30 text-white/50 transition-colors duration-300 group-hover:border-emerald-400/40 group-hover:text-emerald-300 sm:h-10 sm:w-10"
	>
		{#if props.fileId === 'certificates'}
			<svg viewBox="0 0 24 24" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
				<circle cx="12" cy="8" r="6" />
				<path d="M9 13.5 7 22l5-3 5 3-2-8.5" />
			</svg>
		{:else if props.fileId === 'portfolio'}
			<svg viewBox="0 0 24 24" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
				<path d="M3 7h18v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
				<path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
				<path d="M3 12h18" />
			</svg>
		{:else}
			<svg viewBox="0 0 24 24" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
				<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
				<path d="M14 2v6h6" />
				<path d="M8 13h8M8 17h5" />
			</svg>
		{/if}
	</span>

	<span class="flex min-w-0 flex-1 flex-col font-hanken-grotesk">
		<span class="truncate text-sm font-semibold text-white sm:text-base">
			<span
				aria-hidden="true"
				class="inline-block -translate-x-1 text-emerald-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
				>[</span
			>
			{props.name}
			<span
				aria-hidden="true"
				class="inline-block translate-x-1 text-emerald-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
				>]</span
			>
		</span>
		<span class="font-inconsolata truncate text-xs text-white/40 sm:text-sm">
			{props.fileId}.pdf
		</span>
	</span>

	<span
		aria-hidden="true"
		class="flex h-5 w-5 shrink-0 -translate-x-0.5 translate-y-0.5 items-center justify-center text-white/40 opacity-60 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-emerald-300 group-hover:opacity-100"
	>
		<svg viewBox="0 0 24 24" class="h-4 w-4 -rotate-40" fill="none" stroke="currentColor" stroke-width="2">
			<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
		</svg>
	</span>
</a>

<style>
	.file-row {
		opacity: 0;
		transform: translateY(10px);
		animation: row-in 0.5s ease-out forwards;
		animation-delay: var(--stagger);
	}

	@keyframes row-in {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.file-row {
			opacity: 1;
			transform: none;
			animation: none;
		}
	}
</style>