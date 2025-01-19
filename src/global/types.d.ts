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

declare type PageParams = {
  namespace_slug?: string;
  project_slug?: string;
};

/* eslint-disable */
declare type Query<TData = unknown, TBody = unknown> = {
  endpoint: string;
  method?: 'POST';
};
/* eslint-enable */

declare type Option<TValue = string> = {
  label: string;
  value: TValue;
};

declare type Filters = {
  [key: string]: Option[];
};
