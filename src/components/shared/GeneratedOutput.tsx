import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/components/shared/CopyButton';
import { cn } from '@/utils/cn';

interface GeneratedOutputProps {
  value: string;
  onRegenerate?: () => void;
  className?: string;
  mono?: boolean;
}

export function GeneratedOutput({
  value,
  onRegenerate,
  className,
  mono = true,
}: GeneratedOutputProps) {
  return (
    <div className={cn('bg-muted/50 flex items-center gap-2 rounded-lg border p-3', className)}>
      <output
        className={cn('flex-1 break-all', mono && 'font-mono text-sm')}
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </output>
      <div className="flex shrink-0 gap-1">
        <CopyButton text={value} />
        {onRegenerate && (
          <Button variant="outline" size="icon" onClick={onRegenerate} aria-label="Regenerate">
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

interface GeneratedListProps {
  items: string[];
  onRegenerate?: () => void;
  className?: string;
}

export function GeneratedList({ items, onRegenerate, className }: GeneratedListProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item, i) => (
        <GeneratedOutput key={`${item}-${i}`} value={item} onRegenerate={onRegenerate} />
      ))}
    </div>
  );
}
