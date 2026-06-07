const GITHUB_REPO = 'amirkenzo/PassForge';

export interface ReleaseAsset {
  name: string;
  browser_download_url: string;
}

export interface LatestReleaseDownloads {
  tag: string;
  releasesPage: string;
  windows: ReleaseAsset | null;
  android: ReleaseAsset | null;
}

interface GitHubReleaseResponse {
  tag_name: string;
  html_url: string;
  assets: ReleaseAsset[];
}

export function parseLatestRelease(data: GitHubReleaseResponse): LatestReleaseDownloads {
  const assets = data.assets ?? [];

  const windows =
    assets.find((a) => a.name.includes('-setup.exe')) ??
    assets.find((a) => a.name.endsWith('.exe')) ??
    null;

  const android = assets.find((a) => a.name.endsWith('.apk')) ?? null;

  return {
    tag: data.tag_name,
    releasesPage: data.html_url,
    windows,
    android,
  };
}

export async function fetchLatestReleaseDownloads(): Promise<LatestReleaseDownloads> {
  const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`, {
    headers: { Accept: 'application/vnd.github+json' },
  });

  if (!response.ok) {
    throw new Error(`GitHub release lookup failed (${response.status})`);
  }

  const data = (await response.json()) as GitHubReleaseResponse;
  return parseLatestRelease(data);
}

export const RELEASES_PAGE = `https://github.com/${GITHUB_REPO}/releases/latest`;
