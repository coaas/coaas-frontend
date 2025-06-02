import { Controller, useForm, useWatch } from 'react-hook-form';
import { FormTabs } from '../../components/FormTabs';
import { requiredRule, InfoTabsData } from '../../constants';
import { FormField } from '../../components/FormField';
import { Input } from '@components/Input';
import { FileInput } from '../../components/InputFile';
import {
  TemplateDockerImageForm,
  TemplateType,
} from '@globalTypes/templates.draft';

import { useApiMutation } from '@utils/lib/use-api-query';
import { getTemplateDraft, saveTemplateDraftImage } from '@api/queries';
import { FormButton } from '../../components/FormButton';
import { ArrayField } from '../../components/ArrayField';
import { TaggedInput } from '../../components/TaggedInput';
import { useQueryClient } from '@tanstack/react-query';
import { useDraftContext } from '../../lib/use-draft-context';
import { useNotificationContext } from '@components/Notification';

export const DockerImageStep = () => {
  const { open } = useNotificationContext();
  const queryClient = useQueryClient();
  const { defaultValues } = useDraftContext();
  const defaultImageValues = defaultValues.dockerImage;

  const { mutate, isPending } = useApiMutation({
    request: saveTemplateDraftImage,
  });

  const {
    formState: { errors },
    register,
    control,
    handleSubmit,
    watch,
    setValue,
  } = useForm<TemplateDockerImageForm>({
    defaultValues: defaultImageValues,
  });

  const onSubmit = handleSubmit(data => {
    const { managed, ...restData } = data;

    mutate(
      {
        ...restData,
        managed: {
          url: managed?.url || '',
          versions: (managed?.versions || []).map(({ name }) => name),
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [getTemplateDraft.endpoint],
          });
          open({ title: 'Image saved' });
        },
      },
    );
  });

  const selectedType = useWatch({ control, name: 'type' });

  const handleTabChange = ({ value }: { value: TemplateType }) => {
    if (value === TemplateType.custom) {
      open({ 
        title: 'Функциональность недоступна', 
        description: 'Custom шаблоны пока не поддерживаются',
        variant: 'error' 
      });
      return;
    }
    // Если это Managed тип, то устанавливаем значение
    setValue('type', value);
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-[15px] mt-[25px]">
      <h3 className="text-2xl font-semibold font-inter text-white">
        Template type
      </h3>
      <Controller
        control={control}
        name="type"
        render={({ field: { value } }) => (
          <FormTabs
            currentTab={
              InfoTabsData.find(tab => tab.value === value) || InfoTabsData[0]
            }
            onTabChange={handleTabChange}
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
          <ArrayField
            label="Versions"
            control={control}
            name="managed.versions"
            btnLabel="Add version"
            defaultValue={{ name: '' }}
            error={errors.managed?.root?.message}
            fieldsWrapperStyles="flex-row flex-wrap"
            required={true}
            renderField={(field, remove, index) => (
              <TaggedInput
                key={field.id}
                error={errors.managed?.versions?.[index]?.name?.message}
                {...register(`managed.versions.${index}.name`, {
                  ...requiredRule,
                })}
                onDelete={() => remove(index)}
              />
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
