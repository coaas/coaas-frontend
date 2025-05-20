type Pagination = {
  has_more: boolean;
  next_key: {
    id: string;
    created_at: string;
  } | null;
};
type PaginationKey = null | Pagination['next_key'];

export const executePages = <
  K extends Pagination,
  T extends (after_key: PaginationKey) => Promise<K>,
>(
  fn: T,
  nextKey: PaginationKey = null,
  pages: number = 99999,
  previousResult: K[] = [],
): Promise<K[]> => {
  return fn(nextKey).then(result => {
    if (pages <= 0 || !result.has_more) {
      return [...previousResult, result];
    }
    return executePages(fn, result.next_key, pages - 1, [
      ...previousResult,
      result,
    ]);
  });
};
