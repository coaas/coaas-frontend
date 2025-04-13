import { Controller, useForm, useWatch } from 'react-hook-form';
import { FormTabs } from '../../components/FormTabs';
import { requiredRule, InfoTabsData, versions } from '../../constants';
import { FormField } from '../../components/FormField';
import { TemplateDockerImage, TemplateType } from '../../types';
import { Input } from '@components/Input';

import { TaggedSelect } from '../../components/TaggedSelect';
import { FileInput } from '../../components/InputFile';

export const DockerImageStep = () => {
  const {
    control,
    formState: { errors },
    register,
  } = useForm<TemplateDockerImage>({
    defaultValues: { type: TemplateType.managed, managed: { versions: [] } },
  });

  const selectedType = useWatch({ control, name: 'type' });

  return (
    <form className="flex flex-col gap-[15px] mt-[25px]">
      <h3 className="text-2xl font-semibold font-inter text-white">
        Template type
      </h3>
      <Controller
        control={control}
        name="type"
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
            error={errors.managed?.url?.message}
            label="DockerHUB Image URL"
            className="flex-col gap-[6px] [&>div>div]:max-w-full"
          >
            {error => (
              <Input
                {...register('managed.url', requiredRule)}
                invalid={Boolean(error)}
              />
            )}
          </FormField>
          <TaggedSelect
            options={versions}
            control={control}
            name="managed.versions"
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
                {...register('custom.dockerfiles.development', requiredRule)}
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
                {...register('custom.dockerfiles.test', requiredRule)}
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
                {...register('custom.dockerfiles.production', requiredRule)}
                placeholder="prod.Dockerfile"
                invalid={Boolean(error)}
              />
            )}
          </FormField>
          <div className="flex flex-col gap-[15px]">
            <h4 className="text-xl font-semibold font-inter text-white">
              Sources
            </h4>
            <FileInput control={control} name="custom.sources_uri" />
          </div>
        </div>
      )}
    </form>
  );
};
