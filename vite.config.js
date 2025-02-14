import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/kimi/', // Ensure assets are correctly referenced
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    host: true,
  },
});
