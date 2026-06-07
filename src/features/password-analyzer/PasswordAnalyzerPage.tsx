import { useMemo, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ToolPageLayout } from '@/components/shared/ToolPageLayout';
import { StrengthMeter } from '@/components/shared/StrengthMeter';
import { analyzePassword } from '@/services/password-analyzer';
import { cn } from '@/utils/cn';

export function PasswordAnalyzerPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const analysis = useMemo(() => analyzePassword(password), [password]);

  const checks = [
    { label: 'Uppercase', met: analysis.hasUppercase },
    { label: 'Lowercase', met: analysis.hasLowercase },
    { label: 'Numbers', met: analysis.hasNumbers },
    { label: 'Symbols', met: analysis.hasSymbols },
    { label: '12+ characters', met: analysis.length >= 12 },
    { label: '16+ characters', met: analysis.length >= 16 },
  ];

  const totalChars = Object.values(analysis.characterDistribution).reduce((a, b) => a + b, 0);

  return (
    <ToolPageLayout
      title="Password Analyzer"
      description="Analyze password strength, entropy, and estimated crack time in real time."
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Enter Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type or paste a password to analyze..."
              className="pr-10 font-mono"
              aria-label="Password to analyze"
              autoComplete="off"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>

          {password && <StrengthMeter analysis={analysis} />}
        </CardContent>
      </Card>

      {password && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Complexity Checks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {checks.map((check) => (
                  <div key={check.label} className="flex items-center gap-2">
                    <div
                      className={cn(
                        'h-2 w-2 rounded-full',
                        check.met ? 'bg-success' : 'bg-muted-foreground/30',
                      )}
                    />
                    <span className="text-sm">{check.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Character Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(analysis.characterDistribution).map(([type, count]) => (
                <div key={type} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{type}</span>
                    <span className="text-muted-foreground">
                      {count} ({totalChars ? Math.round((count / totalChars) * 100) : 0}%)
                    </span>
                  </div>
                  <div className="bg-muted h-2 rounded-full">
                    <div
                      className="bg-primary h-full rounded-full transition-all"
                      style={{ width: `${totalChars ? (count / totalChars) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Badge variant="outline" className="mt-0.5 shrink-0">
                      {i + 1}
                    </Badge>
                    {rec}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </ToolPageLayout>
  );
}
