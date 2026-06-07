import type { RandomStringConfig } from '@/types/generators';
import { getSecureRandomInt } from '@/utils/crypto';

export const DEFAULT_RANDOM_STRING_CONFIG: RandomStringConfig = {
  charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  length: 16,
  count: 5,
};

export function generateRandomString(config: RandomStringConfig): string {
  if (!config.charset) throw new Error('Character set cannot be empty');
  let result = '';
  for (let i = 0; i < config.length; i++) {
    result += config.charset[getSecureRandomInt(config.charset.length)];
  }
  return result;
}

export function generateRandomStrings(config: RandomStringConfig): string[] {
  return Array.from({ length: config.count }, () => generateRandomString(config));
}
