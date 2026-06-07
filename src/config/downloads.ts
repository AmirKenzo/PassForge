const GITHUB_REPO = 'amirkenzo/PassForge';
const RELEASES_DOWNLOAD = `https://github.com/${GITHUB_REPO}/releases/latest/download`;

/** Stable asset names — must match .github/workflows/build-native.yml */
export const DOWNLOADS = {
  windows: `${RELEASES_DOWNLOAD}/PassForge-Windows-x64-setup.exe`,
  android: `${RELEASES_DOWNLOAD}/PassForge-Android.apk`,
  releasesPage: `https://github.com/${GITHUB_REPO}/releases/latest`,
} as const;
