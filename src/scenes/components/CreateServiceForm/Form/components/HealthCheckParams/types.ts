export type HealthCheckParamsProps = {
  test: {
    value: string;
    onChange: (value: string) => void;
  };
  interval: {
    value: number;
    onChange: (value: number) => void;
  };
  timeout: {
    value: number;
    onChange: (value: number) => void;
  };
  retries: {
    value: number;
    onChange: (value: number) => void;
  };
  startPeriod: {
    value: number;
    onChange: (value: number) => void;
  };
};
