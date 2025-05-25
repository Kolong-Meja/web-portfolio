<script lang="ts">
	export let status: number;
	export let message: string;
	export let pathname: string;
</script>

<div
	class="dark:bg-soft-black font-hanken-grotesk max-h-full min-h-screen w-screen max-w-full bg-black transition-colors duration-300 ease-in-out"
>
	<div class="container mx-auto">
		<div class="flex h-screen flex-col items-center justify-center space-y-4">
			<h1 class="text-3xl font-bold md:text-4xl lg:text-6xl text-white">
				{status} | {message}
			</h1>
			<p class="text-base font-normal sm:text-lg md:text-xl text-white">
				Current path: <span class="font-semibold underline underline-offset-2">{pathname} </span>.
			</p>
			<a
				href={'/'}
				class="text-base font-medium text-blue-400 underline underline-offset-4 transition-colors duration-300 hover:text-blue-500"
				>Go Back</a
			>
		</div>
	</div>
</div>
