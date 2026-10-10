// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL || 'https://menaceworldtech.vercel.app';

export default defineConfig({
	output: 'static',
	site,
	integrations: [
		sitemap(),
	],
});
