import { FC, useState } from 'react';

import { FormProps, FormState } from './types';
import {
  HealthCheckParams,
  ImageParams,
  ServiceParams,
  TextForm,
} from './components';
import { Button } from '@components/Button';
import { useCreateService } from './useCreateService';

export const Form: FC<FormProps> = ({ data }) => {
  const mutation = useCreateService();

  const [formState, setFormState] = useState<FormState>({
    name: 'Default',
    description: '',
    imageParams: {
      url: data.managed.url,
      version: data.managed.versions[0],
    },
    settings: {
      env_vars: data.settings.env_vars,
      ports: data.settings.ports.map(port => +port),
    },
    healthCheck: data.settings.health_check,
  });

  return (
    <div className="flex flex-col gap-7 relative">
      {mutation.isPending && (
        <div className="absolute w-full h-full bg-background opacity-50" />
      )}
      <TextForm
        name={{
          value: formState.name,
          onChange: name =>
            setFormState(prev => ({
              ...prev,
              name,
            })),
        }}
        description={{
          value: formState.description,
          onChange: description =>
            setFormState(prev => ({
              ...prev,
              description,
            })),
        }}
      />
      <ImageParams
        url={{
          value: formState.imageParams.url,
          onChange: url =>
            setFormState(prev => ({
              ...prev,
              imageParams: {
                ...prev.imageParams,
                url,
              },
            })),
        }}
        version={{
          all: data.managed.versions,
          value: formState.imageParams.version,
          onChange: version =>
            setFormState(prev => ({
              ...prev,
              imageParams: {
                ...prev.imageParams,
                version,
              },
            })),
        }}
      />
      <ServiceParams
        vars={{
          values: formState.settings.env_vars,
          onChange: env_vars =>
            setFormState(prev => ({
              ...prev,
              settings: {
                ...prev.settings,
                env_vars,
              },
            })),
        }}
        ports={{
          values: formState.settings.ports,
          onChange: ports =>
            setFormState(prev => ({
              ...prev,
              settings: {
                ...prev.settings,
                ports,
              },
            })),
        }}
      />
      <HealthCheckParams
        test={{
          value: formState.healthCheck.test,
          onChange: test =>
            setFormState(prev => ({
              ...prev,
              healthCheck: {
                ...prev.healthCheck,
                test,
              },
            })),
        }}
        interval={{
          value: formState.healthCheck.interval,
          onChange: interval =>
            setFormState(prev => ({
              ...prev,
              healthCheck: {
                ...prev.healthCheck,
                interval,
              },
            })),
        }}
        timeout={{
          value: formState.healthCheck.timeout,
          onChange: timeout =>
            setFormState(prev => ({
              ...prev,
              healthCheck: {
                ...prev.healthCheck,
                timeout,
              },
            })),
        }}
        retries={{
          value: formState.healthCheck.retries,
          onChange: retries =>
            setFormState(prev => ({
              ...prev,
              healthCheck: {
                ...prev.healthCheck,
                retries,
              },
            })),
        }}
        startPeriod={{
          value: formState.healthCheck.start_period,
          onChange: start_period =>
            setFormState(prev => ({
              ...prev,
              healthCheck: {
                ...prev.healthCheck,
                start_period,
              },
            })),
        }}
      />
      <Button onClick={() => mutation.mutate(formState)}>Create service</Button>
    </div>
  );
};
