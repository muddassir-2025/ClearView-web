import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Relative base so the built site works from any folder, on any static host
  // (GitHub Pages project sites, Netlify, S3 subfolders, plain file servers).
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
