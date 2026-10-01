import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(CustomEase, ScrollTrigger, SplitText);

/** Read a token from global.css. Durations come back in seconds: token('--duration-base') -> 0.28 */
export function token(name: string) {
	const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	return value.endsWith('ms') ? parseFloat(value) / 1000 : value;
}

// Mirror the CSS easing tokens as GSAP eases, so CSS and GSAP motion share one curve set.
// Use them by name: ease: 'ui-out' | 'ui-in-out' | 'ui-drawer'.
for (const name of ['out', 'in-out', 'drawer']) {
	const curve = String(token(`--ease-${name}`)).match(/cubic-bezier\(([^)]+)\)/)?.[1];
	if (curve) CustomEase.create(`ui-${name}`, curve);
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync. Off for reduced motion. */
export const lenis = reducedMotion ? null : new Lenis();

if (lenis) {
	lenis.on('scroll', ScrollTrigger.update);
	gsap.ticker.add((time) => lenis.raf(time * 1000));
	gsap.ticker.lagSmoothing(0);
}

// Web fonts change text metrics, so recalculate trigger positions once they've loaded.
document.fonts.ready.then(() => ScrollTrigger.refresh());

/**
 * Run animations only when the user hasn't asked for reduced motion.
 * Returns the gsap.matchMedia instance so callers can revert() on cleanup.
 */
export function withMotion(setup: () => void) {
	const mm = gsap.matchMedia();
	mm.add('(prefers-reduced-motion: no-preference)', setup);
	return mm;
}

export { gsap, ScrollTrigger, SplitText };
