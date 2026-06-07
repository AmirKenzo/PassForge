import { useCallback, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { ToolPageLayout } from '@/components/shared/ToolPageLayout';
import { GeneratedList } from '@/components/shared/GeneratedOutput';
import { DEFAULT_PASSPHRASE_CONFIG, generatePassphrases } from '@/services/passphrase-generator';
import type { PassphraseConfig } from '@/types/generators';

export function PassphraseGeneratorPage() {
  const [config, setConfig] = useState<PassphraseConfig>(DEFAULT_PASSPHRASE_CONFIG);
  const [passphrases, setPassphrases] = useState<string[]>([]);

  const generate = useCallback(() => {
    setPassphrases(generatePassphrases(config));
  }, [config]);

  return (
    <ToolPageLayout
      title="Passphrase Generator"
      description="Generate memorable Diceware-style passphrases for high entropy and easy recall."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Word count: {config.wordCount}</Label>
              <Slider
                value={[config.wordCount]}
                onValueChange={([v]) => setConfig((c) => ({ ...c, wordCount: v! }))}
                min={3}
                max={12}
                step={1}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="separator">Separator</Label>
              <Input
                id="separator"
                value={config.separator}
                onChange={(e) => setConfig((c) => ({ ...c, separator: e.target.value }))}
                maxLength={3}
              />
            </div>

            <div className="space-y-3">
              <Label>Options to generate: {config.count}</Label>
              <Slider
                value={[config.count]}
                onValueChange={([v]) => setConfig((c) => ({ ...c, count: v! }))}
                min={1}
                max={10}
                step={1}
              />
            </div>

            <div className="space-y-3">
              {(
                [
                  ['capitalize', 'Capitalize first letter of each word'],
                  ['includeNumbers', 'Include random numbers'],
                  ['includeSymbols', 'Include random symbol'],
                ] as const
              ).map(([key, label]) => (
                <div key={key} className="flex items-center gap-2">
                  <Switch
                    checked={config[key]}
                    onCheckedChange={(v) => setConfig((c) => ({ ...c, [key]: v }))}
                    id={key}
                  />
                  <Label htmlFor={key}>{label}</Label>
                </div>
              ))}
            </div>

            <Button onClick={generate} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate Passphrases
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Generated Passphrases</CardTitle>
          </CardHeader>
          <CardContent>
            {passphrases.length === 0 ? (
              <p className="text-muted-foreground text-sm">Click Generate to create passphrases.</p>
            ) : (
              <GeneratedList items={passphrases} onRegenerate={generate} />
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPageLayout>
  );
}
