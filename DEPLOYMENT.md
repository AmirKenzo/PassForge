# PassForge Deployment Guide

## GitHub Pages

### One-time setup

1. Go to repository **Settings → Pages**
2. Under **Build and deployment**, set Source to **GitHub Actions**
3. Ensure the repository name matches the `base` path in `vite.config.ts` (default: `/PassForge/`)

### Automatic deployment

Every push to `main` triggers `.github/workflows/deploy-github-pages.yml`.

Live URL: `https://<username>.github.io/PassForge/`

### Custom domain

1. Set `base: '/'` in `vite.config.ts`
2. Update PWA manifest `scope` and `start_url` in `vite.config.ts`
3. Add a `CNAME` file in `public/` if using a custom domain
4. Configure DNS with your domain provider

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
