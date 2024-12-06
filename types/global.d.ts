export {};
declare global {
  type Nullable<T> = T | null;
  type Undefinable<T> = T | undefined;
  type Nullish = null | undefined;
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
  type Recordable<T = any> = Record<string, T>;
}
