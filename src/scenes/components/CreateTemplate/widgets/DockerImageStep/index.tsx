import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { FormTabs } from '../../components/FormTabs';
import { commonValidationRules, InfoTabsData, versions } from '../../constants';
import { FormField } from '../../components/FormField';
import { CreateTemplateForm, TemplateType } from '../../types';
import { Input } from '@components/Input';

import { TaggedSelect } from '../../components/TaggedSelect';

export const DockerImageStep = () => {
  const {
    control,
    formState: { errors },
    register,
  } = useFormContext<CreateTemplateForm>();

  const selectedType = useWatch({ control, name: 'image.type' });

  return (
    <form className="flex flex-col gap-[15px] mt-[25px]">
      <h3 className="text-2xl font-semibold font-inter text-white">
        Template type
      </h3>
      <Controller
        control={control}
        name="image.type"
        render={({ field: { onChange, value } }) => (
          <FormTabs
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
            error={errors.image?.managed?.url?.message}
            label="DockerHUB Image URL"
            className="flex-col gap-[6px] [&>div>div]:max-w-full"
          >
            {error => (
              <Input
                {...register('image.managed.url', commonValidationRules)}
                invalid={Boolean(error)}
              />
            )}
          </FormField>
          <TaggedSelect
            options={versions}
            control={control}
            name="image.managed.versions"
            fieldLabel="Versions"
            selectLabel="Add version"
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
            error={errors.image?.custom?.dockerfiles?.development?.message}
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
                  'image.custom.dockerfiles.development',
                  commonValidationRules,
                )}
                placeholder="Dockerfile"
                invalid={Boolean(error)}
              />
            )}
          </FormField>
          <FormField
            clickable
            error={errors.image?.custom?.dockerfiles?.test?.message}
            label="Test"
          >
            {error => (
              <Input
                {...register(
                  'image.custom.dockerfiles.test',
                  commonValidationRules,
                )}
                placeholder="tests.Dockerfile"
                invalid={Boolean(error)}
              />
            )}
          </FormField>
          <FormField
            clickable
            error={errors.image?.custom?.dockerfiles?.production?.message}
            label="Production"
          >
            {error => (
              <Input
                {...register(
                  'image.custom.dockerfiles.production',
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
