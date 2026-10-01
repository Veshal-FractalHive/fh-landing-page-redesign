---
name: ship-check
description: Verification checklist to run before saying any change in this project is done. Builds, type-checks, lints, then visually checks the page at mobile and desktop widths, with and without reduced motion. Load after finishing any code change.
---

# Ship check

Run these in order and report results honestly, including failures.

## 1. Static checks

```bash
npm run build
npm run check
npm run lint
npm run format:check
```

Fix failures before moving on. Use `npm run format` to fix formatting.

## 2. Visual check (when UI changed)

Start the dev server with `astro dev --background`. If the `playwright` plugin is enabled, use it to:

1. Open each changed page at **390×844** and **1440×900**. Take screenshots and look at them.
2. Repeat with reduced motion emulated. Content must be fully visible, with no blank areas waiting on animation.
3. Check the browser console for errors.
4. Tab through the page: every interactive element is reachable, with a visible focus ring.
5. Check there's no horizontal scroll at 390px.

Stop the server afterwards with `astro dev stop`.

## 3. Design check

- No raw hex or arbitrary values in changed components (search for `#` inside `class=` and for `[#`).
- New components or states have been added to `/styleguide`.
- State changes pair colour with a shape, icon or text.

## 4. Report

Say what was run, what passed, what failed and what was skipped (e.g. "Playwright not enabled, no visual check").
