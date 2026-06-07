/** Platform abstraction types for Tauri / Capacitor future integration. */

export type Platform = 'web' | 'tauri' | 'capacitor' | 'pwa';

export interface PlatformCapabilities {
  clipboard: boolean;
  nativeShare: boolean;
  safeAreaInsets: boolean;
}

export const PLATFORM_CAPABILITIES: Record<Platform, PlatformCapabilities> = {
  web: {
    clipboard: true,
    nativeShare: false,
    safeAreaInsets: false,
  },
  pwa: {
    clipboard: true,
    nativeShare: true,
    safeAreaInsets: true,
  },
  tauri: {
    clipboard: true,
    nativeShare: false,
    safeAreaInsets: false,
  },
  capacitor: {
    clipboard: true,
    nativeShare: true,
    safeAreaInsets: true,
  },
};
