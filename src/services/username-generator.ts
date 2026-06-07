import type { UsernameConfig } from '@/types/generators';
import {
  ADJECTIVES,
  NOUNS,
  TECH_PREFIXES,
  TECH_SUFFIXES,
} from '@/assets/wordlists/username';
import { getSecureRandomInt, pickRandom } from '@/utils/crypto';

export const DEFAULT_USERNAME_CONFIG: UsernameConfig = {
  style: 'adjective-noun',
  includeNumbers: true,
  count: 5,
};

function addNumbers(base: string): string {
  const num = getSecureRandomInt(9999);
  return `${base}${num}`;
}

function generateAdjectiveNoun(): string {
  const adj = pickRandom([...ADJECTIVES]);
  const noun = pickRandom([...NOUNS]);
  return `${adj}_${noun}`;
}

function generateRandom(): string {
  const length = getSecureRandomInt(5) + 8;
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[getSecureRandomInt(chars.length)];
  }
  return result;
}

function generateTech(): string {
  const prefix = pickRandom([...TECH_PREFIXES]);
  const suffix = pickRandom([...TECH_SUFFIXES]);
  return `${prefix}_${suffix}`;
}

export function generateUsername(config: UsernameConfig): string {
  let username: string;
  switch (config.style) {
    case 'adjective-noun':
      username = generateAdjectiveNoun();
      break;
    case 'random':
      username = generateRandom();
      break;
    case 'tech':
      username = generateTech();
      break;
  }
  return config.includeNumbers ? addNumbers(username) : username;
}

export function generateUsernames(config: UsernameConfig): string[] {
  return Array.from({ length: config.count }, () => generateUsername(config));
}
