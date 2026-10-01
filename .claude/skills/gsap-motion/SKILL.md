---
name: gsap-motion
description: How to write GSAP, ScrollTrigger, SplitText and Lenis animation in this Astro project. Load before writing or changing any animation, scroll effect, text reveal or state transition.
---

# GSAP motion

Setup lives in `src/scripts/gsap.ts`: it registers CustomEase, ScrollTrigger and SplitText, creates GSAP
eases from the CSS easing tokens (`ui-out`, `ui-in-out`, `ui-drawer`), starts Lenis smooth scroll (off for
reduced motion) and exports `gsap`, `ScrollTrigger`, `SplitText`, `lenis`, `withMotion()` and `token()`.
Import from there. Never call `gsap.registerPlugin` anywhere else.

## Relationship to Emil Kowalski's skills

The `animate`, `emil-design-eng`, `review-animations`, `improve-animations`, `find-animation-opportunities`
and `apple-design` skills set the **craft bar**: whether something should animate, purpose, curves,
durations, origin, interruptibility. Follow them. This skill sets the **stack**, and wins on tooling:

- Their examples use Framer Motion / React. This project has neither. Translate to CSS or GSAP; never
  install Motion, Framer Motion or React for an animation.
- Their curves are already the project tokens (`--ease-out`, `--ease-in-out`, `--ease-drawer`). Use the
  tokens, never retype the cubic-bezier.
- Run review-animations over any animation diff before calling it done.

## Pick the cheapest tool

| Need | Tool |
|---|---|
| Hover, press, colour, a `data-state` toggle | CSS transition with tokens (`transition-transform duration-(--duration-press) ease-out`) |
| Entry of an element with no JS | CSS `@starting-style` |
| A single programmatic animation | WAAPI `element.animate()` |
| Orchestrated sequences, scroll-linked diagrams, SplitText, anything with ScrollTrigger | GSAP |

Tailwind's `hover:` variant already only applies on devices that support hover, so hover motion is gated.
Press feedback on every pressable element: `active:scale-[0.97]` with a `--duration-press` transform transition.

## Where animation code goes

Inside the component that owns the markup, in a plain `<script>` (Astro bundles and runs it once per page).
Target elements with `data-*` hooks, never styling classes.

```astro
<div data-anim="pipeline">
	<span data-node data-state="idle">Ingest</span>
	<span data-node data-state="idle">Process</span>
	<span data-node data-state="idle">Deliver</span>
</div>

<script>
	import { gsap, withMotion, token } from '../../scripts/gsap';

	withMotion(() => {
		document.querySelectorAll<HTMLElement>('[data-anim="pipeline"]').forEach((root) => {
			const nodes = root.querySelectorAll<HTMLElement>('[data-node]');
			const tl = gsap.timeline({
				scrollTrigger: { trigger: root, start: 'top 70%' },
				defaults: { duration: token('--duration-base') as number, ease: 'ui-out' },
			});
			nodes.forEach((node) => {
				tl.call(() => (node.dataset.state = 'active')).to(node, { scale: 1.04, yoyo: true, repeat: 1 });
				tl.call(() => (node.dataset.state = 'success'));
			});
		});
	});
</script>
```

## Rules

- **Reduced motion:** wrap every GSAP animation in `withMotion()`. The HTML/CSS must already show a sensible
  final state, so reduced-motion users and no-JS visitors see the end result, never a blank or half state.
  Don't hide content with CSS waiting for JS to reveal it. Reduced motion means gentler, not zero: CSS
  opacity and colour transitions stay; movement (translate, scale, scroll scrub) goes.
- **State, not decoration:** animations drive `data-state` changes (see fractalhive-design). CSS owns how a
  state looks; GSAP owns when it changes and the motion in between.
- **Performance:** animate `transform`, `opacity`, `clip-path`, SVG `stroke-dashoffset`. Never animate
  `width`/`height`/`top`/`left`/`margin` on scroll. Use `will-change` only during an animation.
- **Timing:** read durations from tokens via `token('--duration-base')`, and use the token eases `ui-out`
  (entering/exiting, default), `ui-in-out` (moving on screen), `ui-drawer`. Never `ease-in`/`power*.in` on
  UI. UI motion stays under 300ms; only explanatory diagrams may use `--duration-slow`.
- **Never animate from `scale(0)`.** Start at `scale(0.95)` with `opacity: 0`. Stagger groups by 30–80ms.
- **ScrollTrigger:** `scrub` only for diagrams that explain a process step by step. Simple reveals play
  once (`toggleActions: 'play none none none'`). Pin sparingly and test on mobile.
- **SplitText:** use `SplitText.create(el, { type: 'lines', mask: 'lines', autoSplit: true, onSplit: (self) => gsap.from(self.lines, {...}) })`
  so lines re-split on resize and font load. Reserve it for one headline moment per page.
- **Lenis:** already synced to ScrollTrigger. For anchor links use `lenis?.scrollTo(target)`. Add
  `data-lenis-prevent` to elements that need native scroll (modals, code blocks).
- **One signature moment per page.** Don't stack scroll animations on every section.
- **Page transitions** are native CSS view transitions (`global.css`). If Astro's `<ClientRouter />` is ever
  added, animation setup must move into an `astro:page-load` listener and kill old triggers on
  `astro:before-swap`.

## Checking your work

Test with reduced motion on (macOS: Accessibility > Display > Reduce motion, or emulate in DevTools or
Playwright). Check there's no layout shift and that it scrolls smoothly at 390px.
