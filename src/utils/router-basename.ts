/**
 * React Router basename must not be "./" — that breaks routing in Tauri/Capacitor.
 * GitHub Pages uses "/PassForge/" which must become "/PassForge" (no trailing slash).
 */
export function getRouterBasename(): string {
  let base = import.meta.env.BASE_URL;

  if (!base || base === '/' || base === './' || base === '.') {
    return '';
  }

  if (base.endsWith('/')) {
    base = base.slice(0, -1);
  }

  return base;
}
