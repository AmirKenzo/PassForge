import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';
import { useSettingsStore } from '@/store/settings-store';
import { cn } from '@/utils/cn';

export function AppLayout() {
  const sidebarCollapsed = useSettingsStore((s) => s.sidebarCollapsed);

  return (
    <div className="bg-background">
      <Sidebar />
      <div
        className={cn(
          'flex h-dvh flex-col overflow-hidden transition-all duration-300',
          sidebarCollapsed ? 'md:ml-16' : 'md:ml-64',
        )}
      >
        <Header />
        <MobileNav />
        <main
          className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain p-4 pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] md:p-6 md:pb-6"
          id="main-content"
        >
          <div className="mx-auto max-w-5xl">
            <Outlet />
          </div>
        </main>
        <MobileBottomNav />
      </div>
    </div>
  );
}
