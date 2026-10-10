---
name: fractalhive-design
description: FractalHive visual language, design tokens and state system. Load before designing or changing any page, section, component, colour, type, spacing or layout in this project. For animation code also load gsap-motion; for component code also load astro-component.
---

# FractalHive design system

## Core idea

The interface explains itself through its visual state. A visitor should understand what a system does,
and what is happening in it, from colour, motion and form alone. Copy confirms; it doesn't carry the meaning
on its own.

Reference points: Stripe (abstracted product UI, flowing connections, data moving through a system) and
Razorsense (link pending from the user; ask for it before leaning on it).

This is a full rebrand. Nothing from the current fractalhive.com look is kept by default, only its content.

## Working process

1. If the `frontend-design` plugin is enabled, follow its two-pass process (plan tokens and layout, review
   the plan against the brief, then build). The rules in this file win where they're more specific.
2. Ground every section in what FractalHive actually does. A diagram should show the real mechanism, not
   generic nodes.
3. Spend boldness in one place per page: one signature moment (usually a state-driven hero diagram).
   Everything around it stays quiet and disciplined.
4. Add or update the `/styleguide` entry for anything new.

## Tokens

All tokens live in `src/styles/global.css` inside `@theme`. Components use token utilities only
(`bg-surface`, `text-ink`, `bg-state-active`, `ease-out`, `duration-(--duration-base)`). No raw hex, no
`[#...]` arbitrary values.
If a value is missing, add a token first, then use it.

| Group | Tokens | Use |
|---|---|---|
| Brand | `brand`, `brand-2`, `brand-3`, `on-brand`, `bg-brand-gradient` | Identity, primary actions. Current logo colours, temporary |
| Neutrals | `surface`, `panel`, `ink`, `muted`, `line`, `navy`, `info` | Backgrounds, text, borders. From the component library |
| State | `state-idle`, `state-active`, `state-flowing`, `state-success`, `state-warning`, `state-error` | System state, everywhere |
| Motion | `--duration-press/fast/base/slow`, `--ease-out/in-out/drawer` | CSS transitions; GSAP via `token()` and `ui-*` eases. Values come from Emil Kowalski's skills, don't change them casually |
| Type | `font-sans`, `text-display/h1/h2/h3/lead/body/small/label`, `font-regular/medium/semibold/strong` | See Typography below. Final |

## Colour (decided 2026-10-01)

Raw values live in `:root` (light) and the dark blocks at the top of `global.css`; `@theme inline` maps them
to Tailwind colours. Tailwind's default palette is removed, so only the tokens above exist. Use opacity
modifiers for tints (`bg-state-success/10`, `ring-brand/20`), not new colours.

- **Brand = the current logo** (violet `#5600FD` → magenta `#A8498C` → orange `#F28C25`). The company name
  and logo will change, so brand colour appears only through `brand*` tokens. A rebrand changes `--brand-*`
  in `global.css` and nothing else.
- **Neutrals and state colours come from the component library** (ui.fractalhive.com, `--fh-*` tokens) so
  the site and the products look like one family. Keep them in sync with that library.
- `state-active` is the brand violet. `state-flowing` (also **AI thinking**, e.g. Nico) is the brand
  magenta, and its moving connectors and markers use `bg-brand-gradient`.
- The gradient is reserved for flowing/AI-thinking and at most one brand moment per page. Never put text
  in or on it, and never use `brand-3` (orange, 2.3:1) for text. Warning is amber `state-warning` with a
  triangle marker, so it stays distinct from the brand orange.
- Dark mode follows `prefers-color-scheme`; `data-theme="dark"|"light"` on `<html>` overrides it. Check
  every new surface in both.
- Every text colour has been checked to WCAG AA in both modes. Recheck if you change a value.

Palette comparison (pre-decision, three logo-independent options): https://claude.ai/artifact/5VEWNViYWu2bfciSKh2YYm

Change token values, never names, so components don't need touching.

## Typography (decided 2026-10-01)

**Mona Sans**, one variable family for everything (weight 200–900, width 75–125%), self-hosted through
Astro's Fonts API (`astro.config.mjs` → `<Font cssVariable="--font-mona" preload />` in `Layout.astro`).
Chosen over IBM Plex and a Newsreader + Instrument Sans pairing because its width axis lets type carry state.
Comparison: https://claude.ai/artifact/Jdhepd5XHnzJVy4rDtZnHH

- **Sizes:** only the scale tokens exist (Tailwind's `text-sm` etc. are removed). `text-display` once per
  page for the hero. `h1`–`h3`, `p` and tables are styled in the base layer already.
- **Weights:** `font-regular` (400, body), `font-medium` (520, labels, settled state),
  `font-semibold` (620, headings), `font-strong` (660, active state only). No others.
- **Widths:** `font-stretch-condensed` (88%, table headers and dense labels), normal (100%),
  `font-stretch-display` (108%, display and h1; already on `h1`). 92% and 112% are reserved for `state-type`.
- **State:** add `state-type` next to `data-state` on labels whose state changes. Idle is 400 weight at 92%
  width, active is 660 at 112%, success settles to 520 at 100%. Always pair it with a state colour and a shape
  or icon; width alone is too subtle to carry meaning.
- **Figures:** tables, `<time>` and `<data>` get `tabular-nums` automatically; add it to any other column of numbers.
- Headings use `text-balance`, paragraphs `text-pretty`. Keep running text to `max-w-prose` (65ch).
- Tracking is built into the scale tokens. Don't add `tracking-*` or uppercase labels.

## State language

State is expressed with a `data-state` attribute, styled in CSS from tokens, and animated by GSAP only
during the change. The page reads correctly with JavaScript off.

```astro
<div data-state="idle" class="data-[state=active]:bg-state-active data-[state=success]:bg-state-success">
```

| State | Visual treatment |
|---|---|
| idle | Muted ink, thin outline, no motion |
| active | Active colour, filled or heavier outline, at most a subtle pulse |
| flowing | Dash or particle moving along a path: data travelling between nodes |
| success | Settles: motion stops, fill completes, success colour |
| warning | Warning colour, triangle marker, no celebratory motion |
| error | Error colour, diamond marker, no motion; message says what went wrong and how to fix it |

Marker shapes (never colour alone): idle hollow ring, active filled dot with ring, flowing spinning split
ring, success filled check, warning triangle, error diamond.

Rules:
- One meaning per state, everywhere: diagrams, badges, buttons, form feedback, nav.
- Never use colour alone. Pair it with shape, icon or text so it works for colour-blind users and
  screen readers (e.g. `aria-live` text on form status).
- Animate the change between states; avoid idle decoration that loops forever.

## Page patterns (Stripe-inspired, decided 2026-10-01)

The user asked for Stripe's landing page as the layout reference. Use these patterns; skip Stripe's
customer logos, stats bands and case studies (we have no clients or metrics yet; see the claims policy).

- **Two-tone headings:** one heading, a short ink statement then a muted continuation at the same size:
  `<span class="text-ink">Statement.</span>{' '}<span class="text-muted">Continuation…</span>`, `font-medium`.
  Always put `{' '}` between the spans (Astro strips the whitespace).
- **Hero brand moment:** `HeroRibbon` (a WebGL shader ribbon in `--brand-*` colours, `src/components/sections/`).
  One per site, home hero only. It fades out towards the text column; never put text on it.
- **Product bento:** `ProductBento`. Two tiles on top, one full width below. Pointer or keyboard focus on a
  tile grows it by animating `grid-template-columns/rows` (tiles never move); it fades in its full view
  (text column + live `ProductDiagram` window over `bg-brand-wash`), the others show a compact summary. The
  last tile pointed at stays open. Smoothness rules (user-tested): each tile has ONE heading that never
  changes size, position or opacity; only the `.detail` parts (problem, capability chips, workflow window)
  and the small-tile footer fade, opacity only, no movement. Nothing is ever blank. The open tile splits
  2:3 text/window so step labels fit. Inside diagrams, steps change by colour, weight and marker only (no
  width-axis change: it made labels breathe and truncate). Step labels never wrap.
- **Live status line:** small bento tiles show the focus step of their product's workflow (most urgent:
  error, warning, AI thinking, in progress; else the last step), updated live from the window via the
  `diagram:frame` event. Workflow data lives in `src/lib/diagrams.ts`, shared by both.
- **Live diagrams:** `ProductDiagram` plays its workflow frames (state + note per step) while on screen,
  ~1.7 s per frame, with a pause/play button (WCAG 2.2.2), paused for reduced motion, and a still frame
  without JS. Add frames there when the product team confirms real flows.
- **Primary button ("Request a demo"):** navy `bg-navy` (#1F3B5E ≈ library primary #1E3A5F) with
  `text-surface`, chosen by the user; brand violet is not used for the CTA.
- **Header:** transparent and `absolute` over the page (not sticky); the home hero runs underneath it
  (`<Layout underHeader>`). Buttons have sharp `rounded-sm` (4px) corners, like Stripe's.
- **Article carousel** (home): Stripe-style sideways track with tall 4:5 image cards (`imagePortrait`,
  graded crops of the same photo), kept inside the content column (no bleed past the layout guides; 3/2/1 cards). On hover only the image expands: it
  clip-reveals about 6px (`--bleed`) wider on each side, same height, corners staying rounded (the user wants them kept) (`InsightCover bleed`, 0.8s
  `--ease-reveal`), and the chevron in "Read the article" nudges 4px right. No card surface; no text moves.
  If a style change doesn't show, the dev server may be serving a cached component stylesheet: touch the file. Cards are 2rem apart. The text never moves.
- **Layout guides:** hairline vertical lines at the content column edges (in `Layout.astro`, desktop only);
  sections separated by `border-t border-line`.
- **Three-column reasons:** small bordered icon, bold lead-in + muted sentence, chevron link.
- Section rhythm: `py-20 sm:py-28`.

## Avoid generic defaults

Don't reach for these unless the brief asks for them: identical rounded SaaS cards with the same soft
shadow, gradient washes as decoration, ALL-CAPS eyebrow labels over every heading, `01 / 02 / 03` markers
on content that isn't a sequence, fade-and-slide-up on every section, `→` appended to every link.

## Layout and type

- Mobile first. Check at 390px and 1440px.
- Body line length under ~75 characters. One `h1` per page.
- Structural devices (borders, numbering, dividers) must encode information, not decorate.

## Accessibility baseline

WCAG AA contrast, visible focus rings (token-coloured), keyboard-reachable interactions, semantic landmarks,
reduced motion respected (see gsap-motion).
