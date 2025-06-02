import { FormProvider, useForm } from 'react-hook-form';
import { TemplateSettingsForm } from '@globalTypes/templates.draft';
import { FormButton } from '../../components/FormButton';
import { useApiMutation } from '@utils/lib/use-api-query';
import { getTemplateDraft, saveTemplateDraftSettings } from '@api/queries';
import { useDraftContext } from '../../lib/use-draft-context';
import { DeploySettings, HealthCheck, SettingsVariables } from './Bloks';
import { useQueryClient } from '@tanstack/react-query';
import { useNotificationContext } from '@components/Notification';

export const SettingsStep = () => {
  const { open } = useNotificationContext();
  const queryClient = useQueryClient();

  const { defaultValues } = useDraftContext();
  const defaultSettingsValues = defaultValues.draftSettings;
  const { mutate, isPending } = useApiMutation({
    request: saveTemplateDraftSettings,
  });

  const methods = useForm<TemplateSettingsForm>({
    defaultValues: defaultSettingsValues,
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
          queryClient.invalidateQueries({
            queryKey: [getTemplateDraft.endpoint],
          });
          open({ title: 'Settings saved' });
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
