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
	const MOBILE_QUERY = '(max-width: 767px)';
	const DESKTOP_QUERY = '(min-width: 768px)';

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

		ScrollTrigger.normalizeScroll({
			allowNestedScroll: true,
			type: 'touch,wheel'
		});

		let smoother: ScrollSmoother | undefined;
		const mm = gsap.matchMedia();

		mm.add({ isMobile: MOBILE_QUERY, isDesktop: DESKTOP_QUERY }, (context) => {
			const { isMobile } = context.conditions as { isMobile: boolean };

			smoother = ScrollSmoother.create({
				wrapper: '#smooth-wrapper',
				content: '#smooth-content',
				smooth: isMobile ? 0.6 : 2.8,
				speed: isMobile ? 1 : 0.3,
				effects: !isMobile,
				smoothTouch: isMobile ? false : 0.1,
				ignoreMobileResize: true
			});
			return () => smoother?.kill();
		});

		const controller = new AbortController();
		for (const name of NAV_LINKS) {
			const buttons = document.querySelectorAll<HTMLButtonElement>(`.${name}-link`);
			if (buttons.length === 0) {
				console.warn(`[Navigation] Button ".${name}-link" not found in DOM`);
				continue;
			}
			for (const button of buttons) {
				button.addEventListener(
					'click',
					() => {
						if (!smoother) return;
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
		}

		return () => {
			controller.abort();
			mm.revert();
			ScrollTrigger.normalizeScroll(false);
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