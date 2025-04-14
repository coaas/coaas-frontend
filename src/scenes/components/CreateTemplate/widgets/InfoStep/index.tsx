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
import { TemplateNameField } from './template-name-field';
import { DraftIdService } from '../../lib/draft-id-service';
import { StateType, TemplateInfo } from '@globalTypes/templates.draft';
import { FormButton } from '../../components/FormButton';

export const InfoStep = () => {
  const storedDraftId = DraftIdService.getId();

  const { data: draftResponse } = useApiQuery({
    request: getTemplateDraft,
    payload: { id: storedDraftId },
  });

  const defaultValues = draftResponse?.info;

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
    setError,
    handleSubmit,
  } = useForm<TemplateInfo>({
    defaultValues: defaultValues || {
      id: storedDraftId || '',
      state: StateType.draft,
      name: '',
      categories: [],
      languages: [],
    },
  });

  const onSubmit = handleSubmit(data => {
    //Захендлить все ошибки, , отобразить нотификейшены.
    mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <TemplateNameField
        control={control}
        name="name"
        onError={message => setError('name', { message })}
      />
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
