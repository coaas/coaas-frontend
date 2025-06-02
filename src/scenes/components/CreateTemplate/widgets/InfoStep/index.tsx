import { useForm, useController } from 'react-hook-form';

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

import { TemplateInfoForm } from '@globalTypes/templates.draft';
import { FormButton } from '../../components/FormButton';
import { useQueryClient } from '@tanstack/react-query';
import { useDraftContext } from '../../lib/use-draft-context';
import { useNotificationContext } from '@components/Notification';
import { TagLikeButton } from '../../components/TaglikeButton';

export const InfoStep = () => {
  const { open } = useNotificationContext();
  const queryClient = useQueryClient();
  const { defaultValues } = useDraftContext();
  const defaultInfoValues = defaultValues.draftInfo;

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
    defaultValues: defaultInfoValues,
  });

  const {
    field: { value: categoriesValue, onChange: onCategoriesChange },
  } = useController({
    control,
    name: 'categories',
  });

  const {
    field: { value: languagesValue, onChange: onLanguagesChange },
  } = useController({
    control,
    name: 'languages',
  });

  const selectedCategories = Array.isArray(categoriesValue)
    ? categoriesValue
    : [];
  const selectedLanguages = Array.isArray(languagesValue) ? languagesValue : [];

  const addCategory = (categoryKey: string) => {
    if (!selectedCategories.includes(categoryKey)) {
      onCategoriesChange([...selectedCategories, categoryKey]);
    }
  };

  const removeCategory = (categoryKey: string) => {
    onCategoriesChange(selectedCategories.filter(key => key !== categoryKey));
  };

  const addLanguage = (languageKey: string) => {
    if (!selectedLanguages.includes(languageKey)) {
      onLanguagesChange([...selectedLanguages, languageKey]);
    }
  };

  const removeLanguage = (languageKey: string) => {
    onLanguagesChange(selectedLanguages.filter(key => key !== languageKey));
  };

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

  const hasFilters =
    filters.categories.length > 0 && filters.languages.length > 0;

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
      {hasFilters && (
        <>
          <FormField error={errors.categories?.message} label="Categories">
            <div className="flex flex-col gap-3">
              <select
                className="max-w-[200px] px-3 py-2 border border-stroke-gray-dark bg-stroke-gray rounded-md text-white"
                onChange={e => {
                  if (e.target.value) {
                    addCategory(e.target.value);
                    e.target.value = '';
                  }
                }}
                defaultValue=""
              >
                <option value="">Add category</option>
                {filters.categories
                  .filter(cat => !selectedCategories.includes(cat.key))
                  .map(cat => (
                    <option key={cat.key} value={cat.key}>
                      {cat.value}
                    </option>
                  ))}
              </select>
              {selectedCategories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {filters.categories
                    .filter(cat => selectedCategories.includes(cat.key))
                    .map(cat => (
                      <TagLikeButton
                        key={cat.key}
                        onClick={() => removeCategory(cat.key)}
                      >
                        {cat.value}
                      </TagLikeButton>
                    ))}
                </div>
              )}
            </div>
          </FormField>

          <FormField error={errors.languages?.message} label="Languages">
            <div className="flex flex-col gap-3">
              <select
                className="max-w-[200px] px-3 py-2 border border-stroke-gray-dark bg-stroke-gray rounded-md text-white"
                onChange={e => {
                  if (e.target.value) {
                    addLanguage(e.target.value);
                    e.target.value = '';
                  }
                }}
                defaultValue=""
              >
                <option value="">Add language</option>
                {filters.languages
                  .filter(lang => !selectedLanguages.includes(lang.key))
                  .map(lang => (
                    <option key={lang.key} value={lang.key}>
                      {lang.value}
                    </option>
                  ))}
              </select>
              {selectedLanguages.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {filters.languages
                    .filter(lang => selectedLanguages.includes(lang.key))
                    .map(lang => (
                      <TagLikeButton
                        key={lang.key}
                        onClick={() => removeLanguage(lang.key)}
                      >
                        {lang.value}
                      </TagLikeButton>
                    ))}
                </div>
              )}
            </div>
          </FormField>
        </>
      )}
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
