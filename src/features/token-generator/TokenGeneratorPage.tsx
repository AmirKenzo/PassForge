import { useCallback, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToolPageLayout } from '@/components/shared/ToolPageLayout';
import { GeneratedList } from '@/components/shared/GeneratedOutput';
import { ExportButton } from '@/components/shared/ExportMenu';
import { DEFAULT_TOKEN_CONFIG, generateTokens } from '@/services/token-generator';
import type { TokenConfig } from '@/types/generators';

export function TokenGeneratorPage() {
  const [config, setConfig] = useState<TokenConfig>(DEFAULT_TOKEN_CONFIG);
  const [tokens, setTokens] = useState<string[]>([]);

  const generate = useCallback(() => {
    setTokens(generateTokens(config));
  }, [config]);

  return (
    <ToolPageLayout
      title="Token Generator"
      description="Generate secure random tokens in hex, base64, or alphanumeric formats."
      actions={<ExportButton items={tokens.map((t) => ({ value: t, metadata: { format: config.format } }))} baseName="tokens" />}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Format</Label>
              <Select
                value={config.format}
                onValueChange={(v) =>
                  setConfig((c) => ({ ...c, format: v as TokenConfig['format'] }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hex">Hexadecimal</SelectItem>
                  <SelectItem value="base64">Base64 (URL-safe)</SelectItem>
                  <SelectItem value="alphanumeric">Alphanumeric</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Length: {config.length}</Label>
              <Slider
                value={[config.length]}
                onValueChange={([v]) => setConfig((c) => ({ ...c, length: v! }))}
                min={8}
                max={256}
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
              Generate Tokens
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Generated Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            {tokens.length === 0 ? (
              <p className="text-muted-foreground text-sm">Click Generate to create tokens.</p>
            ) : (
              <GeneratedList items={tokens} onRegenerate={generate} />
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPageLayout>
  );
}
