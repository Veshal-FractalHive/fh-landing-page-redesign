## Project

Redesign of fractalhive.com: a full rebrand built as a static Astro site, deployed to Azure Static Web Apps.
Server logic (the contact form) lives in Azure Functions under `api/`, not in an Astro adapter.

Stack: Astro 7, Tailwind v4 (tokens in `src/styles/global.css`), MDX content collections,
astro-icon + Lucide (`<Icon name="lucide:..." />`), GSAP + ScrollTrigger + Lenis (`src/scripts/gsap.ts`).
No UI framework. Add a React island only when a component truly needs client state.

Checks before calling work done: `npm run build`, `npm run check`, `npm run lint`, `npm run format:check`.

## Design direction

The visual system itself communicates state, in the spirit of Stripe. Project skills in `.claude/skills/`
hold the detailed rules. Load the relevant ones before working:

| Skill                | Load when                                                     |
| -------------------- | ------------------------------------------------------------- |
| `fractalhive-design` | Any visual work: tokens, colour, type, layout, sections       |
| `gsap-motion`        | Any animation, scroll effect or state transition              |
| `astro-component`    | Adding or changing `.astro` files                             |
| `content-mdx`        | Content collections, MDX, pages that list content             |
| `azure-deploy`       | `staticwebapp.config.json`, `api/`, deploy workflow, env vars |
| `ship-check`         | Before saying any change is done                              |

Emil Kowalski's motion skills are installed in `.agents/skills/` (linked into `.claude/skills/`):
`animate`, `emil-design-eng`, `review-animations`, `improve-animations`, `find-animation-opportunities`,
`animation-vocabulary`, `apple-design`, `prototype`. They set the craft bar for motion. The project skills win
on stack: translate their Framer Motion/React examples to CSS or GSAP, and never install those libraries.

Short version:

- Use design tokens only. No raw hex or arbitrary Tailwind values in components.
- Show state (idle, active, flowing, success, warning) through colour, motion and form, not just labels.
- All GSAP code goes through `withMotion()` so reduced-motion users get the static end state.
- Content pages ship near-zero JS and meet WCAG AA.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
