export interface PasswordGeneratorConfig {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeSimilar: boolean;
  excludeAmbiguous: boolean;
  preventRepeated: boolean;
  customCharset: string;
  useCustomCharset: boolean;
  minUppercase: number;
  minLowercase: number;
  minNumbers: number;
  minSymbols: number;
  count: number;
}

export interface PassphraseConfig {
  wordCount: number;
  separator: string;
  capitalize: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  count: number;
}

export interface UsernameConfig {
  style: 'adjective-noun' | 'random' | 'tech';
  includeNumbers: boolean;
  count: number;
}

export interface UuidConfig {
  version: 'v4' | 'v7';
  count: number;
}

export interface ApiKeyConfig {
  length: number;
  prefix: string;
  count: number;
}

export interface TokenConfig {
  format: 'hex' | 'base64' | 'alphanumeric';
  length: number;
  count: number;
}

export interface RandomStringConfig {
  charset: string;
  length: number;
  count: number;
}

export type HashAlgorithm = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512';

export interface HashConfig {
  algorithm: HashAlgorithm;
  input: string;
}

export interface PasswordAnalysis {
  entropy: number;
  score: number;
  strength: 'very-weak' | 'weak' | 'fair' | 'strong' | 'very-strong';
  crackTimeSeconds: number;
  crackTimeLabel: string;
  length: number;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumbers: boolean;
  hasSymbols: boolean;
  characterDistribution: Record<string, number>;
  recommendations: string[];
}

export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: string;
  category: 'generate' | 'analyze' | 'utility';
  keywords: string[];
}
