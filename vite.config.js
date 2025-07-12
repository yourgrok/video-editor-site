// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Renn India | Video Editor',
        },
      },
    }),
  ],
  css: {
    postcss: './postcss.config.js',
  },
});
