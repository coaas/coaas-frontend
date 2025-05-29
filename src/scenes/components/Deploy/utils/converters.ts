type ConvertType<
  T extends string | number | symbol,
  K extends StringConstructor | NumberConstructor,
> = K extends StringConstructor
  ? Record<T, string>
  : K extends NumberConstructor
    ? Record<T, number>
    : never;

export const convertTypes = <
  T extends Record<string, string | number>,
  K extends keyof T,
  U extends StringConstructor | NumberConstructor,
>(
  obj: T,
  keys: K[],
  to: U,
) => {
  const result: Record<string, string | number> = {};

  for (const key in obj) {
    if (keys.includes(key as unknown as K)) {
      result[key] = to === String ? String(obj[key]) : Number(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }

  return result as Record<Exclude<keyof T, K>, T[Exclude<keyof T, K>]> &
    ConvertType<K, U>;
};
