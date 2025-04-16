import { FormProvider, useForm } from 'react-hook-form';

import { TemplateSettingsForm } from '@globalTypes/templates.draft';
import { FormButton } from '../../components/FormButton';
import { useApiMutation } from '@utils/lib/use-api-query';
import { getTemplateDraft, saveTemplateDraftSettings } from '@api/queries';
import { useDefaultValues } from '../../lib/use-default-values';
import { DeploySettings, HealthCheck, SettingsVariables } from './Bloks';
import { useQueryClient } from '@tanstack/react-query';

export const SettingsStep = () => {
  const queryClient = useQueryClient();

  const defaultValues = useDefaultValues().draftSettings;
  const { mutate, isPending } = useApiMutation({
    request: saveTemplateDraftSettings,
  });

  const methods = useForm<TemplateSettingsForm>({
    defaultValues,
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
