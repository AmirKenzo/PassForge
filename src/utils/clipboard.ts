/** Clipboard abstraction — ready for Tauri native clipboard integration. */

export interface ClipboardAdapter {
  writeText(text: string): Promise<void>;
  readText(): Promise<string>;
}

const webClipboard: ClipboardAdapter = {
  async writeText(text: string) {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  },
  async readText() {
    if (navigator.clipboard?.readText) {
      return navigator.clipboard.readText();
    }
    throw new Error('Clipboard read not supported');
  },
};

let adapter: ClipboardAdapter = webClipboard;

export function setClipboardAdapter(newAdapter: ClipboardAdapter) {
  adapter = newAdapter;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await adapter.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export async function readFromClipboard(): Promise<string | null> {
  try {
    return await adapter.readText();
  } catch {
    return null;
  }
}
