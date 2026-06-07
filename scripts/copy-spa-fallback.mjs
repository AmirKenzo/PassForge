import { copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const index = join(root, 'dist/index.html');
const fallback = join(root, 'dist/404.html');

if (!existsSync(index)) {
  console.error('dist/index.html not found — skipping SPA fallback copy');
  process.exit(1);
}

copyFileSync(index, fallback);
console.log('Created dist/404.html for GitHub Pages client-side routing');
