import type { HashAlgorithm } from '@/types/generators';

const ALGORITHM_MAP: Record<HashAlgorithm, string> = {
  MD5: 'MD5',
  'SHA-1': 'SHA-1',
  'SHA-256': 'SHA-256',
  'SHA-512': 'SHA-512',
};

function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function generateHash(input: string, algorithm: HashAlgorithm): Promise<string> {
  if (!input) return '';
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest(ALGORITHM_MAP[algorithm], data);
  return bufferToHex(hashBuffer);
}

export const SUPPORTED_ALGORITHMS: HashAlgorithm[] = ['MD5', 'SHA-1', 'SHA-256', 'SHA-512'];

export const ALGORITHM_INFO: Record<
  HashAlgorithm,
  { bits: number; description: string; secure: boolean }
> = {
  MD5: { bits: 128, description: 'Fast but cryptographically broken', secure: false },
  'SHA-1': { bits: 160, description: 'Deprecated for security applications', secure: false },
  'SHA-256': { bits: 256, description: 'Industry standard, widely used', secure: true },
  'SHA-512': { bits: 512, description: 'Higher security, larger output', secure: true },
};
