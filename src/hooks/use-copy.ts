import { useCallback, useState } from 'react';
import { copyToClipboard } from '@/utils/clipboard';
import { useUiStore } from '@/store/ui-store';

export function useCopy() {
  const [copied, setCopied] = useState(false);
  const setCopiedId = useUiStore((s) => s.setCopiedId);

  const copy = useCallback(async (text: string, id?: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      if (id) setCopiedId(id);
      setTimeout(() => {
        setCopied(false);
        setCopiedId(null);
      }, 2000);
    }
    return success;
  }, [setCopiedId]);

  return { copy, copied };
}
