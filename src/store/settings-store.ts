import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PasswordGeneratorConfig } from '@/types/generators';

export type ThemeMode = 'light' | 'dark' | 'system';

interface SettingsState {
  theme: ThemeMode;
  sidebarCollapsed: boolean;
  passwordFavorites: PasswordGeneratorConfig[];
  setTheme: (theme: ThemeMode) => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  addPasswordFavorite: (config: PasswordGeneratorConfig) => void;
  removePasswordFavorite: (index: number) => void;
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
