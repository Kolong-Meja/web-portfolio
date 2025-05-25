<script lang="ts">
	import { DarkSignature } from '$lib';
</script>

<div
	class="dark:bg-soft-black relative flex h-[60rem] max-h-full min-h-screen w-screen max-w-full items-center justify-center overflow-hidden bg-black transition-colors duration-300 ease-in-out"
>
	<div
		class="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] bg-[size:14px_24px]"
	></div>
	<div
		class="absolute top-[-10%] right-0 left-0 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_400px,#242424,#080808)]"
	></div>

	<div class="container mx-auto">
		<div class="flex items-center justify-center px-10 py-14 md:px-20 md:py-24">
			<img
				id="logo"
				src={DarkSignature}
				alt="Faisal Logo"
				class="show-on-scroll relative z-10 h-[20rem] w-[20rem] sm:h-[24rem] sm:w-[24rem] md:h-[28rem] md:w-[28rem] lg:h-[32rem] lg:w-[32rem] xl:h-[36rem] xl:w-[36rem]"
				loading="lazy"
			/>
		</div>
	</div>
</div>

<!-- <video
				autoplay
				muted
				loop
				id="headerVideo"
				class="absolute z-0 min-h-full w-auto max-w-none min-w-full"
			>
				<source src={HeaderBackgroundVideo} type="video/mp4" />
			</video> -->
