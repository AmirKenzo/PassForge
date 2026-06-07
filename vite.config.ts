import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appVersion = JSON.parse(
  readFileSync(path.resolve(__dirname, 'package.json'), 'utf8'),
).version as string;

export default defineConfig(({ mode }) => {
  const isNative = mode === 'native';
  // Relative base works on both github.io/PassForge/ and a custom domain root.
  const base = process.env.BASE_PATH ?? './';

  return {
    base,
    server: {
      watch: {
        ignored: ['**/src-tauri/target/**', '**/android/**'],
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      ...(!isNative
        ? [
            VitePWA({
              registerType: 'autoUpdate',
              includeAssets: ['favicon.ico', 'icons/*.png', 'robots.txt', 'build-version.txt'],
              manifest: {
                name: 'PassForge — Privacy-First Security Toolkit',
                short_name: 'PassForge',
                description:
                  'Generate passwords, passphrases, tokens, and more — entirely on your device.',
                theme_color: '#0f172a',
                background_color: '#0f172a',
                display: 'standalone',
                orientation: 'portrait-primary',
                scope: base,
                start_url: base,
                icons: [
                  { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
                  { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
                  {
                    src: 'icons/icon-512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable',
                  },
                ],
              },
              workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,txt}'],
                navigateFallback: 'index.html',
                cleanupOutdatedCaches: true,
                additionalManifestEntries: [
                  { url: 'build-version.txt', revision: appVersion },
                ],
              },
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            motion: ['framer-motion'],
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          },
        },
      },
    },
  };
});
