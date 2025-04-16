import { FormButton } from '../../components/FormButton';
import { useDefaultValues } from '../../lib/use-default-values';

import { useApiMutation } from '@utils/lib/use-api-query';
import { saveTemplateDraftMapper } from '@api/queries';
import { DefaultMapper } from './Mappers';
import { Controller, useForm } from 'react-hook-form';
import { FormTabs } from '../../components/FormTabs';
import { MapperTabsData } from '../../constants';
import { MapperForm } from '@globalTypes/templates.draft';

export const MapperStep = () => {
  const { mapper: mapperValues } = useDefaultValues();
  const { id, state, mapper } = mapperValues;
  const { mutate, isPending: saveProcessing } = useApiMutation({
    request: saveTemplateDraftMapper,
  });
  const methods = useForm<MapperForm>({
    defaultValues: { id, state, mapper },
  });
  const { control, handleSubmit } = methods;

  const handleSave = handleSubmit(dto => {
    mutate(dto);
  });
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
        <DefaultMapper />
        <div className="mt-5 flex flex-col gap-[10px]">
          <FormButton
            type="submit"
            onClick={handleSave}
            disabled={saveProcessing}
            isLoading={saveProcessing}
          >
            Save
          </FormButton>
          <FormButton type="button">Publish</FormButton>
          <FormButton type="button" variant="red">
            Delete
          </FormButton>
        </div>
      </form>
    </section>
  );
};
