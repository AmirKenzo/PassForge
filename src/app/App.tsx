import { AppProviders } from '@/app/providers/AppProviders';
import { AppRouter } from '@/app/Router';

export function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}
