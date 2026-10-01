import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** The three products are the site's headline (docs/content/site-plan.md). */
const products = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/products' }),
	schema: z.object({
		name: z.string(),
		order: z.number(),
		tagline: z.string(),
		summary: z.string().max(160), // doubles as the meta description
		audience: z.string(),
		problem: z.string(),
		capabilities: z.array(z.object({ title: z.string(), description: z.string() })).length(3),
		diagram: z.enum(['deal-pipeline', 'valuation-tracker', 'agent-workflow']),
	}),
});

const insights = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/insights' }),
	schema: z.object({
		title: z.string(),
		summary: z.string().max(160),
		date: z.coerce.date(),
		author: z.string(),
		product: reference('products').optional(), // omitted for company articles
		linkedin: z.url().optional(),
		// Drafts show in dev only. Articles stay drafts until their text is checked against LinkedIn.
		draft: z.boolean().default(false),
	}),
});

const roles = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/roles' }),
	schema: z.object({
		title: z.string(),
		team: z.string(),
		location: z.string(),
		type: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship']),
		experience: z.string(),
		summary: z.string(),
		requirements: z.array(z.string()).min(1),
		open: z.boolean().default(true),
	}),
});

export const collections = { products, insights, roles };
