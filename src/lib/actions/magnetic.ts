import gsap from 'gsap';

export interface MagneticOptions {
	strength?: number;
	radius?: number;
}

export function magnetic(node: HTMLElement, options: MagneticOptions = {}) {
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReducedMotion) {
		return { destroy() {} };
	}

	const { strength = 0.35, radius = 60 } = options;
	const setX = gsap.quickTo(node, 'x', { duration: 0.4, ease: 'power3.out' });
	const setY = gsap.quickTo(node, 'y', { duration: 0.4, ease: 'power3.out' });

	function handlePointerMove(event: PointerEvent) {
		const rect = node.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const dx = event.clientX - centerX;
		const dy = event.clientY - centerY;

		if (Math.hypot(dx, dy) > radius) {
			setX(0);
			setY(0);
			return;
		}

		setX(dx * strength);
		setY(dy * strength);
	}

	function handlePointerLeave() {
		setX(0);
		setY(0);
	}

	const parent = node.parentElement ?? node;
	parent.addEventListener('pointermove', handlePointerMove);
	parent.addEventListener('pointerleave', handlePointerLeave);

	return {
		destroy() {
			parent.removeEventListener('pointermove', handlePointerMove);
			parent.removeEventListener('pointerleave', handlePointerLeave);
			gsap.killTweensOf(node);
		}
	};
}
