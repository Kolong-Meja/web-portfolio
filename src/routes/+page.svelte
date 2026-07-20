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
	const NAV_LINKS = ['about', 'skill', 'project', 'experience'] as const;
	onMount(() => {
	gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
	const smoother = ScrollSmoother.create({
		wrapper: '#smooth-wrapper',
		content: '#smooth-content',
		smooth: 2.8,
		speed: 0.3,
		effects: true,
		smoothTouch: 0.1
	});
	ScrollTrigger.normalizeScroll({
		allowNestedScroll: true,
		type: 'touch,wheel'
	});
	const controller = new AbortController();
	for (const name of NAV_LINKS) {
		const button = document.querySelector<HTMLButtonElement>(`.${name}-link`);
		if (!button) {
			console.warn(`[Navigation] Button ".${name}-link" not found in DOM`);
			continue;
		}
		button.addEventListener(
			'click',
			() => {
				const targetSelector = `.${name}-section`;
				const targetY = smoother.offset(targetSelector, 'center center');
				gsap.to(smoother, {
					scrollTop: Math.min(targetY, ScrollTrigger.maxScroll(window)),
					duration: 1.8,
					ease: 'power3.inOut'
				});
			},
			{ signal: controller.signal }
		);
	}
	return () => {
		controller.abort();
		ScrollTrigger.normalizeScroll(false);
		smoother.kill();
		ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
	};
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
