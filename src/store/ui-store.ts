import { create } from 'zustand';

interface UiState {
  mobileMenuOpen: boolean;
  copiedId: string | null;
  setMobileMenuOpen: (open: boolean) => void;
  setCopiedId: (id: string | null) => void;
}

export const useUiStore = create<UiState>((set) => ({
  mobileMenuOpen: false,
  copiedId: null,

  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setCopiedId: (id) => set({ copiedId: id }),
}));
