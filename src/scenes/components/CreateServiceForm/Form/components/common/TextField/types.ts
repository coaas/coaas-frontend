export type TextFieldProps = {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  orientation?: 'horizontal' | 'vertical';
};
