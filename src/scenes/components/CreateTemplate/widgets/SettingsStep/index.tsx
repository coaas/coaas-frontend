import { FormProvider, useForm } from 'react-hook-form';

import { StateType, TemplateSettingsForm } from '@globalTypes/templates.draft';
import { FormButton } from '../../components/FormButton';
import { useApiMutation } from '@utils/lib/use-api-query';
import { getTemplateDraft, saveTemplateDraftSettings } from '@api/queries';
import { useDraftIdStorage } from '../../lib/use-draft-id-storage';
import { useDefaultValues } from '../../lib/use-default-values';
import { DeploySettings, HealthCheck, SettingsVariables } from './Bloks';
import { useQueryClient } from '@tanstack/react-query';

export const SettingsStep = () => {
  const { draftId } = useDraftIdStorage();
  const queryClient = useQueryClient();

  const defaultValues = useDefaultValues(draftId)?.draftSettings;
  const { mutate, isPending } = useApiMutation({
    request: saveTemplateDraftSettings,
  });

  const methods = useForm<TemplateSettingsForm>({
    defaultValues: defaultValues || {
      id: draftId || '',
      state: StateType.draft,
      settings: {
        secrets: [{ name: 'DATABASE_URI' }],
        configs: [{ path: '/app/logging.cfg' }],
        env_vars: [{ key: 'DOCS_PATH', value: '/docs' }],
        ports: [],
        health_check: {
          test: 'curl --fail -s http://localhost:8080/health/check',
          interval: 30,
          timeout: 10,
          retries: 6,
          start_period: 20,
        },
        deployment: {
          restart_policy: {
            condition: 0,
            delay: 0,
            max_attempts: 0,
            window: 0,
          },
          rollback_config: {
            delay: 0,
            failure_action: 0,
            max_failure_ratio: 0,
            monitor: 0,
            order: 0,
            parallelism: 0,
          },
          update_config: {
            delay: 0,
            failure_action: 0,
            max_failure_ratio: 0,
            monitor: 0,
            order: 0,
            parallelism: 0,
          },
        },
      },
      dependencies: [],
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(data => {
    const { settings, ...restData } = data;
    const { ports, ...restSettings } = settings;
    mutate(
      {
        ...restData,
        settings: { ...restSettings, ports: ports.map(({ name }) => name) },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [getTemplateDraft] });
        },
      },
    );
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="mt-[25px]">
        <SettingsVariables />
        <HealthCheck />
        <DeploySettings />
        <FormButton
          className="mt-5"
          disabled={isPending}
          type="submit"
          isLoading={isPending}
          loadingText="Saving..."
        >
          Save
        </FormButton>
      </form>
    </FormProvider>
  );
};
