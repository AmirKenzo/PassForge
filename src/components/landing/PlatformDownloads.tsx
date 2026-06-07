import { Link } from 'react-router-dom';
import { Monitor, Globe, Smartphone, Download, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLatestRelease } from '@/hooks/use-latest-release';
import { RELEASES_PAGE } from '@/services/github-releases';
import { cn } from '@/utils/cn';

export function PlatformDownloads() {
  const { release, loading, error } = useLatestRelease();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
        {release.tag ? (
          <Badge variant="secondary">Latest release: {release.tag}</Badge>
        ) : loading ? (
          <Badge variant="outline">Loading releases…</Badge>
        ) : (
          <Badge variant="outline">No release found</Badge>
        )}
        <a
          href={release.releasesPage || RELEASES_PAGE}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary inline-flex items-center gap-1 text-sm"
        >
          All releases
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:mx-auto md:max-w-3xl">
        <Card
          className={cn('h-full', release.windows && 'hover:border-primary/40 hover:shadow-md')}
        >
          <CardContent className="flex h-full flex-col items-center px-4 pt-6 pb-6 text-center">
            <Monitor className="text-primary mb-3 h-8 w-8" />
            <p className="font-semibold">Windows</p>
            <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
              {release.windows?.name ?? 'Desktop installer (.exe)'}
            </p>
            <Button
              className="mt-4 w-full"
              size="sm"
              variant="outline"
              disabled={loading || !release.windows}
              asChild={Boolean(release.windows)}
            >
              {release.windows ? (
                <a
                  href={release.windows.browser_download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download .exe
                </a>
              ) : (
                <a href={RELEASES_PAGE} target="_blank" rel="noopener noreferrer">
                  View releases
                </a>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/40 h-full hover:shadow-md">
          <CardContent className="flex h-full flex-col items-center px-4 pt-6 pb-6 text-center">
            <Globe className="text-primary mb-3 h-8 w-8" />
            <p className="font-semibold">Web</p>
            <p className="text-muted-foreground mt-1 text-xs">Use PassForge in your browser</p>
            <Button className="mt-4 w-full" size="sm" asChild>
              <Link to="/app">Open app</Link>
            </Button>
          </CardContent>
        </Card>

        <Card
          className={cn('h-full', release.android && 'hover:border-primary/40 hover:shadow-md')}
        >
          <CardContent className="flex h-full flex-col items-center px-4 pt-6 pb-6 text-center">
            <Smartphone className="text-primary mb-3 h-8 w-8" />
            <p className="font-semibold">Android</p>
            <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
              {release.android?.name ?? 'Android APK'}
            </p>
            <Button
              className="mt-4 w-full"
              size="sm"
              variant="outline"
              disabled={loading || !release.android}
              asChild={Boolean(release.android)}
            >
              {release.android ? (
                <a
                  href={release.android.browser_download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download APK
                </a>
              ) : (
                <a href={RELEASES_PAGE} target="_blank" rel="noopener noreferrer">
                  View releases
                </a>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {error && (
        <p className="text-muted-foreground mt-4 text-center text-sm">
          Could not load release files automatically.{' '}
          <a
            href={RELEASES_PAGE}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download from GitHub Releases
          </a>
          .
        </p>
      )}
    </div>
  );
}
