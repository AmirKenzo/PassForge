import type { ApiKeyConfig } from '@/types/generators';
import { getSecureRandomInt } from '@/utils/crypto';

export const DEFAULT_API_KEY_CONFIG: ApiKeyConfig = {
  length: 32,
  prefix: 'pk_',
  count: 1,
};

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function generateApiKey(config: ApiKeyConfig): string {
  let key = '';
  for (let i = 0; i < config.length; i++) {
    key += CHARSET[getSecureRandomInt(CHARSET.length)];
  }
  return config.prefix ? `${config.prefix}${key}` : key;
}

export function generateApiKeys(config: ApiKeyConfig): string[] {
  return Array.from({ length: config.count }, () => generateApiKey(config));
}
