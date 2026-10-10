---
name: content-mdx
description: How site content (services, case studies, insights, team) is stored and rendered with Astro content collections and MDX. Load before adding or editing content, collection schemas, or pages that list content.
---

# Content collections

Content is edited by developers in the repo as MDX. There is no CMS.

## Layout

```
src/content.config.ts          # collection definitions + schemas
src/content/services/*.mdx
src/content/case-studies/*.mdx
src/content/insights/*.mdx
```

## Defining a collection

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/services' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			summary: z.string().max(160),
			order: z.number(),
			icon: z.string(), // lucide icon name, e.g. 'lucide:workflow'
			cover: image().optional(),
			draft: z.boolean().default(false),
		}),
});

export const collections = { services };
```

## Rules

- Every collection has a strict schema. `summary` doubles as the meta description, so keep it under 160 characters.
- Filter `draft` out in production: `getCollection('services', ({ data }) => import.meta.env.DEV || !data.draft)`.
- Sort explicitly (by `order` or `date`). Never rely on file order.
- File name = URL slug. Use kebab-case.
- Images sit next to the MDX file and go through the schema's `image()` helper so they're optimised.
- MDX may import components from `src/components/` (e.g. a diagram inside a case study). Keep that to
  content-specific pieces. Layout chrome belongs in the page, not the MDX.
- Copy comes from the current fractalhive.com and gets rewritten for the rebrand. Source material lives in
  `docs/content/` (inventory, article drafts, and the page-by-page plan in `site-plan.md`).
- **Claims policy:** the products have no clients and the company has no certifications yet. Never write or
  imply client logos, testimonials, metrics, uptime, monitoring or security badges. Every claim must be true
  today; follow the "Claims policy" section of `docs/content/site-plan.md`. Leave a clear `TODO:` for the
  user instead of inventing anything.
- Article covers: `image` (16:9 JPG in `src/assets/insights/`): a real, relevant Unsplash photo (free licence,
  never Unsplash+), cropped to 16:9 (`image`) and 4:5 (`imagePortrait`, for the home carousel) with the shared colour grade. Record every photo in
  `docs/content/image-credits.md`. Without an image, `cover.figure`/`cover.caption` render a generated
  key-figure cover; the figure must come from the article.
- Article drafts marked `status: needs-verification` or `needs-full-text` must not be published until the
  user confirms the text.

## Rendering

```astro
---
import { getCollection, render } from 'astro:content';
export async function getStaticPaths() {
	const entries = await getCollection('services');
	return entries.map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}
const { entry } = Astro.props;
const { Content } = await render(entry);
---
```
