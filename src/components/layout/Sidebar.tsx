import type { ComponentType } from 'react';
import { NavLink } from 'react-router-dom';
import {
  KeyRound,
  ShieldCheck,
  BookOpen,
  User,
  Fingerprint,
  Code,
  Ticket,
  Shuffle,
  Hash,
  Wrench,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { TOOLS } from '@/config/tools';
import { useSettingsStore } from '@/store/settings-store';
import { cn } from '@/utils/cn';

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  KeyRound,
  ShieldCheck,
  BookOpen,
  User,
  Fingerprint,
  Code,
  Ticket,
  Shuffle,
  Hash,
  Wrench,
};

export function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed } = useSettingsStore();

  return (
    <aside
      className={cn(
        'bg-card border-border fixed inset-y-0 left-0 z-40 hidden flex-col border-r transition-all duration-300 safe-top md:flex',
        sidebarCollapsed ? 'w-16' : 'w-64',
      )}
      aria-label="Sidebar navigation"
    >
      <div className="flex h-14 items-center gap-2 px-4">
        <Shield className="text-primary h-6 w-6 shrink-0" />
        {!sidebarCollapsed && (
          <span className="text-lg font-bold tracking-tight">PassForge</span>
        )}
      </div>

      <Separator />

      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="space-y-1">
          <NavLink
            to="/app"
            end
            className={({ isActive }) =>
              cn(
                'flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground',
              )
            }
          >
            <LayoutDashboard className="h-4 w-4 shrink-0" />
            {!sidebarCollapsed && <span>Dashboard</span>}
          </NavLink>

          {!sidebarCollapsed && (
            <p className="text-muted-foreground px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider">
              Tools
            </p>
          )}

          {TOOLS.map((tool) => {
            const Icon = ICON_MAP[tool.icon] ?? KeyRound;
            return (
              <NavLink
                key={tool.id}
                to={tool.path}
                className={({ isActive }) =>
                  cn(
                    'flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  )
                }
                title={sidebarCollapsed ? tool.name : undefined}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!sidebarCollapsed && <span className="truncate">{tool.name}</span>}
              </NavLink>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="border-border border-t p-2">
        <Button
          variant="ghost"
          size="icon"
          className="w-full"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </aside>
  );
}
