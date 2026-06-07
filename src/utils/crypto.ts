/** Cryptographically secure random utilities — all client-side. */

export function getSecureRandomBytes(length: number): Uint8Array {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

export function getSecureRandomInt(max: number): number {
  if (max <= 0) throw new Error('max must be positive');
  const range = max;
  const bytesNeeded = Math.ceil(Math.log2(range) / 8) || 1;
  const maxValid = Math.floor(256 ** bytesNeeded / range) * range - 1;
  let value: number;
  do {
    const bytes = getSecureRandomBytes(bytesNeeded);
    value = bytes.reduce((acc, byte, i) => acc + byte * 256 ** i, 0);
  } while (value > maxValid);
  return value % range;
}

export function getSecureRandomFloat(): number {
  const bytes = getSecureRandomBytes(4);
  const view = new DataView(bytes.buffer);
  return view.getUint32(0) / 0x100000000;
}

export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function pickRandom<T>(array: T[]): T {
  return array[getSecureRandomInt(array.length)]!;
}

export function pickRandomMultiple<T>(array: T[], count: number): T[] {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, Math.min(count, array.length));
}
