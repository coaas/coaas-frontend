export type FieldData = {
  key: string;
  value: string;
};

export type OnChange = (newFields: FieldData[]) => void;

export type FieldProps = {
  fields: FieldData[];
  onChange: OnChange;
  idx: number;
};
