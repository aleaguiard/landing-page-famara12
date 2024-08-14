import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
	output: 'server',
	integrations: [tailwind(), react()],
	adapter: vercel({
		webAnalytics: { enabled: true },
	}),
	redirects: {
		'/': '/es',
	},
});
export const prerender = false;
