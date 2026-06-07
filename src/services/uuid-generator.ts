import type { UuidConfig } from '@/types/generators';
import { getSecureRandomBytes } from '@/utils/crypto';

export const DEFAULT_UUID_CONFIG: UuidConfig = {
  version: 'v4',
  count: 1,
};

function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function formatUuid(bytes: Uint8Array, version: 4 | 7): string {
  const hex = bytesToHex(bytes);
  if (version === 4) {
    const timeLow = hex.slice(0, 8);
    const timeMid = hex.slice(8, 12);
    const timeHi = '4' + hex.slice(13, 16);
    const clockSeq =
      ((parseInt(hex.slice(16, 18), 16) & 0x3f) | 0x80).toString(16) + hex.slice(18, 20);
    const node = hex.slice(20, 32);
    return `${timeLow}-${timeMid}-${timeHi}-${clockSeq}-${node}`;
  }

  const timestamp = Date.now();
  const tsHex = timestamp.toString(16).padStart(12, '0');
  const randA = hex.slice(0, 4);
  const versionNibble = '7';
  const randB = hex.slice(5, 8);
  const variant = ((parseInt(hex.slice(8, 10), 16) & 0x3f) | 0x80).toString(16).padStart(2, '0');
  const randC = hex.slice(10, 22);
  return `${tsHex.slice(0, 8)}-${tsHex.slice(8, 12)}-${versionNibble}${randA}-${variant}${randB}-${randC}`;
}

export function generateUuid(version: 'v4' | 'v7' = 'v4'): string {
  const bytes = getSecureRandomBytes(16);
  return formatUuid(bytes, version === 'v4' ? 4 : 7);
}

export function generateUuids(config: UuidConfig): string[] {
  return Array.from({ length: config.count }, () => generateUuid(config.version));
}
