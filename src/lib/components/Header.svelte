<script lang="ts">
	import { DarkSignature, HeaderBackgroundVideo } from '$lib';
</script>

<div
	class="overflow-hidden relative flex max-h-full min-h-screen w-screen max-w-full items-center justify-center"
>
	<div class="container mx-auto">
		<div class="flex items-center justify-center px-10 py-14 md:px-20 md:py-24">
			<img
				id="logo"
				src={DarkSignature}
				alt="Faisal Logo"
				class="show-on-scroll relative z-10 h-[20rem] w-[20rem] sm:h-[24rem] sm:w-[24rem] md:h-[28rem] md:w-[28rem] lg:h-[32rem] lg:w-[32rem] xl:h-[36rem] xl:w-[36rem]"
				loading="lazy"
			/>
			<video
				autoplay
				muted
				loop
				id="headerVideo"
				class="absolute z-0 min-h-full w-auto max-w-none min-w-full"
			>
				<source src={HeaderBackgroundVideo} type="video/mp4" />
			</video>
		</div>
	</div>
</div>
