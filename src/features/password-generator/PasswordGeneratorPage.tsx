import { useCallback, useState } from 'react';
import { RefreshCw, Star, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ToolPageLayout } from '@/components/shared/ToolPageLayout';
import { GeneratedList } from '@/components/shared/GeneratedOutput';
import { ExportButton } from '@/components/shared/ExportMenu';
import { generatePasswords } from '@/services/password-generator';
import { useToolStore } from '@/store/tool-store';
import { useSettingsStore } from '@/store/settings-store';

export function PasswordGeneratorPage() {
  const { passwordConfig, setPasswordConfig, passwordHistory, addToPasswordHistory, clearPasswordHistory } =
    useToolStore();
  const { passwordFavorites, addPasswordFavorite, removePasswordFavorite } = useSettingsStore();
  const [passwords, setPasswords] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(() => {
    try {
      setError(null);
      const result = generatePasswords(passwordConfig);
      setPasswords(result);
      result.forEach(addToPasswordHistory);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Generation failed');
    }
  }, [passwordConfig, addToPasswordHistory]);

  const exportItems = passwords.map((p) => ({ value: p }));

  return (
    <ToolPageLayout
      title="Password Generator"
      description="Generate strong, customizable passwords with advanced character options."
      actions={<ExportButton items={exportItems} baseName="passwords" />}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Length: {passwordConfig.length}</Label>
              </div>
              <Slider
                value={[passwordConfig.length]}
                onValueChange={([v]) => setPasswordConfig({ length: v })}
                min={4}
                max={256}
                step={1}
                aria-label="Password length"
              />
            </div>

            <div className="space-y-3">
              <Label>Count: {passwordConfig.count}</Label>
              <Slider
                value={[passwordConfig.count]}
                onValueChange={([v]) => setPasswordConfig({ count: v })}
                min={1}
                max={50}
                step={1}
                aria-label="Number of passwords"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {(
                [
                  ['uppercase', 'Uppercase (A-Z)'],
                  ['lowercase', 'Lowercase (a-z)'],
                  ['numbers', 'Numbers (0-9)'],
                  ['symbols', 'Symbols (!@#...)'],
                  ['excludeSimilar', 'Exclude similar (i,l,1,L,o,0,O)'],
                  ['excludeAmbiguous', 'Exclude ambiguous ({ } [ ] etc.)'],
                  ['preventRepeated', 'Prevent repeated characters'],
                ] as const
              ).map(([key, label]) => (
                <div key={key} className="flex items-center gap-2">
                  <Checkbox
                    id={key}
                    checked={passwordConfig[key]}
                    onCheckedChange={(checked) =>
                      setPasswordConfig({ [key]: checked === true })
                    }
                  />
                  <Label htmlFor={key} className="text-sm font-normal">
                    {label}
                  </Label>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={passwordConfig.useCustomCharset}
                onCheckedChange={(v) => setPasswordConfig({ useCustomCharset: v })}
                id="custom-charset"
              />
              <Label htmlFor="custom-charset">Custom character set</Label>
            </div>
            {passwordConfig.useCustomCharset && (
              <Input
                value={passwordConfig.customCharset}
                onChange={(e) => setPasswordConfig({ customCharset: e.target.value })}
                placeholder="Enter custom characters..."
                aria-label="Custom character set"
              />
            )}

            {!passwordConfig.useCustomCharset && (
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    ['minUppercase', 'Min uppercase'],
                    ['minLowercase', 'Min lowercase'],
                    ['minNumbers', 'Min numbers'],
                    ['minSymbols', 'Min symbols'],
                  ] as const
                ).map(([key, label]) => (
                  <div key={key} className="space-y-1">
                    <Label className="text-xs">{label}</Label>
                    <Input
                      type="number"
                      min={0}
                      max={passwordConfig.length}
                      value={passwordConfig[key]}
                      onChange={(e) =>
                        setPasswordConfig({ [key]: parseInt(e.target.value) || 0 })
                      }
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={generate} className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate
              </Button>
              <Button
                variant="outline"
                onClick={() => addPasswordFavorite(passwordConfig)}
                aria-label="Save configuration"
              >
                <Star className="h-4 w-4" />
              </Button>
            </div>

            {error && <p className="text-destructive text-sm" role="alert">{error}</p>}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Generated Passwords</CardTitle>
            </CardHeader>
            <CardContent>
              {passwords.length === 0 ? (
                <p className="text-muted-foreground text-sm">Click Generate to create passwords.</p>
              ) : (
                <GeneratedList items={passwords} onRegenerate={generate} />
              )}
            </CardContent>
          </Card>

          {passwordFavorites.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Saved Configurations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {passwordFavorites.map((fav, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border p-2 text-sm">
                    <button
                      className="hover:text-primary text-left"
                      onClick={() => {
                        useToolStore.getState().loadPasswordConfig(fav);
                        try {
                          setError(null);
                          const result = generatePasswords({ ...fav, count: passwordConfig.count });
                          setPasswords(result);
                          result.forEach(addToPasswordHistory);
                        } catch (e) {
                          setError(e instanceof Error ? e.message : 'Generation failed');
                        }
                      }}
                    >
                      {fav.length} chars · {[
                        fav.uppercase && 'A-Z',
                        fav.lowercase && 'a-z',
                        fav.numbers && '0-9',
                        fav.symbols && 'symbols',
                      ].filter(Boolean).join(', ')}
                    </button>
                    <Button variant="ghost" size="icon" onClick={() => removePasswordFavorite(i)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {passwordHistory.length > 0 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Session History</CardTitle>
                <Button variant="ghost" size="sm" onClick={clearPasswordHistory}>
                  Clear
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2 text-xs">Session only — cleared on page close</p>
                <div className="max-h-none space-y-1 font-mono text-xs md:max-h-40 md:overflow-y-auto">
                  {passwordHistory.slice(0, 10).map((p, i) => (
                    <div key={i} className="truncate">{p}</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
