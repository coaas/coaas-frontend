import { FieldData } from './components';

export type ServiceParamsProps = {
  vars: {
    values: FieldData[];
    onChange: (newValues: FieldData[]) => void;
  };
  ports: {
    values: number[];
    onChange: (newValues: number[]) => void;
  };
};
