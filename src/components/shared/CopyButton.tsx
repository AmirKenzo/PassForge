import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCopy } from '@/hooks/use-copy';
import { cn } from '@/utils/cn';

interface CopyButtonProps {
  text: string;
  id?: string;
  className?: string;
  size?: 'default' | 'sm' | 'icon';
  label?: string;
}

export function CopyButton({ text, id, className, size = 'icon', label = 'Copy' }: CopyButtonProps) {
  const { copy, copied } = useCopy();

  return (
    <Button
      variant="outline"
      size={size}
      className={cn(className)}
      onClick={() => copy(text, id)}
      aria-label={copied ? 'Copied' : label}
    >
      {copied ? (
        <Check className="text-success h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      {size !== 'icon' && <span>{copied ? 'Copied!' : label}</span>}
    </Button>
  );
}
