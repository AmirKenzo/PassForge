/** Platform abstraction types for Tauri / Capacitor future integration. */

export type Platform = 'web' | 'tauri' | 'capacitor' | 'pwa';

export interface PlatformCapabilities {
  clipboard: boolean;
  fileExport: boolean;
  fileImport: boolean;
  nativeShare: boolean;
  safeAreaInsets: boolean;
}

export const PLATFORM_CAPABILITIES: Record<Platform, PlatformCapabilities> = {
  web: {
    clipboard: true,
    fileExport: true,
    fileImport: true,
    nativeShare: false,
    safeAreaInsets: false,
  },
  pwa: {
    clipboard: true,
    fileExport: true,
    fileImport: true,
    nativeShare: true,
    safeAreaInsets: true,
  },
  tauri: {
    clipboard: true,
    fileExport: true,
    fileImport: true,
    nativeShare: false,
    safeAreaInsets: false,
  },
  capacitor: {
    clipboard: true,
    fileExport: true,
    fileImport: true,
    nativeShare: true,
    safeAreaInsets: true,
  },
};
