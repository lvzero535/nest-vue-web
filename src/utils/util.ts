export function uniqueId(key?: string) {
  return `${key || 'ld'}-${Date.now()}`;
}
