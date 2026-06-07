/**
 * Platform detection and adapter initialization.
 * Ready for Tauri and Capacitor integration without refactoring.
 */

import type { Platform, PlatformCapabilities } from '@/types/platform';
import { PLATFORM_CAPABILITIES } from '@/types/platform';
import { setClipboardAdapter } from '@/utils/clipboard';

let currentPlatform: Platform = 'web';

export function detectPlatform(): Platform {
  if (typeof window === 'undefined') return 'web';

  // @ts-expect-error Tauri global
  if (window.__TAURI__) return 'tauri';

  // @ts-expect-error Capacitor global
  if (window.Capacitor?.isNativePlatform?.()) return 'capacitor';

  if (window.matchMedia('(display-mode: standalone)').matches) return 'pwa';

  return 'web';
}

export function getPlatform(): Platform {
  return currentPlatform;
}

export function getCapabilities(): PlatformCapabilities {
  return PLATFORM_CAPABILITIES[currentPlatform];
}

export async function initializePlatform(): Promise<Platform> {
  currentPlatform = detectPlatform();

  if (currentPlatform === 'tauri') {
    // When Tauri is integrated, install @tauri-apps/plugin-clipboard-manager and wire:
    // const { writeText, readText } = await import('@tauri-apps/plugin-clipboard-manager');
    // setClipboardAdapter({ writeText, readText });
    void setClipboardAdapter;
  }

  return currentPlatform;
}
