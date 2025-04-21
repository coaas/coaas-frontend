import { FormButton } from '../../components/FormButton';
import { useDefaultValues } from '../../lib/use-default-values';

import { useApiMutation } from '@utils/lib/use-api-query';
import {
  getTemplates,
  publishTemplateDraft,
  saveTemplateDraftMapper,
} from '@api/queries';
import { DefaultMapper } from './Mappers';
import { Controller, useForm } from 'react-hook-form';
import { FormTabs } from '../../components/FormTabs';
import { MapperTabsData } from '../../constants';
import { MapperForm } from '@globalTypes/templates.draft';
import { useNotificationContext } from '@components/Notification';
import { useDraftIdStorage } from '../../lib/use-draft-id-storage';
import { useNavigate } from 'react-router-dom';
import { RouteMap } from '@components/Layout/components/types';
import { useQueryClient } from '@tanstack/react-query';

export const MapperStep = () => {
  const { open } = useNotificationContext();
  const { deleteDraftId } = useDraftIdStorage();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mapper: mapperValues } = useDefaultValues();
  const { id, state, mapper } = mapperValues;
  const { mutate, isPending: savePending } = useApiMutation({
    request: saveTemplateDraftMapper,
  });
  const { mutate: publishDraft, isPending: publishPending } = useApiMutation({
    request: publishTemplateDraft,
  });

  const methods = useForm<MapperForm>({
    defaultValues: { id, state, mapper },
  });
  const { control, handleSubmit } = methods;

  const handleSave = handleSubmit(dto => {
    mutate(dto, {
      onSuccess: () => open({ title: 'Success', description: 'Mapper Saved' }),
      onError: error =>
        open({ title: 'Error', description: error.message, variant: 'error' }),
    });
  });

  const handlePublish = () => {
    publishDraft(
      { id },
      {
        onSuccess: async () => {
          deleteDraftId();
          await queryClient.invalidateQueries({
            queryKey: [getTemplates.endpoint],
          });
          open({ title: 'Draft Published' });
          navigate(RouteMap.templates);
        },
      },
    );
  };

  return (
    <section className="flex flex-col gap-[30px]">
      <h4 className="text-xl font-semibold font-inter text-white">
        Add template mapper
      </h4>
      <form onSubmit={handleSave} className="flex flex-col gap-5">
        <Controller
          control={control}
          name="mapper.type"
          render={({ field: { onChange, value } }) => (
            <FormTabs
              currentTab={
                MapperTabsData.find(tab => tab.value === value) ||
                MapperTabsData[0]
              }
              disabled={tabId => tabId !== MapperTabsData[0].id}
              onTabChange={({ value }) => onChange(value)}
              tabs={MapperTabsData}
            />
          )}
        />
        <DefaultMapper mapper={mapperValues} />
        <div className="mt-5 flex flex-col gap-[10px]">
          <FormButton
            type="submit"
            onClick={handleSave}
            disabled={savePending}
            isLoading={savePending}
          >
            Save
          </FormButton>
          <FormButton
            type="button"
            onClick={handlePublish}
            disabled={publishPending}
            isLoading={publishPending}
          >
            Publish
          </FormButton>
          <FormButton type="button" variant="red">
            Delete
          </FormButton>
        </div>
      </form>
    </section>
  );
};
