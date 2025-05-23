<script lang="ts">
	export let value: string;
</script>

<div
	class="group bg-soft-dark dark:bg-soft-black relative inline-flex items-center justify-start overflow-hidden rounded-full px-3 py-1 font-normal transition-colors duration-300 ease-in-out sm:py-1.5"
>
	<span
		class="absolute top-0 left-0 h-32 w-32 translate-x-12 -translate-y-2 rotate-45 bg-emerald-400 opacity-[0%] dark:bg-emerald-300"
	></span>
	<span
		class="absolute top-0 left-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-emerald-400 opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8 dark:bg-emerald-300"
	></span>
	<span
		class="relative w-full text-left text-base font-normal text-gray-100 transition-colors duration-200 ease-in-out group-hover:text-black dark:text-gray-300"
		>{value}</span
	>
</div>
