import { useCallback, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { ToolPageLayout } from '@/components/shared/ToolPageLayout';
import { GeneratedList } from '@/components/shared/GeneratedOutput';
import { DEFAULT_API_KEY_CONFIG, generateApiKeys } from '@/services/api-key-generator';
import type { ApiKeyConfig } from '@/types/generators';

export function ApiKeyGeneratorPage() {
  const [config, setConfig] = useState<ApiKeyConfig>(DEFAULT_API_KEY_CONFIG);
  const [keys, setKeys] = useState<string[]>([]);

  const generate = useCallback(() => {
    setKeys(generateApiKeys(config));
  }, [config]);

  return (
    <ToolPageLayout
      title="API Key Generator"
      description="Generate secure API keys with customizable length and prefix."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="prefix">Prefix</Label>
              <Input
                id="prefix"
                value={config.prefix}
                onChange={(e) => setConfig((c) => ({ ...c, prefix: e.target.value }))}
                placeholder="e.g. pk_live_"
              />
            </div>

            <div className="space-y-3">
              <Label>Key length: {config.length}</Label>
              <Slider
                value={[config.length]}
                onValueChange={([v]) => setConfig((c) => ({ ...c, length: v! }))}
                min={8}
                max={128}
                step={1}
              />
            </div>

            <div className="space-y-3">
              <Label>Count: {config.count}</Label>
              <Slider
                value={[config.count]}
                onValueChange={([v]) => setConfig((c) => ({ ...c, count: v! }))}
                min={1}
                max={50}
                step={1}
              />
            </div>

            <Button onClick={generate} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate API Keys
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Generated Keys</CardTitle>
          </CardHeader>
          <CardContent>
            {keys.length === 0 ? (
              <p className="text-muted-foreground text-sm">Click Generate to create API keys.</p>
            ) : (
              <GeneratedList items={keys} onRegenerate={generate} />
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPageLayout>
  );
}
