/** Must match the GitHub repository name for github.io project pages. */
const GITHUB_PAGES_REPO = 'PassForge';

/**
 * React Router basename for multi-host GitHub Pages deploys.
 * - github.io → /PassForge (project subpath)
 * - custom domain → '' (site root)
 * - Tauri/Capacitor (native) → ''
 */
export function getRouterBasename(): string {
  if (import.meta.env.MODE === 'native') {
    return '';
  }

  if (typeof window !== 'undefined' && window.location.hostname.endsWith('github.io')) {
    return `/${GITHUB_PAGES_REPO}`;
  }

  return '';
}
