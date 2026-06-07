import { create } from 'zustand';

interface UiState {
  searchQuery: string;
  mobileMenuOpen: boolean;
  copiedId: string | null;
  setSearchQuery: (query: string) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setCopiedId: (id: string | null) => void;
}

export const useUiStore = create<UiState>((set) => ({
  searchQuery: '',
  mobileMenuOpen: false,
  copiedId: null,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setCopiedId: (id) => set({ copiedId: id }),
}));
