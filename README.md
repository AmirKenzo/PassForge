# PassForge

**Privacy-first, open-source security toolkit** — generate passwords, passphrases, tokens, hashes, and more. Everything runs locally in your browser.

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)

> **Everything is generated locally in your browser. No data ever leaves your device.**

---

## Screenshots

<!-- Replace with actual screenshots after first deploy -->

| Landing Page | Dashboard | Password Generator |
|:---:|:---:|:---:|
| _Coming soon_ | _Coming soon_ | _Coming soon_ |

---

## Features

### Generators
- **Password Generator** — Length 4–256, character groups, custom charset, min counts, batch generation, session history, saved favorites
- **Passphrase Generator** — Diceware-style word lists, separators, optional numbers/symbols
- **Username Generator** — Adjective+noun, random, and tech styles
- **UUID Generator** — UUID v4 and v7, single and batch
- **API Key Generator** — Custom prefix and length
- **Token Generator** — Hex, Base64, alphanumeric formats
- **Random String Generator** — Fully custom character sets

### Analysis & Utilities
- **Password Analyzer** — Entropy, strength score, crack-time estimation, character distribution, recommendations
- **Hash Generator** — MD5, SHA-1, SHA-256, SHA-512 (local Web Crypto API)
- **Security Utilities** — PIN, OTP, random bytes, Base64 encode/decode, environment checks

### Platform
- Dark / Light / System theme with persistence
- Progressive Web App (offline, installable)
- Export data as TXT, CSV, JSON
- Import/export settings as JSON
- Responsive layout with sidebar navigation
- Keyboard accessible, ARIA labels, screen reader support
- Route-based code splitting for fast loads
- i18n-ready architecture (English default)

---

## Privacy

PassForge has **no backend, no accounts, no analytics, and no tracking**.

| | |
|---|---|
| No servers | All crypto runs via `crypto.getRandomValues()` and Web Crypto API |
| No network calls | Generation never contacts external APIs |
| No persistence of secrets | Password history is session-only |
| Open source | MIT licensed — audit the code yourself |

---

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS 4** + **shadcn/ui**
- **React Router 7** · **Framer Motion** · **Zustand**
- **React Hook Form** · **Zod** · **Lucide React**
- **ESLint** · **Prettier** · **vite-plugin-pwa**

---

## Installation

### Prerequisites

- Node.js 20+ (22 recommended)
- npm 10+

### Clone & Install

```bash
git clone https://github.com/amirkenzo/PassForge.git
cd PassForge
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
npm run preview
```

### Other Scripts

```bash
npm run lint          # ESLint
npm run lint:fix      # ESLint with auto-fix
npm run format        # Prettier
npm run typecheck     # TypeScript check
```

### Native builds (Windows + Android)

You do **not** need Android Studio or Rust locally if you use GitHub Actions.

Push to `main` → workflow **Build Native Apps** runs automatically.

| Artifact | Contents |
|----------|----------|
| `passforge-windows-x64` | `.exe` installer + `.msi` |
| `passforge-android-debug` | `app-debug.apk` for phone testing |

Download from: **GitHub → Actions → latest run → Artifacts**

See [BUILD.md](BUILD.md) for local build instructions.

---

## Project Structure

```
src/
├── app/              # Router, providers, app shell
├── pages/            # Landing, dashboard, 404
├── features/         # One folder per tool
├── components/
│   ├── ui/           # shadcn/ui primitives
│   ├── layout/       # Sidebar, header, navigation
│   └── shared/       # Reusable tool components
├── services/         # Pure business logic (generators, hash, etc.)
├── store/            # Zustand (UI, settings, tool state)
├── utils/            # Crypto, clipboard, export, import
├── hooks/            # useTheme, useCopy, useMediaQuery
├── types/            # Shared TypeScript types
├── i18n/             # Internationalization (en default)
├── assets/           # Wordlists and static data
└── config/           # Tool definitions
```

---

## Deployment

### GitHub Pages

1. Enable **GitHub Pages** → Source: **GitHub Actions**
2. Push to `main` — the workflow in `.github/workflows/deploy-github-pages.yml` deploys automatically
3. Site URL: `https://<username>.github.io/PassForge/`

The `base` path is set to `/PassForge/` in `vite.config.ts`. Change it if your repo name differs.

### Cloudflare Pages

1. Connect your GitHub repository in Cloudflare Pages
2. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 22
3. Environment variable (if using a custom domain at root):
   ```
   # Optionally override base in vite.config.ts to '/' for custom domains
   ```

### Manual Deploy

```bash
npm run build
# Upload contents of dist/ to any static host
```

---

## PWA

PassForge ships as an installable Progressive Web App:

- Service worker with offline caching
- Web app manifest
- Install prompt on supported browsers

Add PNG icons to `public/icons/` (see `public/icons/README.md`).

---

## Cross-Platform (Future)

Architecture is prepared for:

| Platform | Status | Notes |
|----------|--------|-------|
| Web / PWA | ✅ Ready | Default target |
| GitHub Pages | ✅ Ready | CI workflow included |
| Cloudflare Pages | ✅ Ready | Static build |
| Tauri (Desktop) | 🔧 Prepared | See `src-tauri/README.md` |
| Capacitor (Android) | 🔧 Prepared | See `capacitor.config.ts` |

Platform abstraction lives in `src/services/platform.ts` and `src/utils/clipboard.ts`.

---

## Roadmap

| Version | Features |
|---------|----------|
| **v1.0** _(current)_ | All core tools, PWA, themes, export/import |
| **v1.5** | Secure local vault, encrypted storage, custom wordlists |
| **v2.0** | Browser extension, password manager mode, plugins, i18n |
| **v3.0** | E2E encrypted sync, team features, secure notes, native mobile |

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

All contributions must remain **fully client-side** with no tracking or external data transmission.

---

## License

[MIT License](LICENSE) © 2026 Amir Kenzo

---

<p align="center">
  <strong>PassForge</strong> — Forge your credentials. Keep your privacy.
</p>
