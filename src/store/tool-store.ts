import { create } from 'zustand';
import type { PasswordGeneratorConfig } from '@/types/generators';
import { DEFAULT_PASSWORD_CONFIG } from '@/services/password-generator';

interface ToolState {
  passwordHistory: string[];
  passwordConfig: PasswordGeneratorConfig;
  addToPasswordHistory: (password: string) => void;
  clearPasswordHistory: () => void;
  setPasswordConfig: (config: Partial<PasswordGeneratorConfig>) => void;
  loadPasswordConfig: (config: PasswordGeneratorConfig) => void;
}

const MAX_HISTORY = 50;

export const useToolStore = create<ToolState>((set) => ({
  passwordHistory: [],
  passwordConfig: DEFAULT_PASSWORD_CONFIG,

  addToPasswordHistory: (password) =>
    set((state) => ({
      passwordHistory: [password, ...state.passwordHistory.filter((p) => p !== password)].slice(
        0,
        MAX_HISTORY,
      ),
    })),

  clearPasswordHistory: () => set({ passwordHistory: [] }),

  setPasswordConfig: (config) =>
    set((state) => ({
      passwordConfig: { ...state.passwordConfig, ...config },
    })),

  loadPasswordConfig: (config) => set({ passwordConfig: config }),
}));
