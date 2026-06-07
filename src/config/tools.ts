import type { ToolDefinition } from '@/types/generators';

export const TOOLS: ToolDefinition[] = [
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate strong, customizable passwords with advanced options',
    path: '/app/password-generator',
    icon: 'KeyRound',
    category: 'generate',
    keywords: ['password', 'secure', 'random', 'strong'],
  },
  {
    id: 'password-analyzer',
    name: 'Password Analyzer',
    description: 'Analyze password strength, entropy, and crack time in real time',
    path: '/app/password-analyzer',
    icon: 'ShieldCheck',
    category: 'analyze',
    keywords: ['analyze', 'strength', 'entropy', 'security'],
  },
  {
    id: 'passphrase-generator',
    name: 'Passphrase Generator',
    description: 'Generate memorable Diceware-style passphrases',
    path: '/app/passphrase-generator',
    icon: 'BookOpen',
    category: 'generate',
    keywords: ['passphrase', 'diceware', 'words', 'memorable'],
  },
  {
    id: 'username-generator',
    name: 'Username Generator',
    description: 'Create unique usernames with adjective-noun combinations',
    path: '/app/username-generator',
    icon: 'User',
    category: 'generate',
    keywords: ['username', 'handle', 'alias', 'nickname'],
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Generate UUID v4 and v7 identifiers',
    path: '/app/uuid-generator',
    icon: 'Fingerprint',
    category: 'generate',
    keywords: ['uuid', 'guid', 'identifier', 'unique'],
  },
  {
    id: 'api-key-generator',
    name: 'API Key Generator',
    description: 'Generate secure API keys with custom prefixes',
    path: '/app/api-key-generator',
    icon: 'Code',
    category: 'generate',
    keywords: ['api', 'key', 'secret', 'token'],
  },
  {
    id: 'token-generator',
    name: 'Token Generator',
    description: 'Generate secure tokens in hex, base64, or alphanumeric formats',
    path: '/app/token-generator',
    icon: 'Ticket',
    category: 'generate',
    keywords: ['token', 'hex', 'base64', 'session'],
  },
  {
    id: 'random-string-generator',
    name: 'Random String Generator',
    description: 'Generate random strings with custom character sets',
    path: '/app/random-string-generator',
    icon: 'Shuffle',
    category: 'generate',
    keywords: ['random', 'string', 'charset', 'custom'],
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Hash text locally with MD5, SHA-1, SHA-256, and SHA-512',
    path: '/app/hash-generator',
    icon: 'Hash',
    category: 'utility',
    keywords: ['hash', 'sha', 'md5', 'digest'],
  },
  {
    id: 'security-utilities',
    name: 'Security Utilities',
    description: 'PIN, OTP, Base64, and security environment checks',
    path: '/app/security-utilities',
    icon: 'Wrench',
    category: 'utility',
    keywords: ['pin', 'otp', 'base64', 'utilities'],
  },
];

export function getToolById(id: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.id === id);
}

export function searchTools(query: string): ToolDefinition[] {
  const q = query.toLowerCase().trim();
  if (!q) return TOOLS;
  return TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.keywords.some((k) => k.includes(q)),
  );
}
