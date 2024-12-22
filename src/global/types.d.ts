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
