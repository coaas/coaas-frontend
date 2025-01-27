type SearchConfig = {
  placeholder?: string;
  delay?: number;
};

export type UseSearchParams = {
  /**
   * Необходимо мемоизировать
   */
  onChange: (newValue: string) => void;
  config?: SearchConfig;
  initValue?: string;
};
