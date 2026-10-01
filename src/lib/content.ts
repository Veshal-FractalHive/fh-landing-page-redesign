import { getCollection } from 'astro:content';

export async function getProducts() {
	const products = await getCollection('products');
	return products.sort((a, b) => a.data.order - b.data.order);
}

/** Newest first. Drafts appear in dev only, so unchecked article text never ships. */
export async function getInsights() {
	const insights = await getCollection(
		'insights',
		({ data }) => import.meta.env.DEV || !data.draft,
	);
	return insights.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getProductNames() {
	const products = await getProducts();
	return Object.fromEntries(products.map((p) => [p.id, p.data.name]));
}
