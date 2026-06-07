import { Link } from 'react-router-dom';
import { useUiStore } from '@/store/ui-store';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#privacy', label: 'Privacy' },
  { href: '#faq', label: 'FAQ' },
];

export function LandingMobileMenu() {
  const { mobileMenuOpen, setMobileMenuOpen } = useUiStore();

  if (!mobileMenuOpen) return null;

  return (
    <>
      <div
        className="bg-background/80 fixed inset-0 z-40 backdrop-blur-sm md:hidden"
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />
      <nav
        className="bg-card border-border safe-bottom fixed inset-x-0 top-14 z-50 border-b p-4 md:hidden"
        aria-label="Mobile navigation"
      >
        <div className="space-y-1">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                'flex min-h-11 items-center rounded-lg px-4 text-base font-medium',
                'text-muted-foreground hover:bg-accent hover:text-foreground',
              )}
            >
              {link.label}
            </a>
          ))}
          <Button className="mt-3 w-full" asChild>
            <Link to="/app" onClick={() => setMobileMenuOpen(false)}>
              Open App
            </Link>
          </Button>
        </div>
      </nav>
    </>
  );
}
