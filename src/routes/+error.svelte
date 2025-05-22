<script lang="ts">
	import { page } from '$app/state';
	import GlobalError from '$lib/components/errors/GlobalError.svelte';
	import InternalServerError from '$lib/components/errors/InternalServerError.svelte';
	import NotFoundError from '$lib/components/errors/NotFoundError.svelte';
</script>

{#if page.status === 404}
	<NotFoundError
		status={page.status}
		message={page.error?.message as string}
		pathname={page.url.pathname}
	/>
{:else if page.status === 500}
	<InternalServerError status={page.status} message={page.error?.message as string} />
{:else}
	<GlobalError
		status={page.status}
		message={page.error?.message as string}
		pathname={page.url.pathname}
	/>
{/if}
