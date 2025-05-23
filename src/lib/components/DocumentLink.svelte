<script lang="ts">
	type DocumentLinkProps = {
		link: string;
		name: string;
	};
	export let props: DocumentLinkProps;
</script>

<a href={props.link}>
	<button class="group relative inline-block px-2.5 py-1.5 font-medium">
		<span
			class="absolute inset-0 h-full w-full -translate-x-1 translate-y-1 transform bg-emerald-400 transition duration-400 ease-out group-hover:-translate-x-0 group-hover:-translate-y-0 dark:bg-emerald-500"
		></span>
		<span
			class="bg-soft-black dark:group-hover:bg-soft-black absolute inset-0 h-full w-full border border-emerald-400 group-hover:bg-black dark:border-emerald-500 dark:bg-black"
		></span>
		<span class="relative text-emerald-300 dark:text-emerald-400">{props.name}</span>
	</button>
</a>
