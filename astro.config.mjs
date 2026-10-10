// @ts-check
import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL || undefined;

export default defineConfig({
	output: 'static',
	site,
});
