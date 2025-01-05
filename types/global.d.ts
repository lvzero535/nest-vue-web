export {};
declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type SafeAny = any;
  type Fn = (...args) => void;
  type Nullable<T> = T | null;
  type Undefinable<T> = T | undefined;
  type Nullish = null | undefined;
  type MakePartial<T, K extends keyof T = keyof T> = Omit<T, K> &
    Partial<Pick<T, K>>;
  type Primitive =
    | string
    | number
    | bigint
    | boolean
    | symbol
    | null
    | undefined;
  type DeepReadonly<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
  };
  type Recordable<T = SafeAny> = Record<string, T>;
}
