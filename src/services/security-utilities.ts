import { getSecureRandomBytes } from '@/utils/crypto';

export function generatePin(length = 6): string {
  let pin = '';
  for (let i = 0; i < length; i++) {
    pin += (getSecureRandomBytes(1)[0]! % 10).toString();
  }
  return pin;
}

export function generateOtp(length = 6): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += chars[getSecureRandomBytes(1)[0]! % chars.length];
  }
  return otp;
}

export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function generateRandomBytes(count: number): string {
  return bytesToHex(getSecureRandomBytes(count));
}

export function base64Encode(text: string): string {
  return btoa(unescape(encodeURIComponent(text)));
}

export function base64Decode(encoded: string): string {
  try {
    return decodeURIComponent(escape(atob(encoded)));
  } catch {
    throw new Error('Invalid Base64 input');
  }
}

export function calculatePasswordBits(length: number, charsetSize: number): number {
  return Math.floor(length * Math.log2(charsetSize));
}

export interface SecurityCheckResult {
  passed: boolean;
  checks: { name: string; passed: boolean; message: string }[];
}

export function runSecurityChecks(): SecurityCheckResult {
  const checks = [
    {
      name: 'Web Crypto API',
      passed: typeof crypto !== 'undefined' && typeof crypto.subtle !== 'undefined',
      message: 'Required for secure random generation and hashing',
    },
    {
      name: 'Secure Random',
      passed: typeof crypto.getRandomValues === 'function',
      message: 'Required for password and token generation',
    },
    {
      name: 'Local Storage',
      passed: typeof localStorage !== 'undefined',
      message: 'Used for settings persistence (optional)',
    },
    {
      name: 'Clipboard API',
      passed: typeof navigator !== 'undefined' && !!navigator.clipboard,
      message: 'Enables one-click copy functionality',
    },
    {
      name: 'Service Worker',
      passed: typeof navigator !== 'undefined' && 'serviceWorker' in navigator,
      message: 'Enables offline PWA support',
    },
  ];

  return {
    passed: checks.every((c) => c.passed),
    checks,
  };
}
