export type UseLazyGridParams = {
  fetchNextPage: () => void;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  /**
   * текущее кол-во элементов
   */
  count: number;
  gap: number;
  minItemWidth: number;
  itemHeight: number;
};
