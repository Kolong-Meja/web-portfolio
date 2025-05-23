<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Skill from '$lib/components/sections/Skill.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Experience from '$lib/components/sections/Experience.svelte';
	import Projects from '$lib/components/sections/Projects.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/dist/ScrollTrigger';
	import ScrollSmoother from 'gsap/dist/ScrollSmoother';

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

		let smoother = ScrollSmoother.create({
			wrapper: '#smooth-wrapper',
			content: '#smooth-content',
			smooth: 4,
			speed: 0.4,
			effects: true,
			normalizeScroll: false
		});

		const links = ['about', 'skill', 'project', 'experience'];

		links.forEach((l) => {
			let link = document.querySelector(`.${l}-link`) as HTMLButtonElement;

			link.addEventListener('click', (e) => {
				smoother.scrollTo(`.${l}-section`, true, 'center center');
			});
		});
	});
</script>

<Navbar />
<div id="smooth-wrapper">
	<div id="smooth-content">
		<Header />
		<About />
		<Skill />
		<Projects />
		<Experience />
		<Footer />
	</div>
</div>

<style>
	#smooth-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
	}
	#smooth-content {
		overflow: visible;
		width: 100%;
	}
</style>
