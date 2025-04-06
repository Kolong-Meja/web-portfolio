<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="max-h-full min-h-screen w-screen max-w-full bg-white">
	<div class="container mx-auto">
		<div class="flex h-screen flex-col items-center justify-center space-y-4">
			{#if page.status === 404}
				<h1 class="text-3xl font-bold text-black md:text-4xl lg:text-5xl">
					{page.status}
					{page.error?.message}
				</h1>
				<p class="text-base font-normal text-black md:text-lg">
					<span class="font-semibold underline underline-offset-2">
						{page.url.pathname}
					</span>
					path is not exist.
				</p>
			{/if}
			{#if page.status === 500}
				<h1 class="text-3xl font-bold text-black md:text-4xl lg:text-5xl">
					{page.status}
					{page.error?.message}
				</h1>
				<p class="text-base font-normal text-black md:text-lg">
					[NOTE]: There's an issue with our server. Please wait until we fix it.
				</p>
			{/if}
		</div>
	</div>
</div>
