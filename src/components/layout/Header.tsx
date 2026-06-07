import { Link } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggleButton } from '@/components/layout/ThemeToggle';
import { LandingMobileMenu } from '@/components/layout/LandingMobileMenu';
import { useUiStore } from '@/store/ui-store';
import { useSettingsStore } from '@/store/settings-store';
import { cn } from '@/utils/cn';

export function Header() {
  const { mobileMenuOpen, setMobileMenuOpen } = useUiStore();
  const sidebarCollapsed = useSettingsStore((s) => s.sidebarCollapsed);

  return (
    <header
      className={cn(
        'bg-background/80 border-border safe-top sticky top-0 z-30 flex h-14 items-center gap-3 border-b px-4 backdrop-blur-sm',
        sidebarCollapsed ? 'md:ml-16' : 'md:ml-64',
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-11 w-11 shrink-0 md:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <Link to="/app" className="flex min-w-0 items-center gap-2">
        <Shield className="text-primary h-5 w-5 shrink-0" />
        <span className="truncate font-semibold">PassForge</span>
      </Link>

      <div className="ml-auto flex shrink-0 items-center gap-2">
        <ThemeToggleButton />
        <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
          <Link to="/">
            <Shield className="mr-1 h-4 w-4" />
            Home
          </Link>
        </Button>
      </div>
    </header>
  );
}

export function LandingHeader() {
  const { mobileMenuOpen, setMobileMenuOpen } = useUiStore();

  return (
    <>
      <header className="bg-background/80 border-border safe-top sticky top-0 z-50 border-b backdrop-blur-sm">
        <div className="mx-auto flex h-14 items-center justify-between gap-3 px-4 md:h-16 md:max-w-6xl">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <Shield className="text-primary h-7 w-7 shrink-0" />
            <span className="truncate text-lg font-bold md:text-xl">PassForge</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            <a
              href="#features"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Features
            </a>
            <a
              href="#privacy"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Privacy
            </a>
            <a
              href="#faq"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              FAQ
            </a>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggleButton />
            <Button asChild className="hidden sm:flex">
              <Link to="/app">Open App</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>
      <LandingMobileMenu />
    </>
  );
}
