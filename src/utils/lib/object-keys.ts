export const objectKeys = <O extends object>(obj: O) =>
  Object.keys(obj) as Array<keyof typeof obj>;
