type FieldProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export type TextFormProps = {
  name: FieldProps;
  description: FieldProps;
};
