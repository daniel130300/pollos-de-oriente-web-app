import { defineConfig } from 'vite';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
    checker({
      // e.g. use TypeScript check
      typescript: true,
      eslint: {
        // for example, lint .ts and .tsx
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
  ],
  resolve: {
    alias: [{ find: 'src', replacement: path.resolve(__dirname, 'src') }],
  },
});
