import { FormButton } from '../../components/FormButton';

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
import { MapperForm, MapperType } from '@globalTypes/templates.draft';
import { useNotificationContext } from '@components/Notification';
import { useDraftContext } from '../../lib/use-draft-context';
import { useNavigate } from 'react-router-dom';
import { RouteMap } from '@components/Layout/components/types';
import { useQueryClient } from '@tanstack/react-query';

export const MapperStep = () => {
  const { open } = useNotificationContext();
  const { deleteDraftId, defaultValues, draftId, isUrlBased } =
    useDraftContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mapper: mapperValues } = defaultValues;
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
  const { control, handleSubmit, setValue } = methods;

  const handleSave = handleSubmit(dto => {
    mutate(dto, {
      onSuccess: () => open({ title: 'Success', description: 'Mapper Saved' }),
      onError: error =>
        open({ title: 'Error', description: error.message, variant: 'error' }),
    });
  });

  const handlePublish = () => {
    publishDraft(
      { id: draftId || id },
      {
        onSuccess: async () => {
          deleteDraftId();
          await queryClient.invalidateQueries({
            queryKey: [getTemplates.endpoint],
          });
          open({ title: 'Draft Published' });
          navigate(
            isUrlBased ? RouteMap.currentUserTemplates : RouteMap.templates,
          );
        },
      },
    );
  };

  const handleTabChange = (tab: {
    id: string;
    label: string;
    value: MapperType;
  }) => {
    // Check if this is Custom (id: '1') or External (id: '2')
    if (tab.id === '1' || tab.id === '2') {
      const tabName = tab.id === '1' ? 'Custom' : 'External';
      open({
        title: 'Functionality unavailable',
        description: `${tabName} mapper is not yet supported`,
        variant: 'error',
      });
      return;
    }
    // If this is Managed type, then set the value
    setValue('mapper.type', tab.value);
  };

  return (
    <>
      <Controller
        control={control}
        name="mapper.type"
        render={({ field: { value } }) => (
          <FormTabs
            currentTab={
              MapperTabsData.find(tab => tab.value === value) ||
              MapperTabsData[0]
            }
            onTabChange={handleTabChange}
            tabs={MapperTabsData}
          />
        )}
      />
      <DefaultMapper mapper={mapperValues} />
      <div className="flex gap-3 mt-5">
        <FormButton
          disabled={savePending}
          onClick={handleSave}
          isLoading={savePending}
          loadingText="Saving..."
        >
          Save
        </FormButton>
        <FormButton
          disabled={publishPending}
          onClick={handlePublish}
          isLoading={publishPending}
          loadingText="Publishing..."
        >
          Publish
        </FormButton>
      </div>
    </>
  );
};
