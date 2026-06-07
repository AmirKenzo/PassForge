import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ToolPageLayout } from '@/components/shared/ToolPageLayout';
import { CopyButton } from '@/components/shared/CopyButton';
import { generateHash, ALGORITHM_INFO, SUPPORTED_ALGORITHMS } from '@/services/hash-generator';
import type { HashAlgorithm } from '@/types/generators';

export function HashGeneratorPage() {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256');
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const compute = async () => {
      setLoading(true);
      const result = await generateHash(input, algorithm);
      if (!cancelled) {
        setHash(result);
        setLoading(false);
      }
    };
    compute();
    return () => {
      cancelled = true;
    };
  }, [input, algorithm]);

  const info = ALGORITHM_INFO[algorithm];

  return (
    <ToolPageLayout
      title="Hash Generator"
      description="Hash text locally using Web Crypto API — MD5, SHA-1, SHA-256, and SHA-512."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Algorithm</Label>
              <Select value={algorithm} onValueChange={(v) => setAlgorithm(v as HashAlgorithm)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_ALGORITHMS.map((algo) => (
                    <SelectItem key={algo} value={algo}>
                      {algo} ({ALGORITHM_INFO[algo].bits}-bit)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground text-xs">{info.description}</p>
                <Badge variant={info.secure ? 'success' : 'warning'}>
                  {info.secure ? 'Secure' : 'Insecure'}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hash-input">Text to hash</Label>
              <Textarea
                id="hash-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter text to hash..."
                rows={6}
                className="font-mono text-sm"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Hash Output</CardTitle>
          </CardHeader>
          <CardContent>
            {!input ? (
              <p className="text-muted-foreground text-sm">Enter text above to generate a hash.</p>
            ) : (
              <div className="space-y-3">
                <div className="bg-muted/50 flex items-start gap-2 rounded-lg border p-3">
                  <output className="flex-1 font-mono text-sm break-all">
                    {loading ? 'Computing...' : hash}
                  </output>
                  {hash && <CopyButton text={hash} />}
                </div>
                <p className="text-muted-foreground text-xs">
                  {algorithm} · {info.bits} bits · Computed locally
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ToolPageLayout>
  );
}
