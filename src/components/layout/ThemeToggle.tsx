import type { ReactNode } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from '@/hooks/use-theme';
import type { ThemeMode } from '@/store/settings-store';

const THEME_ICONS: Record<ThemeMode, ReactNode> = {
  light: <Sun className="h-4 w-4" />,
  dark: <Moon className="h-4 w-4" />,
  system: <Monitor className="h-4 w-4" />,
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Select value={theme} onValueChange={(v) => setTheme(v as ThemeMode)}>
      <SelectTrigger className="w-[130px]" aria-label="Theme">
        {THEME_ICONS[theme]}
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();

  const cycle = () => {
    const modes: ThemeMode[] = ['light', 'dark', 'system'];
    const next = modes[(modes.indexOf(theme) + 1) % modes.length]!;
    setTheme(next);
  };

  return (
    <Button variant="ghost" size="icon" onClick={cycle} aria-label="Toggle theme">
      {THEME_ICONS[theme]}
    </Button>
  );
}
