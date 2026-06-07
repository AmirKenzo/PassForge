import type { PasswordAnalysis } from '@/types/generators';

const UPPERCASE = /[A-Z]/;
const LOWERCASE = /[a-z]/;
const NUMBERS = /[0-9]/;
const SYMBOLS = /[^A-Za-z0-9]/;

function getCharsetSize(password: string): number {
  let size = 0;
  if (UPPERCASE.test(password)) size += 26;
  if (LOWERCASE.test(password)) size += 26;
  if (NUMBERS.test(password)) size += 10;
  if (SYMBOLS.test(password)) size += 32;
  return size || 1;
}

function calculateEntropy(password: string): number {
  if (!password) return 0;
  const charsetSize = getCharsetSize(password);
  return password.length * Math.log2(charsetSize);
}

function estimateCrackTime(entropy: number): { seconds: number; label: string } {
  const guessesPerSecond = 1e10;
  const combinations = Math.pow(2, entropy);
  const seconds = combinations / (2 * guessesPerSecond);

  if (seconds < 1) return { seconds, label: 'Instant' };
  if (seconds < 60) return { seconds, label: `${Math.round(seconds)} seconds` };
  if (seconds < 3600) return { seconds, label: `${Math.round(seconds / 60)} minutes` };
  if (seconds < 86400) return { seconds, label: `${Math.round(seconds / 3600)} hours` };
  if (seconds < 31536000) return { seconds, label: `${Math.round(seconds / 86400)} days` };
  if (seconds < 31536000 * 100)
    return { seconds, label: `${Math.round(seconds / 31536000)} years` };
  if (seconds < 31536000 * 1e6)
    return { seconds, label: `${Math.round(seconds / 31536000 / 1000)} thousand years` };
  if (seconds < 31536000 * 1e9)
    return { seconds, label: `${Math.round(seconds / 31536000 / 1e6)} million years` };
  return { seconds, label: 'Centuries or more' };
}

function getStrength(entropy: number): PasswordAnalysis['strength'] {
  if (entropy < 28) return 'very-weak';
  if (entropy < 36) return 'weak';
  if (entropy < 60) return 'fair';
  if (entropy < 80) return 'strong';
  return 'very-strong';
}

function getScore(entropy: number): number {
  return Math.min(100, Math.round((entropy / 100) * 100));
}

function getCharacterDistribution(password: string): Record<string, number> {
  const dist: Record<string, number> = {
    uppercase: 0,
    lowercase: 0,
    numbers: 0,
    symbols: 0,
  };
  for (const char of password) {
    if (UPPERCASE.test(char)) dist.uppercase = (dist.uppercase ?? 0) + 1;
    else if (LOWERCASE.test(char)) dist.lowercase = (dist.lowercase ?? 0) + 1;
    else if (NUMBERS.test(char)) dist.numbers = (dist.numbers ?? 0) + 1;
    else dist.symbols = (dist.symbols ?? 0) + 1;
  }
  return dist;
}

function getRecommendations(password: string, entropy: number): string[] {
  const recs: string[] = [];
  if (!password) return ['Enter a password to analyze'];

  if (password.length < 12) recs.push('Use at least 12 characters for better security');
  if (password.length < 16) recs.push('Consider 16+ characters for high-security accounts');
  if (!UPPERCASE.test(password)) recs.push('Add uppercase letters');
  if (!LOWERCASE.test(password)) recs.push('Add lowercase letters');
  if (!NUMBERS.test(password)) recs.push('Add numbers');
  if (!SYMBOLS.test(password)) recs.push('Add special characters');
  if (/(.)\1{2,}/.test(password)) recs.push('Avoid repeated character sequences');
  if (/^(password|123456|qwerty|admin)/i.test(password))
    recs.push('Avoid common password patterns');
  if (entropy < 60) recs.push('Increase length or character variety to improve entropy');

  if (recs.length === 0) recs.push('Strong password — keep it unique and store it securely');

  return recs;
}

export function analyzePassword(password: string): PasswordAnalysis {
  const entropy = calculateEntropy(password);
  const crackTime = estimateCrackTime(entropy);

  return {
    entropy: Math.round(entropy * 10) / 10,
    score: getScore(entropy),
    strength: getStrength(entropy),
    crackTimeSeconds: crackTime.seconds,
    crackTimeLabel: crackTime.label,
    length: password.length,
    hasUppercase: UPPERCASE.test(password),
    hasLowercase: LOWERCASE.test(password),
    hasNumbers: NUMBERS.test(password),
    hasSymbols: SYMBOLS.test(password),
    characterDistribution: getCharacterDistribution(password),
    recommendations: getRecommendations(password, entropy),
  };
}

export const STRENGTH_COLORS: Record<PasswordAnalysis['strength'], string> = {
  'very-weak': 'bg-destructive',
  weak: 'bg-orange-500',
  fair: 'bg-warning',
  strong: 'bg-success',
  'very-strong': 'bg-emerald-600',
};

export const STRENGTH_LABELS: Record<PasswordAnalysis['strength'], string> = {
  'very-weak': 'Very Weak',
  weak: 'Weak',
  fair: 'Fair',
  strong: 'Strong',
  'very-strong': 'Very Strong',
};
