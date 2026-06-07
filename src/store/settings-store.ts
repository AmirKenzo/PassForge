import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PasswordGeneratorConfig } from '@/types/generators';
import { DEFAULT_PASSWORD_CONFIG } from '@/services/password-generator';

export type ThemeMode = 'light' | 'dark' | 'system';

interface SettingsState {
  theme: ThemeMode;
  sidebarCollapsed: boolean;
  passwordFavorites: PasswordGeneratorConfig[];
  setTheme: (theme: ThemeMode) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  addPasswordFavorite: (config: PasswordGeneratorConfig) => void;
  removePasswordFavorite: (index: number) => void;
  importSettings: (data: Record<string, unknown>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      sidebarCollapsed: false,
      passwordFavorites: [],

      setTheme: (theme) => set({ theme }),

      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      addPasswordFavorite: (config) =>
        set((state) => ({
          passwordFavorites: [...state.passwordFavorites, { ...config, count: 1 }],
        })),

      removePasswordFavorite: (index) =>
        set((state) => ({
          passwordFavorites: state.passwordFavorites.filter((_, i) => i !== index),
        })),

      importSettings: (data) =>
        set((state) => ({
          theme: (data.theme as ThemeMode) ?? state.theme,
          passwordFavorites:
            (data.passwordFavorites as PasswordGeneratorConfig[]) ?? state.passwordFavorites,
        })),
    }),
    {
      name: 'passforge-settings',
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
        passwordFavorites: state.passwordFavorites,
      }),
    },
  ),
);

export function exportSettings(): string {
  const state = useSettingsStore.getState();
  return JSON.stringify(
    {
      version: '1.0.0',
      theme: state.theme,
      passwordFavorites: state.passwordFavorites,
      passwordGenerator: DEFAULT_PASSWORD_CONFIG,
    },
    null,
    2,
  );
}
