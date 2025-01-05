export function uniqueId(key?: string) {
  return `${key || 'ld'}-${Date.now()}`;
}

let __id = Date.now();
export function getId() {
  return __id++;
}
