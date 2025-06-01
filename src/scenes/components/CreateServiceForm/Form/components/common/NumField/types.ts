export type NumFieldProps = {
  label: string;
  value: number;
  onChange: (newValue: number) => void;
  orientation?: 'horizontal' | 'vertical';
};
