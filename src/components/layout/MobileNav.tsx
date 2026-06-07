import { NavLink } from 'react-router-dom';
import { useUiStore } from '@/store/ui-store';
import { TOOLS } from '@/config/tools';
import { cn } from '@/utils/cn';

export function MobileNav() {
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
        className="bg-card border-border fixed inset-x-0 top-14 z-50 max-h-[calc(100vh-3.5rem)] overflow-y-auto border-b p-4 md:hidden safe-bottom"
        aria-label="Mobile navigation"
      >
        <div className="space-y-1">
          <NavLink
            to="/app"
            end
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex min-h-11 items-center rounded-lg px-4 text-base font-medium',
                isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent',
              )
            }
          >
            Dashboard
          </NavLink>
          {TOOLS.map((tool) => (
            <NavLink
              key={tool.id}
              to={tool.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex min-h-11 items-center rounded-lg px-4 text-base font-medium',
                  isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent',
                )
              }
            >
              {tool.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
