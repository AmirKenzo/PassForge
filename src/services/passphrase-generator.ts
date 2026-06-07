import type { PassphraseConfig } from '@/types/generators';
import { getSecureRandomInt, pickRandom, pickRandomMultiple } from '@/utils/crypto';
import { DICEWARE_WORDLIST } from '@/assets/wordlists/diceware';

export const DEFAULT_PASSPHRASE_CONFIG: PassphraseConfig = {
  wordCount: 6,
  separator: '-',
  capitalize: false,
  includeNumbers: false,
  includeSymbols: false,
  count: 3,
};

const SYMBOLS = ['!', '@', '#', '$', '%', '&', '*'];

function formatWord(word: string, capitalize: boolean): string {
  if (!capitalize) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function generatePassphrase(config: PassphraseConfig): string {
  const words = pickRandomMultiple([...DICEWARE_WORDLIST], config.wordCount);
  const parts = words.map((w) => formatWord(w, config.capitalize));

  if (config.includeNumbers) {
    const num = getSecureRandomInt(900) + 100;
    const pos = getSecureRandomInt(parts.length + 1);
    parts.splice(pos, 0, String(num));
  }

  if (config.includeSymbols) {
    parts.push(pickRandom(SYMBOLS));
  }

  return parts.join(config.separator);
}

export function generatePassphrases(config: PassphraseConfig): string[] {
  return Array.from({ length: config.count }, () => generatePassphrase(config));
}
