declare type GenericProps<TType, TProps> = {
  type: TType;
  props: TProps;
};

declare type GenericData<TType, TData> = {
  type: TType;
  data: TData;
};

declare type WithId<TId = string> = {
  id: TId;
};

declare type WithClassname = {
  className?: string;
};

declare type Timestamp = string;

/* eslint-disable */
declare type ApiRequest<TData = unknown, TBody = unknown> = {
  endpoint: string;
  method?: 'POST';
};
/* eslint-enable */

declare type PaginatedResponse<T> = {
  // унифицировать бы запросы  с бека...
  templates: T[];
  has_more: boolean;
  next_key: NextKey | null;
};

declare interface AfterKey {
  id: string;
  created_at: string;
}
declare interface NextKey {
  id: string;
  created_at: string;
}

declare type Option<TValue = string> = {
  label: string;
  value: TValue;
};
