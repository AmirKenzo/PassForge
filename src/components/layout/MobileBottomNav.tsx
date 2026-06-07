import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, KeyRound, ShieldCheck, Menu } from 'lucide-react';
import { useUiStore } from '@/store/ui-store';
import { cn } from '@/utils/cn';

const ITEMS = [
  { to: '/app', end: true, icon: LayoutDashboard, label: 'Home' },
  { to: '/app/password-generator', end: false, icon: KeyRound, label: 'Password' },
  { to: '/app/password-analyzer', end: false, icon: ShieldCheck, label: 'Analyze' },
] as const;

export function MobileBottomNav() {
  const location = useLocation();
  const setMobileMenuOpen = useUiStore((s) => s.setMobileMenuOpen);
  const mobileMenuOpen = useUiStore((s) => s.mobileMenuOpen);

  return (
    <nav
      className="bg-card/95 border-border safe-bottom fixed inset-x-0 bottom-0 z-50 flex items-stretch justify-around border-t backdrop-blur-sm md:hidden"
      aria-label="Bottom navigation"
    >
      {ITEMS.map((item) => {
        const isActive = item.end
          ? location.pathname === item.to
          : location.pathname.startsWith(item.to);
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={cn(
              'flex min-h-[3.5rem] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 py-2 text-[10px] font-medium transition-colors',
              isActive ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="truncate">{item.label}</span>
          </NavLink>
        );
      })}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={cn(
          'flex min-h-[3.5rem] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 py-2 text-[10px] font-medium transition-colors',
          mobileMenuOpen ? 'text-primary' : 'text-muted-foreground',
        )}
        aria-label="Open tools menu"
      >
        <Menu className="h-5 w-5" />
        <span>More</span>
      </button>
    </nav>
  );
}
