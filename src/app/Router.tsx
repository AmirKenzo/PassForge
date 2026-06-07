import { lazy, Suspense, type ReactNode } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { getRouterBasename } from '@/utils/router-basename';

const LandingPage = lazy(() =>
  import('@/pages/LandingPage').then((m) => ({ default: m.LandingPage })),
);
const DashboardPage = lazy(() =>
  import('@/pages/DashboardPage').then((m) => ({ default: m.DashboardPage })),
);
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);

const PasswordGeneratorPage = lazy(() =>
  import('@/features/password-generator/PasswordGeneratorPage').then((m) => ({
    default: m.PasswordGeneratorPage,
  })),
);
const PasswordAnalyzerPage = lazy(() =>
  import('@/features/password-analyzer/PasswordAnalyzerPage').then((m) => ({
    default: m.PasswordAnalyzerPage,
  })),
);
const PassphraseGeneratorPage = lazy(() =>
  import('@/features/passphrase-generator/PassphraseGeneratorPage').then((m) => ({
    default: m.PassphraseGeneratorPage,
  })),
);
const UsernameGeneratorPage = lazy(() =>
  import('@/features/username-generator/UsernameGeneratorPage').then((m) => ({
    default: m.UsernameGeneratorPage,
  })),
);
const UuidGeneratorPage = lazy(() =>
  import('@/features/uuid-generator/UuidGeneratorPage').then((m) => ({
    default: m.UuidGeneratorPage,
  })),
);
const ApiKeyGeneratorPage = lazy(() =>
  import('@/features/api-key-generator/ApiKeyGeneratorPage').then((m) => ({
    default: m.ApiKeyGeneratorPage,
  })),
);
const TokenGeneratorPage = lazy(() =>
  import('@/features/token-generator/TokenGeneratorPage').then((m) => ({
    default: m.TokenGeneratorPage,
  })),
);
const RandomStringGeneratorPage = lazy(() =>
  import('@/features/random-string-generator/RandomStringGeneratorPage').then((m) => ({
    default: m.RandomStringGeneratorPage,
  })),
);
const HashGeneratorPage = lazy(() =>
  import('@/features/hash-generator/HashGeneratorPage').then((m) => ({
    default: m.HashGeneratorPage,
  })),
);
const SecurityUtilitiesPage = lazy(() =>
  import('@/features/security-utilities/SecurityUtilitiesPage').then((m) => ({
    default: m.SecurityUtilitiesPage,
  })),
);

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
    </div>
  );
}

function SuspenseWrap({ children }: { children: ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}

const isNativeBuild = import.meta.env.MODE === 'native';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: isNativeBuild ? (
        <Navigate to="/app" replace />
      ) : (
        <SuspenseWrap>
          <LandingPage />
        </SuspenseWrap>
      ),
    },
    {
      path: '/app',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: (
            <SuspenseWrap>
              <DashboardPage />
            </SuspenseWrap>
          ),
        },
        {
          path: 'password-generator',
          element: (
            <SuspenseWrap>
              <PasswordGeneratorPage />
            </SuspenseWrap>
          ),
        },
        {
          path: 'password-analyzer',
          element: (
            <SuspenseWrap>
              <PasswordAnalyzerPage />
            </SuspenseWrap>
          ),
        },
        {
          path: 'passphrase-generator',
          element: (
            <SuspenseWrap>
              <PassphraseGeneratorPage />
            </SuspenseWrap>
          ),
        },
        {
          path: 'username-generator',
          element: (
            <SuspenseWrap>
              <UsernameGeneratorPage />
            </SuspenseWrap>
          ),
        },
        {
          path: 'uuid-generator',
          element: (
            <SuspenseWrap>
              <UuidGeneratorPage />
            </SuspenseWrap>
          ),
        },
        {
          path: 'api-key-generator',
          element: (
            <SuspenseWrap>
              <ApiKeyGeneratorPage />
            </SuspenseWrap>
          ),
        },
        {
          path: 'token-generator',
          element: (
            <SuspenseWrap>
              <TokenGeneratorPage />
            </SuspenseWrap>
          ),
        },
        {
          path: 'random-string-generator',
          element: (
            <SuspenseWrap>
              <RandomStringGeneratorPage />
            </SuspenseWrap>
          ),
        },
        {
          path: 'hash-generator',
          element: (
            <SuspenseWrap>
              <HashGeneratorPage />
            </SuspenseWrap>
          ),
        },
        {
          path: 'security-utilities',
          element: (
            <SuspenseWrap>
              <SecurityUtilitiesPage />
            </SuspenseWrap>
          ),
        },
      ],
    },
    {
      path: '*',
      element: (
        <SuspenseWrap>
          <NotFoundPage />
        </SuspenseWrap>
      ),
    },
  ],
  { basename: getRouterBasename() },
);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
