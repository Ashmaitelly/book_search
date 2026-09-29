import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // GitHub Pages serves the site from /<repo>/
  base: '/book_search/',
  plugins: [react()],
  server: { port: 3000 },
});
