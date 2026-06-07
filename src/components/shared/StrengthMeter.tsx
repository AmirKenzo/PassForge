import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  STRENGTH_COLORS,
  STRENGTH_LABELS,
} from '@/services/password-analyzer';
import type { PasswordAnalysis } from '@/types/generators';
import { cn } from '@/utils/cn';

interface StrengthMeterProps {
  analysis: PasswordAnalysis;
}

export function StrengthMeter({ analysis }: StrengthMeterProps) {
  return (
    <div className="space-y-3" role="meter" aria-valuenow={analysis.score} aria-valuemin={0} aria-valuemax={100} aria-label="Password strength">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Strength</span>
        <Badge
          variant="outline"
          className={cn('border-0 text-white', STRENGTH_COLORS[analysis.strength])}
        >
          {STRENGTH_LABELS[analysis.strength]}
        </Badge>
      </div>
      <div className="relative">
        <Progress value={analysis.score} className="h-2" />
        <div
          className={cn(
            'absolute inset-y-0 left-0 rounded-full transition-all',
            STRENGTH_COLORS[analysis.strength],
          )}
          style={{ width: `${analysis.score}%`, opacity: 0.8 }}
        />
      </div>
      <div className="text-muted-foreground grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
        <div>Entropy: <span className="text-foreground font-medium">{analysis.entropy} bits</span></div>
        <div>Length: <span className="text-foreground font-medium">{analysis.length}</span></div>
        <div>Crack time: <span className="text-foreground font-medium">{analysis.crackTimeLabel}</span></div>
        <div>Score: <span className="text-foreground font-medium">{analysis.score}/100</span></div>
      </div>
    </div>
  );
}
