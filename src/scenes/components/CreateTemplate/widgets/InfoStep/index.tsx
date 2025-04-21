import { useForm } from 'react-hook-form';

import { FormField } from '../../components/FormField';
import { Input } from '@components/Input';
import { requiredRule } from '../../constants';
import { TextArea } from '@components/TextArea';
import { useApiMutation, useApiQuery } from '@utils/lib/use-api-query';
import {
  getTemplateDraft,
  getTemplateFilters,
  saveTemplateDraftInfo,
} from '@api/queries';
import { TaggedSelect } from '../../components/TaggedSelect';

import { TemplateInfoForm } from '@globalTypes/templates.draft';
import { FormButton } from '../../components/FormButton';
import { useQueryClient } from '@tanstack/react-query';
import { useDefaultValues } from '../../lib/use-default-values';
import { useNotificationContext } from '@components/Notification';

export const InfoStep = () => {
  const { open } = useNotificationContext();
  const queryClient = useQueryClient();
  const defaultValues = useDefaultValues().draftInfo;
  const { data: filters = { categories: [], languages: [] } } = useApiQuery({
    request: getTemplateFilters,
  });
  const { mutate, isPending } = useApiMutation({
    request: saveTemplateDraftInfo,
  });

  const {
    formState: { errors },
    register,
    control,
    handleSubmit,
  } = useForm<TemplateInfoForm>({
    defaultValues,
  });

  const onSubmit = handleSubmit(data => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [getTemplateDraft.endpoint],
        });
        open({ title: 'Info Saved' });
      },
    });
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <FormField clickable error={errors.name?.message} label="Name">
        {error => (
          <Input
            {...register('name', requiredRule)}
            invalid={!!error}
            className="w-full"
          />
        )}
      </FormField>
      <FormField
        clickable
        error={errors.description?.message}
        label="Description"
      >
        {error => (
          <TextArea
            {...register('description', requiredRule)}
            error={error}
            className="w-full"
          />
        )}
      </FormField>
      <TaggedSelect
        control={control}
        rules={requiredRule}
        name="categories"
        fieldLabel="Categories"
        selectLabel="Add category"
        options={filters.categories.map(({ key, value }) => ({
          label: value,
          value: key,
        }))}
      />
      <TaggedSelect
        control={control}
        rules={requiredRule}
        name="languages"
        fieldLabel="Languages"
        selectLabel="Add language"
        options={filters.languages.map(({ key, value }) => ({
          label: value,
          value: key,
        }))}
      />
      <FormField
        clickable
        error={errors.docs?.message}
        label="Documentation"
        className="flex-col gap-[6px] [&>div>div]:max-w-full"
      >
        {error => (
          <Input {...register('docs', requiredRule)} invalid={Boolean(error)} />
        )}
      </FormField>
      <FormButton
        disabled={isPending}
        type="submit"
        isLoading={isPending}
        loadingText="Saving..."
      >
        Save
      </FormButton>
    </form>
  );
};
