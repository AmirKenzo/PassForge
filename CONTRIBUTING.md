# Contributing to PassForge

Thank you for your interest in contributing to PassForge! This project is privacy-first — all contributions must maintain that principle.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/PassForge.git`
3. Install dependencies: `npm install`
4. Start dev server: `npm run dev`
5. Create a branch: `git checkout -b feature/your-feature`

## Development Guidelines

### Privacy First

- **Never** add backend dependencies, analytics, or tracking
- **Never** send user-generated data to external APIs
- All generation and processing must happen client-side
- Use `crypto.getRandomValues()` for all random generation

### Code Style

- TypeScript strict mode
- Feature-based folder structure under `src/features/`
- Business logic in `src/services/`, not in components
- Run `npm run lint` and `npm run format` before committing

### Architecture

```
src/
├── app/          # App shell, router, providers
├── pages/        # Top-level pages
├── features/     # Feature modules (one per tool)
├── components/   # Shared UI and layout
├── services/     # Business logic (pure functions)
├── store/        # Zustand stores
├── utils/        # Utilities
├── hooks/        # React hooks
├── types/        # TypeScript types
├── i18n/         # Internationalization
└── config/       # App configuration
```

### Commits

Use clear, descriptive commit messages:

- `feat: add custom wordlist support`
- `fix: prevent repeated chars edge case`
- `docs: update deployment instructions`

## Pull Request Process

1. Ensure CI passes (`typecheck`, `lint`, `build`)
2. Fill out the PR template completely
3. Confirm the privacy checklist
4. Request review

## Reporting Bugs

Use the bug report issue template. Do not include real passwords or secrets.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
