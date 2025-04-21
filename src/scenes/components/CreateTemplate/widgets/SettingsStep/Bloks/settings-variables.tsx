import { getTemplateDependencies } from '@api/queries';
import { Input } from '@components/Input';
import { TemplateSettingsForm } from '@globalTypes/templates.draft';
import { ArrayField } from '@scenes/components/CreateTemplate/components/ArrayField';
import { DeleteButton } from '@scenes/components/CreateTemplate/components/ArrayField/delete-button';
import { TaggedInput } from '@scenes/components/CreateTemplate/components/TaggedInput';
import { TaggedSelect } from '@scenes/components/CreateTemplate/components/TaggedSelect';
import {
  numberRule,
  requiredRule,
} from '@scenes/components/CreateTemplate/constants';
import { useApiQuery } from '@utils/lib/use-api-query';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const SettingsVariables = () => {
  const [dependencySearch, setDependencySearch] = useState('');
  const { data: templateDependenciesResponse } = useApiQuery({
    request: getTemplateDependencies,
    payload: { limit: 10, name: dependencySearch },
  });
  const dependenciesOptions =
    templateDependenciesResponse?.templates?.map(({ id, name }) => ({
      label: name,
      value: id,
    })) || [];

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TemplateSettingsForm>();

  return (
    <div className="flex flex-col gap-[23px]">
      <h4 className="text-xl font-semibold font-inter text-white">Settings</h4>
      <ArrayField
        label="Secrets"
        control={control}
        name="settings.secrets"
        btnLabel="Add secret"
        defaultValue={{ name: '' }}
        error={errors.settings?.secrets?.root?.message}
        renderField={(field, remove, index) => {
          const error = errors.settings?.secrets?.[index]?.name?.message;
          return (
            <div
              className="grid grid-cols-[minmax(0,1fr)_min-content] gap-[10px]"
              key={field.id}
            >
              <Input
                className="max-h-9"
                {...register(`settings.secrets.${index}.name`, requiredRule)}
                invalid={!!error}
              />
              <DeleteButton
                onClick={() => remove(index)}
                disabled={index === 0}
              />
              {error && <span className="text-xs text-error">{error}</span>}
            </div>
          );
        }}
      />
      <ArrayField
        label="Configs"
        control={control}
        name="settings.configs"
        btnLabel="Add config"
        defaultValue={{ path: '' }}
        error={errors.settings?.configs?.root?.message}
        renderField={(field, remove, index) => {
          const error = errors.settings?.configs?.[index]?.path?.message;
          return (
            <div
              className="grid grid-cols-[minmax(0,1fr)_min-content] gap-[10px]"
              key={field.id}
            >
              <Input
                className="max-h-9"
                {...register(`settings.configs.${index}.path`, requiredRule)}
                invalid={!!error}
              />
              <DeleteButton
                onClick={() => remove(index)}
                disabled={index === 0}
              />
              {error && <span className="text-xs text-error">{error}</span>}
            </div>
          );
        }}
      />
      <ArrayField
        label="Env variables"
        control={control}
        name="settings.env_vars"
        btnLabel="Add var"
        defaultValue={{ key: '', value: '' }}
        error={errors.settings?.env_vars?.root?.message}
        renderField={(field, remove, index) => {
          const keyError = errors.settings?.env_vars?.[index]?.key?.message;
          const valueError = errors.settings?.env_vars?.[index]?.value?.message;

          return (
            <div
              className="grid grid-cols-[minmax(0,1fr)_min-content_minmax(0,1fr)_min-content] gap-[10px]"
              key={field.id}
            >
              <Input
                className="max-h-9"
                {...register(`settings.env_vars.${index}.key`, requiredRule)}
                invalid={!!keyError}
              />
              <span className="self-center text-white text-sm leading-6">
                =
              </span>
              <Input
                className="max-h-9"
                {...register(`settings.env_vars.${index}.value`, requiredRule)}
                invalid={!!valueError}
              />
              <DeleteButton
                onClick={() => remove(index)}
                disabled={index === 0}
              />
              {keyError && (
                <span className="text-xs text-error">{keyError}</span>
              )}
              {valueError && (
                <span className="text-xs text-error col-start-3">
                  {valueError}
                </span>
              )}
            </div>
          );
        }}
      >
        <label className="cursor-pointer rounded-md w-full max-w-[157px] text-sm flex items-center justify-center bg-stroke-gray text-white font-medium py-1">
          Import .env
          <input type="file" className="hidden" />
        </label>
      </ArrayField>
      <ArrayField
        label="Ports"
        control={control}
        name="settings.ports"
        btnLabel="Add port"
        defaultValue={{ name: '' }}
        error={errors.settings?.ports?.root?.message}
        fieldsWrapperStyles="flex-row flex-wrap"
        renderField={(field, remove, index) => (
          <TaggedInput
            key={field.id}
            error={errors.settings?.ports?.[index]?.name?.message}
            {...register(`settings.ports.${index}.name`, {
              ...requiredRule,
              ...numberRule,
            })}
            onDelete={() => remove(index)}
          />
        )}
      />
      <TaggedSelect
        options={dependenciesOptions}
        onSearch={setDependencySearch}
        control={control}
        name="dependencies"
        fieldLabel="Dependencies"
        selectLabel="Add dependence"
        buttonVariant="blue"
      />
    </div>
  );
};
