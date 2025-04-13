import { useForm } from 'react-hook-form';
import { TemplateInfo } from '../../types';
import { FormField } from '../../components/FormField';
import { Input } from '@components/Input';
import { requiredRule } from '../../constants';
import { TextArea } from '@components/TextArea';
import { useApiQuery } from '@utils/lib/use-api-query';
import { getTemplateFilters } from '@api/queries';
import { TaggedSelect } from '../../components/TaggedSelect';
import { TemplateNameField } from './template-name-field';

export const InfoStep = () => {
  const { data: filters = { categories: [], languages: [] } } = useApiQuery({
    request: getTemplateFilters,
  });

  const {
    formState: { errors },
    register,
    control,
    setError,
  } = useForm<TemplateInfo>({
    defaultValues: { name: '', categories: [], languages: [] },
  });

  return (
    <form className="flex flex-col gap-5">
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
          label: key,
          value,
        }))}
      />
      <TaggedSelect
        control={control}
        rules={requiredRule}
        name="languages"
        fieldLabel="Languages"
        selectLabel="Add language"
        options={filters.languages.map(({ key, value }) => ({
          label: key,
          value,
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
    </form>
  );
};
