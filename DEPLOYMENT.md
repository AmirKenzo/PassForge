# PassForge Deployment Guide

## GitHub Pages

### One-time setup

1. Go to repository **Settings → Pages**
2. Under **Build and deployment**, set Source to **GitHub Actions**
3. For a **custom domain**, set it under **Settings → Pages → Custom domain** and configure DNS

### Automatic deployment

Every push to `main` triggers `.github/workflows/deploy-github-pages.yml`.

Both URLs work from a single build:

- Custom domain: `https://passforge.ak6.ir`
- GitHub Pages: `https://<username>.github.io/PassForge/`

### Dual-domain notes

- Build uses relative asset paths (`base: './'`) so JS/CSS resolve on both hosts
- `getRouterBasename()` picks `/PassForge` on `*.github.io` and `''` on the custom domain
- `scripts/copy-spa-fallback.mjs` copies `index.html` → `404.html` so routes like `/app` work on refresh

---

## Cloudflare Pages

### Connect repository

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages**
2. **Create application** → **Pages** → **Connect to Git**
3. Select the PassForge repository

### Build configuration

| Setting | Value |
|---------|-------|
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | 22 |

### Environment variables

For root deployment on a custom domain, you may change `base` in `vite.config.ts` to `'/'`.

### Preview deployments

Cloudflare automatically builds preview URLs for pull requests.

---

## Manual / Self-hosted

```bash
npm ci
npm run build
```

Serve the `dist/` folder with any static file server (nginx, Caddy, Apache, S3, etc.).

### nginx example

```nginx
server {
    listen 80;
    server_name passforge.example.com;
    root /var/www/passforge/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## PWA Icons

Before production deploy, add:

- `public/icons/icon-192.png`
- `public/icons/icon-512.png`
- `public/og-image.png` (1200×630 for social sharing)

Generate from `public/favicon.svg` using [RealFaviconGenerator](https://realfavicongenerator.net/) or similar.
