/** Settings import utilities. */

import type { PasswordGeneratorConfig } from '@/types/generators';

export interface ImportableSettings {
  version: string;
  passwordGenerator?: PasswordGeneratorConfig;
  favorites?: PasswordGeneratorConfig[];
  [key: string]: unknown;
}

export function parseSettingsJson(content: string): ImportableSettings {
  const parsed = JSON.parse(content) as unknown;
  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error('Invalid settings file: expected JSON object');
  }
  const settings = parsed as ImportableSettings;
  if (!settings.version) {
    throw new Error('Invalid settings file: missing version field');
  }
  return settings;
}

export async function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

export async function importSettingsFromFile(file: File): Promise<ImportableSettings> {
  const content = await readFileAsText(file);
  return parseSettingsJson(content);
}
