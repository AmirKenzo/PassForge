import { Shield } from 'lucide-react';
import { cn } from '@/utils/cn';

interface PrivacyBannerProps {
  className?: string;
  compact?: boolean;
}

export function PrivacyBanner({ className, compact = false }: PrivacyBannerProps) {
  return (
    <div
      className={cn(
        'bg-primary/5 border-primary/20 flex items-center gap-3 rounded-lg border',
        compact ? 'px-3 py-2' : 'px-4 py-3',
        className,
      )}
      role="note"
      aria-label="Privacy notice"
    >
      <Shield className="text-primary h-4 w-4 shrink-0" aria-hidden="true" />
      <p className={cn('text-muted-foreground', compact ? 'text-xs' : 'text-sm')}>
        Everything is generated locally in your browser.{' '}
        <span className="text-foreground font-medium">No data ever leaves your device.</span>
      </p>
    </div>
  );
}
