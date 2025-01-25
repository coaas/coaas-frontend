import { Controller, useForm } from 'react-hook-form';
import { Info } from '../../types';
import { FormField } from '../FormField';
import { Input } from '@components/Input';
import { commonValidationRules, InfoTabsData } from '../../constants';
import { TextArea } from '@components/TextArea';
import { Select } from '@components/Select';
import { useQuery } from '@utils/lib/use-query';
import { getTemplateFilters } from '@api/queries';

import { TagLikeButton } from '../TaglikeButton';
import { InfoTabs } from '../InfoTabs';

export const InfoForm = () => {
  const { data: filters = { categories: [], languages: [] } } = useQuery({
    query: getTemplateFilters,
  });

  const {
    formState: { errors },
    register,
    control,
  } = useForm<Info>({
    defaultValues: { categories: [], languages: [], type: 0 },
  });

  return (
    <form className="flex flex-col gap-5">
      <FormField clickable error={errors.name?.message} label="Name">
        {error => (
          <Input
            {...register('name', commonValidationRules)}
            invalid={Boolean(error)}
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
            {...register('description', commonValidationRules)}
            error={error}
            className="w-full"
          />
        )}
      </FormField>
      <Controller
        name="categories"
        control={control}
        render={({ field: { value, onChange }, fieldState }) => (
          <FormField error={fieldState.error?.message} label="Categories">
            {() => (
              <div className="flex flex-wrap gap-[10px]">
                <Select
                  className="max-w-[137px]  py-[6px]"
                  onOptionChange={option =>
                    onChange(
                      value.includes(option.value)
                        ? value.filter(item => item !== option.value)
                        : [...value, option.value],
                    )
                  }
                  options={filters.categories.map(({ key, value }) => ({
                    label: key,
                    value,
                  }))}
                  defaultLabel="Add category"
                  multiple
                  withSearch
                  variant="formView"
                >
                  {(options, setSelectItems) => (
                    <>
                      {options.map(option => (
                        <TagLikeButton
                          key={option.value}
                          onClick={() => {
                            const newItems = value.filter(
                              v => v !== option.value,
                            );
                            onChange(newItems);
                            setSelectItems(newItems);
                          }}
                        >
                          {option.label}
                        </TagLikeButton>
                      ))}
                    </>
                  )}
                </Select>
              </div>
            )}
          </FormField>
        )}
      />
      <Controller
        name="languages"
        control={control}
        render={({ field: { value, onChange }, fieldState }) => (
          <FormField error={fieldState.error?.message} label="Languages">
            {() => (
              <div className="flex flex-wrap gap-[10px]">
                <Select
                  className="max-w-[137px] py-[6px]"
                  onOptionChange={option =>
                    onChange(
                      value.includes(option.value)
                        ? value.filter(item => item !== option.value)
                        : [...value, option.value],
                    )
                  }
                  options={filters.languages.map(({ key, value }) => ({
                    label: key,
                    value,
                  }))}
                  defaultLabel="Add language"
                  multiple
                  withSearch
                  variant="formView"
                >
                  {(options, setSelectItems) => (
                    <>
                      {options.map(option => (
                        <TagLikeButton
                          onClick={() => {
                            const newItems = value.filter(
                              v => v !== option.value,
                            );
                            onChange(newItems);
                            setSelectItems(newItems);
                          }}
                        >
                          {option.label}
                        </TagLikeButton>
                      ))}
                    </>
                  )}
                </Select>
              </div>
            )}
          </FormField>
        )}
      />
      <div className="flex flex-col gap-[15px]">
        <h3 className="text-2xl font-semibold font-inter text-white">
          Template type
        </h3>
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, value } }) => (
            <InfoTabs
              currentTab={
                InfoTabsData.find(tab => tab.value === value) || InfoTabsData[0]
              }
              onTabChange={({ value }) => onChange(value)}
              tabs={InfoTabsData}
            />
          )}
        />
        <FormField
          clickable
          error={errors.name?.message}
          label="DockerHUB Image URL"
          className="flex-col gap-[6px] [&>div>div]:max-w-full"
        >
          {error => (
            <Input
              {...register('docs', commonValidationRules)}
              invalid={Boolean(error)}
            />
          )}
        </FormField>
      </div>
    </form>
  );
};
