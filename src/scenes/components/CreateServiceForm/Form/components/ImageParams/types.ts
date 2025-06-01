type FieldProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export type ImageParamsProps = {
  url: FieldProps;
  version: FieldProps & {
    all: string[];
  };
};
