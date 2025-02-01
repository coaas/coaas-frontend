import { Controller, useForm } from 'react-hook-form';
import { InfoTabs } from '../InfoTabs';
import { commonValidationRules, InfoTabsData, versions } from '../../constants';
import { FormField } from '../FormField';
import { DockerImage } from '../../types';
import { Input } from '@components/Input';
import { TagLikeButton } from '../TaglikeButton';
import { Select } from '@components/Select';
import { TemplateType } from './types';

export const ImageForm = () => {
  const {
    control,
    formState: { errors },
    register,
    watch,
  } = useForm<DockerImage>({
    defaultValues: { type: 0, managed: { versions: [] } },
  });

  const selectedType = watch('type');

  return (
    <form className="flex flex-col gap-[15px] mt-[25px]">
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
      {selectedType === TemplateType.managed && (
        <div className="mt-[10px] flex flex-col gap-[20px]">
          <h4 className="text-xl font-semibold font-inter text-white">
            Image Params
          </h4>
          <FormField
            clickable
            error={errors.managed?.url?.message}
            label="DockerHUB Image URL"
            className="flex-col gap-[6px] [&>div>div]:max-w-full"
          >
            {error => (
              <Input
                {...register('managed.url', commonValidationRules)}
                invalid={Boolean(error)}
              />
            )}
          </FormField>
          <Controller
            name="managed.versions"
            control={control}
            render={({ field: { value, onChange }, fieldState }) => (
              <FormField error={fieldState.error?.message} label="Versions">
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
                      options={versions}
                      defaultLabel="Add version"
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
        </div>
      )}
      {selectedType === TemplateType.custom && (
        <div className="mt-[10px] flex flex-col gap-[20px]">
          <h4 className="text-xl font-semibold font-inter text-white">
            DockerFiles
          </h4>
          <FormField
            clickable
            error={errors.custom?.dockerfiles?.development?.message}
            label="Development"
            hint={
              <p className="max-w-[300px] text-sm">
                Представленные здесь команды описаны минимально (с акцентом на
                читаемость как есть) и включают в себя установку Docker, работу
                с реестрами и репозиториями, контейнерами, образами, сетью,
                Docker Swarm. Ниже представлен перевод шпаргалки в её состоянии
                на 2 сентября с дополнениями из комментариев ниже.
              </p>
            }
          >
            {error => (
              <Input
                {...register(
                  'custom.dockerfiles.development',
                  commonValidationRules,
                )}
                placeholder="Dockerfile"
                invalid={Boolean(error)}
              />
            )}
          </FormField>
          <FormField
            clickable
            error={errors.custom?.dockerfiles?.test?.message}
            label="Test"
          >
            {error => (
              <Input
                {...register('custom.dockerfiles.test', commonValidationRules)}
                placeholder="tests.Dockerfile"
                invalid={Boolean(error)}
              />
            )}
          </FormField>
          <FormField
            clickable
            error={errors.custom?.dockerfiles?.production?.message}
            label="Production"
          >
            {error => (
              <Input
                {...register(
                  'custom.dockerfiles.production',
                  commonValidationRules,
                )}
                placeholder="prod.Dockerfile"
                invalid={Boolean(error)}
              />
            )}
          </FormField>
        </div>
      )}
    </form>
  );
};
