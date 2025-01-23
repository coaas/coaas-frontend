export const objectEntries = <K extends string | number | symbol, V>(
  o: Record<K, V>,
) => Object.entries(o) as unknown as [K, V][];
