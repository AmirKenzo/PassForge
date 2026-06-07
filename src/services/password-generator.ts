import type { PasswordGeneratorConfig } from '@/types/generators';
import { getSecureRandomInt } from '@/utils/crypto';

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const SIMILAR = 'il1Lo0O';
const AMBIGUOUS = '{}[]()/\\\'"`~,;.<>';

export const DEFAULT_PASSWORD_CONFIG: PasswordGeneratorConfig = {
  length: 20,
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
  excludeSimilar: true,
  excludeAmbiguous: false,
  preventRepeated: false,
  customCharset: '',
  useCustomCharset: false,
  minUppercase: 1,
  minLowercase: 1,
  minNumbers: 1,
  minSymbols: 1,
  count: 1,
};

function filterChars(chars: string, excludeSimilar: boolean, excludeAmbiguous: boolean): string {
  let result = chars;
  if (excludeSimilar) {
    result = result
      .split('')
      .filter((c) => !SIMILAR.includes(c))
      .join('');
  }
  if (excludeAmbiguous) {
    result = result
      .split('')
      .filter((c) => !AMBIGUOUS.includes(c))
      .join('');
  }
  return result;
}

function buildCharset(config: PasswordGeneratorConfig): {
  charset: string;
  groups: { chars: string; min: number }[];
} {
  if (config.useCustomCharset && config.customCharset.length > 0) {
    return { charset: config.customCharset, groups: [] };
  }

  const groups: { chars: string; min: number }[] = [];
  let charset = '';

  if (config.uppercase) {
    const chars = filterChars(UPPERCASE, config.excludeSimilar, config.excludeAmbiguous);
    if (chars) {
      charset += chars;
      groups.push({ chars, min: config.minUppercase });
    }
  }
  if (config.lowercase) {
    const chars = filterChars(LOWERCASE, config.excludeSimilar, config.excludeAmbiguous);
    if (chars) {
      charset += chars;
      groups.push({ chars, min: config.minLowercase });
    }
  }
  if (config.numbers) {
    const chars = filterChars(NUMBERS, config.excludeSimilar, config.excludeAmbiguous);
    if (chars) {
      charset += chars;
      groups.push({ chars, min: config.minNumbers });
    }
  }
  if (config.symbols) {
    const chars = filterChars(SYMBOLS, config.excludeSimilar, config.excludeAmbiguous);
    if (chars) {
      charset += chars;
      groups.push({ chars, min: config.minSymbols });
    }
  }

  return { charset, groups };
}

function pickChar(chars: string, preventRepeated: boolean, lastChar: string | null): string {
  if (!preventRepeated || !lastChar || chars.length === 1) {
    return chars[getSecureRandomInt(chars.length)]!;
  }
  const filtered = chars.split('').filter((c) => c !== lastChar);
  const pool = filtered.length > 0 ? filtered.join('') : chars;
  return pool[getSecureRandomInt(pool.length)]!;
}

export function generatePassword(config: PasswordGeneratorConfig): string {
  const { charset, groups } = buildCharset(config);

  if (!charset) {
    throw new Error('No character set selected');
  }

  const minTotal = groups.reduce((sum, g) => sum + g.min, 0);
  if (minTotal > config.length) {
    throw new Error('Minimum character requirements exceed password length');
  }

  const password: string[] = [];
  let lastChar: string | null = null;

  for (const group of groups) {
    for (let i = 0; i < group.min; i++) {
      const char = pickChar(group.chars, config.preventRepeated, lastChar);
      password.push(char);
      lastChar = char;
    }
  }

  while (password.length < config.length) {
    const char = pickChar(charset, config.preventRepeated, lastChar);
    password.push(char);
    lastChar = char;
  }

  for (let i = password.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);
    [password[i], password[j]] = [password[j]!, password[i]!];
  }

  return password.join('');
}

export function generatePasswords(config: PasswordGeneratorConfig): string[] {
  return Array.from({ length: config.count }, () => generatePassword(config));
}
