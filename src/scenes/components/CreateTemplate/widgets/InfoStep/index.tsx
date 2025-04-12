import { useFormContext } from 'react-hook-form';
import { CreateTemplateForm } from '../../types';
import { FormField } from '../../components/FormField';
import { Input } from '@components/Input';
import { commonValidationRules } from '../../constants';
import { TextArea } from '@components/TextArea';
import { useApiQuery } from '@utils/lib/use-query';
import { getTemplateFilters } from '@api/queries';
import { TaggedSelect } from '../../components/TaggedSelect';

export const InfoStep = () => {
  const { data: filters = { categories: [], languages: [] } } = useApiQuery({
    request: getTemplateFilters,
  });

  const {
    formState: { errors },
    register,
    control,
  } = useFormContext<CreateTemplateForm>();

  return (
    <form className="flex flex-col gap-5">
      <FormField clickable error={errors.info?.name?.message} label="Name">
        {error => (
          <Input
            {...register('info.name', commonValidationRules)}
            invalid={Boolean(error)}
          />
        )}
      </FormField>
      <FormField
        clickable
        error={errors.info?.description?.message}
        label="Description"
      >
        {error => (
          <TextArea
            {...register('info.description', commonValidationRules)}
            error={error}
            className="w-full"
          />
        )}
      </FormField>
      <TaggedSelect
        control={control}
        name="info.categories"
        fieldLabel="Categories"
        selectLabel="Add category"
        options={filters.categories.map(({ key, value }) => ({
          label: key,
          value,
        }))}
      />
      <TaggedSelect
        control={control}
        name="info.languages"
        fieldLabel="Languages"
        selectLabel="Add language"
        options={filters.languages.map(({ key, value }) => ({
          label: key,
          value,
        }))}
      />

      <FormField
        clickable
        error={errors.info?.docs?.message}
        label="Documentation"
        className="flex-col gap-[6px] [&>div>div]:max-w-full"
      >
        {error => (
          <Input
            {...register('info.docs', commonValidationRules)}
            invalid={Boolean(error)}
          />
        )}
      </FormField>
    </form>
  );
};
