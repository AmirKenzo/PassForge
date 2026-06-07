import { useCallback, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToolPageLayout } from '@/components/shared/ToolPageLayout';
import { GeneratedList } from '@/components/shared/GeneratedOutput';
import { DEFAULT_UUID_CONFIG, generateUuids } from '@/services/uuid-generator';
import type { UuidConfig } from '@/types/generators';

export function UuidGeneratorPage() {
  const [config, setConfig] = useState<UuidConfig>(DEFAULT_UUID_CONFIG);
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = useCallback(
    (version?: UuidConfig['version']) => {
      const cfg = version ? { ...config, version } : config;
      if (version) setConfig(cfg);
      setUuids(generateUuids(cfg));
    },
    [config],
  );

  return (
    <ToolPageLayout
      title="UUID Generator"
      description="Generate UUID v4 (random) and v7 (time-ordered) identifiers."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs
              value={config.version}
              onValueChange={(v) =>
                setConfig((c) => ({ ...c, version: v as UuidConfig['version'] }))
              }
            >
              <TabsList className="w-full">
                <TabsTrigger value="v4" className="flex-1">
                  UUID v4
                </TabsTrigger>
                <TabsTrigger value="v7" className="flex-1">
                  UUID v7
                </TabsTrigger>
              </TabsList>
              <TabsContent value="v4" className="text-muted-foreground mt-3 text-sm">
                Random UUID — universally unique, no ordering guarantees.
              </TabsContent>
              <TabsContent value="v7" className="text-muted-foreground mt-3 text-sm">
                Time-ordered UUID — sortable by creation time, RFC 9562.
              </TabsContent>
            </Tabs>

            <div className="space-y-3">
              <Label>Count: {config.count}</Label>
              <Slider
                value={[config.count]}
                onValueChange={([v]) => setConfig((c) => ({ ...c, count: v! }))}
                min={1}
                max={100}
                step={1}
              />
            </div>

            <Button onClick={() => generate()} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate UUIDs
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Generated UUIDs</CardTitle>
          </CardHeader>
          <CardContent>
            {uuids.length === 0 ? (
              <p className="text-muted-foreground text-sm">Click Generate to create UUIDs.</p>
            ) : (
              <GeneratedList items={uuids} onRegenerate={() => generate()} />
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPageLayout>
  );
}
