import type { TokenConfig } from '@/types/generators';
import { getSecureRandomBytes, getSecureRandomInt } from '@/utils/crypto';

export const DEFAULT_TOKEN_CONFIG: TokenConfig = {
  format: 'hex',
  length: 32,
  count: 1,
};

const ALPHANUMERIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateHexToken(byteLength: number): string {
  return Array.from(getSecureRandomBytes(byteLength))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function generateBase64Token(byteLength: number): string {
  const bytes = getSecureRandomBytes(byteLength);
  const binary = Array.from(bytes)
    .map((b) => String.fromCharCode(b))
    .join('');
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function generateAlphanumericToken(length: number): string {
  let token = '';
  for (let i = 0; i < length; i++) {
    token += ALPHANUMERIC[getSecureRandomInt(ALPHANUMERIC.length)];
  }
  return token;
}

export function generateToken(config: TokenConfig): string {
  switch (config.format) {
    case 'hex':
      return generateHexToken(Math.ceil(config.length / 2));
    case 'base64':
      return generateBase64Token(Math.ceil((config.length * 3) / 4));
    case 'alphanumeric':
      return generateAlphanumericToken(config.length);
  }
}

export function generateTokens(config: TokenConfig): string[] {
  return Array.from({ length: config.count }, () => generateToken(config));
}
