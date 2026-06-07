import { useEffect, useState } from 'react';
import {
  fetchLatestReleaseDownloads,
  RELEASES_PAGE,
  type LatestReleaseDownloads,
} from '@/services/github-releases';

const EMPTY: LatestReleaseDownloads = {
  tag: '',
  releasesPage: RELEASES_PAGE,
  windows: null,
  android: null,
};

export function useLatestRelease() {
  const [release, setRelease] = useState<LatestReleaseDownloads>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchLatestReleaseDownloads()
      .then((data) => {
        if (!cancelled) {
          setRelease(data);
          setError(false);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { release, loading, error };
}
