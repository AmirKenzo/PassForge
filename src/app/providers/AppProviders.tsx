import { useEffect, type ReactNode } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useTheme } from '@/hooks/use-theme';
import { initializePlatform } from '@/services/platform';

interface AppProvidersProps {
  children: ReactNode;
}

function ThemeInitializer({ children }: { children: ReactNode }) {
  useTheme();

  useEffect(() => {
    initializePlatform();
  }, []);

  return <>{children}</>;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <ThemeInitializer>{children}</ThemeInitializer>
    </TooltipProvider>
  );
}
