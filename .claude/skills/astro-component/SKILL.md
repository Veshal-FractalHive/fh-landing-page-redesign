---
name: astro-component
description: Conventions for creating Astro components, pages and layouts in this project (file placement, props, variants, icons, images, scripts). Load before adding or changing any .astro file.
---

# Astro components

## Where things go

| Path | Contents |
|---|---|
| `src/components/ui/` | Basic components: Button, Container, Section, Card, Heading, Badge, StateDot |
| `src/components/layout/` | Header, Footer, MobileNav, SEO (head tags) |
| `src/components/sections/` | Page sections built from basic components (Hero, ServicesGrid, ContactForm) |
| `src/components/diagrams/` | State-driven SVG/HTML product diagrams |
| `src/layouts/` | Page shells (`Layout.astro` imports `global.css`) |
| `src/pages/` | Routes. Keep pages thin: compose sections, pass content in |
| `src/content/` | MDX content (see content-mdx skill) |
| `src/scripts/` | Shared client code (`gsap.ts`) |

File names are PascalCase for components, kebab-case for pages.

## Component shape

```astro
---
import type { HTMLAttributes } from 'astro/types';

interface Props extends HTMLAttributes<'a'> {
	variant?: 'primary' | 'secondary' | 'ghost';
	href: string;
}

const { variant = 'primary', href, class: className, ...rest } = Astro.props;

const variants = {
	primary: 'bg-brand text-surface',
	secondary: 'border border-ink text-ink',
	ghost: 'text-ink',
} satisfies Record<NonNullable<Props['variant']>, string>;
---

<a href={href} class:list={['inline-flex items-center gap-2', variants[variant], className]} {...rest}>
	<slot />
</a>
```

- Always declare `interface Props`. Variants are typed unions mapped to token classes, never free-form strings.
- Use `class:list` to merge, and allow a `class` passthrough for layout-only tweaks.
- Polymorphic elements: accept an `as` prop only when there's a real need.
- Slots for content, props for configuration.

## Icons, images, fonts

- Icons: `import { Icon } from 'astro-icon/components';` then `<Icon name="lucide:arrow-right" aria-hidden="true" />`.
  An icon-only button needs an `aria-label`.
- Images: `import { Image, Picture } from 'astro:assets';` with files in `src/assets/`. Always set `alt`
  (empty `alt=""` only for decorative images). Never put content images in `public/`.
- Fonts: when the rebrand typefaces are picked, add them with Astro's Fonts API and point `--font-sans` /
  `--font-display` at them. No Google Fonts `<link>` tags.

## Client-side code

- Default is zero JS. Add a `<script>` only for animation (gsap-motion skill) or real interaction.
- No UI framework is installed. If a component needs real client state (e.g. a complex filter), discuss
  adding a React island first; don't add one silently.

## When you add a component

1. Build it from tokens only (fractalhive-design skill).
2. Add every variant and state to `src/pages/styleguide.astro`.
3. Run the ship-check skill.
