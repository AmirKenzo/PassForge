import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const isGithubPages = mode === 'production';
  const isNative = mode === 'native';
  const base = isGithubPages ? '/PassForge/' : isNative ? './' : '/';

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
              includeAssets: ['favicon.ico', 'icons/*.png', 'robots.txt'],
              manifest: {
                name: 'PassForge — Privacy-First Security Toolkit',
                short_name: 'PassForge',
                description:
                  'Generate passwords, passphrases, tokens, and more — entirely on your device.',
                theme_color: '#0f172a',
                background_color: '#0f172a',
                display: 'standalone',
                orientation: 'portrait-primary',
                scope: isGithubPages ? '/PassForge/' : '/',
                start_url: isGithubPages ? '/PassForge/' : '/',
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
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
                navigateFallback: 'index.html',
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
