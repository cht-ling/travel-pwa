import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({ mode }) => {
  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'public-entry',
        transformIndexHtml: {
          order: 'pre',
          handler(html: string) {
            return mode === 'public' ? html.replace('/src/main.tsx', '/src/public-main.tsx') : html;
          },
        },
      },
    ],
    build: {
      rollupOptions: {
        input: path.resolve(__dirname, 'index.html'),
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
