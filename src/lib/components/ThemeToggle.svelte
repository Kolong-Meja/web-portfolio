<script lang="ts">
	interface Props {
		dark: boolean;
		hidden?: boolean;
		onToggle: () => void;
	}

	const { dark, hidden = false, onToggle }: Props = $props();
</script>

<button
	class="{dark
		? 'bg-gray-600 ring-offset-gray-700 focus:ring-gray-400'
		: 'bg-emerald-300 ring-offset-emerald-200 focus:ring-emerald-500'} relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-offset-2 focus:outline-none"
	class:hidden
	type="button"
	onclick={onToggle}
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
			<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-moon-stars-fill h-3 w-3 text-emerald-300" viewBox="0 0 16 16">
				<path
					d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"
				/>
				<path
					d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1-.274 0l-.258.774a1.16 1.16 0 0 0-.732.732z"
				/>
			</svg>
		</span>
	</span>
</button>