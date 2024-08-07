import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
	output: 'server',
	integrations: [tailwind(), react()],
});

export const prerender = false;
