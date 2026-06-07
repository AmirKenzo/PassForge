import { useCallback, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { ToolPageLayout } from '@/components/shared/ToolPageLayout';
import { GeneratedList } from '@/components/shared/GeneratedOutput';
import { ExportButton } from '@/components/shared/ExportMenu';
import {
  DEFAULT_RANDOM_STRING_CONFIG,
  generateRandomStrings,
} from '@/services/random-string-generator';
import type { RandomStringConfig } from '@/types/generators';

const PRESETS = [
  { label: 'Alphanumeric', charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' },
  { label: 'Hex', charset: '0123456789abcdef' },
  { label: 'Uppercase', charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
  { label: 'Lowercase', charset: 'abcdefghijklmnopqrstuvwxyz' },
  { label: 'Numbers', charset: '0123456789' },
  { label: 'Symbols', charset: '!@#$%^&*()_+-=[]{}|;:,.<>?' },
];

export function RandomStringGeneratorPage() {
  const [config, setConfig] = useState<RandomStringConfig>(DEFAULT_RANDOM_STRING_CONFIG);
  const [strings, setStrings] = useState<string[]>([]);

  const generate = useCallback(() => {
    try {
      setStrings(generateRandomStrings(config));
    } catch {
      setStrings([]);
    }
  }, [config]);

  return (
    <ToolPageLayout
      title="Random String Generator"
      description="Generate random strings with fully customizable character sets."
      actions={<ExportButton items={strings.map((s) => ({ value: s }))} baseName="random-strings" />}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="charset">Character Set</Label>
              <Input
                id="charset"
                value={config.charset}
                onChange={(e) => setConfig((c) => ({ ...c, charset: e.target.value }))}
                className="font-mono text-sm"
              />
              <div className="flex flex-wrap gap-1">
                {PRESETS.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="outline"
                    size="sm"
                    onClick={() => setConfig((c) => ({ ...c, charset: preset.charset }))}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>Length: {config.length}</Label>
              <Slider
                value={[config.length]}
                onValueChange={([v]) => setConfig((c) => ({ ...c, length: v! }))}
                min={1}
                max={512}
                step={1}
              />
            </div>

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

            <Button onClick={generate} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate Strings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Generated Strings</CardTitle>
          </CardHeader>
          <CardContent>
            {strings.length === 0 ? (
              <p className="text-muted-foreground text-sm">Click Generate to create strings.</p>
            ) : (
              <GeneratedList items={strings} onRegenerate={generate} />
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPageLayout>
  );
}
