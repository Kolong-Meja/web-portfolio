import gsap from 'gsap';

export interface TiltCardOptions {
	maxTilt?: number;
	liftScale?: number;
	tiltDuration?: number;
}

export function tiltCard(node: HTMLElement, options: TiltCardOptions = {}) {
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
	if (prefersReducedMotion || !hasFinePointer) {
		return { destroy() {} };
	}

	let { maxTilt = 9, liftScale = 1.015, tiltDuration = 0.5 } = options;
	const setRotateX = gsap.quickTo(node, 'rotateX', { duration: tiltDuration, ease: 'power3.out' });
	const setRotateY = gsap.quickTo(node, 'rotateY', { duration: tiltDuration, ease: 'power3.out' });
	const setScale = gsap.quickTo(node, 'scale', { duration: tiltDuration, ease: 'power3.out' });

	function handlePointerMove(event: PointerEvent) {
		const rect = node.getBoundingClientRect();
		const px = (event.clientX - rect.left) / rect.width;
		const py = (event.clientY - rect.top) / rect.height;

		setRotateY((px - 0.5) * maxTilt * 2);
		setRotateX((0.5 - py) * maxTilt * 2);
		setScale(liftScale);

		node.style.setProperty('--spotlight-x', `${px * 100}%`);
		node.style.setProperty('--spotlight-y', `${py * 100}%`);
	}

	function handlePointerLeave() {
		setRotateX(0);
		setRotateY(0);
		setScale(1);
	}

	node.style.transformStyle = 'preserve-3d';
	node.style.willChange = 'transform';

	node.addEventListener('pointermove', handlePointerMove);
	node.addEventListener('pointerleave', handlePointerLeave);

	return {
		update(newOptions: TiltCardOptions = {}) {
			({ maxTilt = 9, liftScale = 1.015, tiltDuration = 0.5 } = newOptions);
		},
		destroy() {
			node.removeEventListener('pointermove', handlePointerMove);
			node.removeEventListener('pointerleave', handlePointerLeave);
			gsap.killTweensOf(node);
		}
	};
}
