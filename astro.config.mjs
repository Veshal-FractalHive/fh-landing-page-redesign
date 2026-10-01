// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	site: 'https://fractalhive.com',
	integrations: [mdx(), sitemap(), icon()],
	// Keep old fractalhive.com URLs working. Mirror these as 301s in staticwebapp.config.json at deploy.
	redirects: {
		'/contact': '/demo',
	},
	fonts: [
		{
			// Brand typeface. Downloaded at build time and self-hosted; no requests to Google at runtime.
			provider: fontProviders.google(),
			name: 'Mona Sans',
			cssVariable: '--font-mona',
			weights: ['200 900'],
			styles: ['normal'],
			fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
			// The width axis carries state (see the fractalhive-design skill), so keep the full range.
			options: { experimental: { variableAxis: { wdth: [['75', '125']] } } },
		},
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
