import {
  GetDraftTemplateResponse,
  HealthCheck,
} from '@globalTypes/templates.draft.get';

export type FormProps = {
  data: GetDraftTemplateResponse;
};

export type FormState = {
  name: string;
  description: string;
  imageParams: {
    url: string;
    version: string;
  };
  settings: {
    env_vars: { key: string; value: string }[];
    ports: number[];
  };
  healthCheck: HealthCheck;
};
