import { useCallback, useState } from 'react';
import { RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToolPageLayout } from '@/components/shared/ToolPageLayout';
import { GeneratedOutput } from '@/components/shared/GeneratedOutput';
import { CopyButton } from '@/components/shared/CopyButton';
import {
  generatePin,
  generateOtp,
  generateRandomBytes,
  base64Encode,
  base64Decode,
  runSecurityChecks,
} from '@/services/security-utilities';
import { cn } from '@/utils/cn';

export function SecurityUtilitiesPage() {
  const [pin, setPin] = useState('');
  const [otp, setOtp] = useState('');
  const [randomBytes, setRandomBytes] = useState('');
  const [b64Input, setB64Input] = useState('');
  const [b64Output, setB64Output] = useState('');
  const [b64Mode, setB64Mode] = useState<'encode' | 'decode'>('encode');
  const [byteCount, setByteCount] = useState(32);
  const securityChecks = runSecurityChecks();

  const regenPin = useCallback(() => setPin(generatePin()), []);
  const regenOtp = useCallback(() => setOtp(generateOtp()), []);
  const regenBytes = useCallback(() => setRandomBytes(generateRandomBytes(byteCount)), [byteCount]);

  const handleB64 = () => {
    try {
      setB64Output(b64Mode === 'encode' ? base64Encode(b64Input) : base64Decode(b64Input));
    } catch (e) {
      setB64Output(e instanceof Error ? e.message : 'Error');
    }
  };

  return (
    <ToolPageLayout
      title="Security Utilities"
      description="PIN, OTP, random bytes, Base64 encoding, and environment security checks."
    >
      <Tabs defaultValue="generators">
        <TabsList>
          <TabsTrigger value="generators">Generators</TabsTrigger>
          <TabsTrigger value="base64">Base64</TabsTrigger>
          <TabsTrigger value="checks">Environment</TabsTrigger>
        </TabsList>

        <TabsContent value="generators" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">PIN Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pin ? (
                  <GeneratedOutput value={pin} onRegenerate={regenPin} />
                ) : (
                  <Button onClick={regenPin} className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate PIN
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">OTP Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {otp ? (
                  <GeneratedOutput value={otp} onRegenerate={regenOtp} />
                ) : (
                  <Button onClick={regenOtp} className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate OTP
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Random Bytes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label>Byte count</Label>
                  <Input
                    type="number"
                    min={1}
                    max={256}
                    value={byteCount}
                    onChange={(e) => setByteCount(parseInt(e.target.value) || 32)}
                  />
                </div>
                {randomBytes ? (
                  <GeneratedOutput value={randomBytes} onRegenerate={regenBytes} />
                ) : (
                  <Button onClick={regenBytes} className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate Bytes
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="base64" className="mt-6">
          <Card>
            <CardContent className="space-y-4 pt-6">
              <Tabs value={b64Mode} onValueChange={(v) => setB64Mode(v as 'encode' | 'decode')}>
                <TabsList>
                  <TabsTrigger value="encode">Encode</TabsTrigger>
                  <TabsTrigger value="decode">Decode</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="space-y-2">
                <Label>Input</Label>
                <Textarea
                  value={b64Input}
                  onChange={(e) => setB64Input(e.target.value)}
                  rows={4}
                  className="font-mono text-sm"
                />
              </div>
              <Button onClick={handleB64}>{b64Mode === 'encode' ? 'Encode' : 'Decode'}</Button>
              {b64Output && (
                <div className="bg-muted/50 flex items-start gap-2 rounded-lg border p-3">
                  <output className="flex-1 font-mono text-sm break-all">{b64Output}</output>
                  <CopyButton text={b64Output} />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="checks" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                Browser Security Environment
                {securityChecks.passed ? (
                  <CheckCircle2 className="text-success h-5 w-5" />
                ) : (
                  <XCircle className="text-destructive h-5 w-5" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {securityChecks.checks.map((check) => (
                  <div
                    key={check.name}
                    className={cn(
                      'flex items-start gap-3 rounded-lg border p-3',
                      check.passed ? 'border-success/30' : 'border-destructive/30',
                    )}
                  >
                    {check.passed ? (
                      <CheckCircle2 className="text-success mt-0.5 h-4 w-4 shrink-0" />
                    ) : (
                      <XCircle className="text-destructive mt-0.5 h-4 w-4 shrink-0" />
                    )}
                    <div>
                      <p className="text-sm font-medium">{check.name}</p>
                      <p className="text-muted-foreground text-xs">{check.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ToolPageLayout>
  );
}
