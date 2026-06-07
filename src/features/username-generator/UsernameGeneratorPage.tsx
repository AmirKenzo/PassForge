import { useCallback, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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
import { DEFAULT_USERNAME_CONFIG, generateUsernames } from '@/services/username-generator';
import type { UsernameConfig } from '@/types/generators';

export function UsernameGeneratorPage() {
  const [config, setConfig] = useState<UsernameConfig>(DEFAULT_USERNAME_CONFIG);
  const [usernames, setUsernames] = useState<string[]>([]);

  const generate = useCallback(() => {
    setUsernames(generateUsernames(config));
  }, [config]);

  return (
    <ToolPageLayout
      title="Username Generator"
      description="Create unique usernames with adjective-noun combinations or random styles."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Style</Label>
              <Select
                value={config.style}
                onValueChange={(v) =>
                  setConfig((c) => ({ ...c, style: v as UsernameConfig['style'] }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="adjective-noun">Adjective + Noun</SelectItem>
                  <SelectItem value="random">Random</SelectItem>
                  <SelectItem value="tech">Tech Style</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={config.includeNumbers}
                onCheckedChange={(v) => setConfig((c) => ({ ...c, includeNumbers: v }))}
                id="numbers"
              />
              <Label htmlFor="numbers">Append random numbers</Label>
            </div>

            <div className="space-y-3">
              <Label>Suggestions: {config.count}</Label>
              <Slider
                value={[config.count]}
                onValueChange={([v]) => setConfig((c) => ({ ...c, count: v! }))}
                min={1}
                max={20}
                step={1}
              />
            </div>

            <Button onClick={generate} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Generate Usernames
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            {usernames.length === 0 ? (
              <p className="text-muted-foreground text-sm">Click Generate to create usernames.</p>
            ) : (
              <GeneratedList items={usernames} onRegenerate={generate} />
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPageLayout>
  );
}
