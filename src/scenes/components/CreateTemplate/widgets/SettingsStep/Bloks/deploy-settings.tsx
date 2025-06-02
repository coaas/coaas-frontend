import { Input } from '@components/Input';
import { Select } from '@components/Select/index.tsx';
import { FormField } from '@scenes/components/CreateTemplate/components/FormField';
import { Controller, useFormContext } from 'react-hook-form';
import { configItems, rollbackConfigItems, restartPolicyFields } from '../constants';
import {
  numberRule,
  requiredRule,
} from '@scenes/components/CreateTemplate/constants';
import { TemplateSettingsForm } from '@globalTypes/templates.draft';

export const DeploySettings = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TemplateSettingsForm>();

  return (
    <div className="flex flex-col gap-5 mt-[25px]">
      <h4 className="text-xl text-[22px] font-semibold font-inter text-white">
        Deploy Settings
      </h4>
      <h3 className="text-xl font-semibold font-inter text-white">
        Restart Policy
      </h3>
      {restartPolicyFields.map((field, key) => {
        const { label, name, asNumber } = field;

        return 'items' in field ? (
          <Controller
            key={key}
            control={control}
            rules={requiredRule}
            name={`settings.deployment.restart_policy.${name}`}
            render={({
              field: { onChange, value: fieldValue },
              fieldState,
            }) => {
              const defaultItem = field.items.find(
                ({ value }) => value === fieldValue,
              );

              return (
                <FormField label={label} error={fieldState.error?.message}>
                  {() => (
                    <Select
                      className="[&_label]:m-0"
                      variant="formView"
                      options={field.items}
                      onOptionChange={({ value }) => onChange(value)}
                      withChevron
                      defaultValue={defaultItem ? [defaultItem.value] : []}
                      defaultLabel={defaultItem?.label || 'Select'}
                      multiple={false}
                    />
                  )}
                </FormField>
              );
            }}
          />
        ) : (
          <FormField
            key={key}
            clickable
            error={
              errors?.settings?.deployment?.restart_policy?.[name]?.message
            }
            label={label}
          >
            {error => (
              <Input
                {...register(`settings.deployment.restart_policy.${name}`, {
                  ...requiredRule,
                  ...(asNumber ? numberRule : undefined),
                  ...(asNumber ? { asNumber: true } : undefined),
                })}
                invalid={Boolean(error)}
              />
            )}
          </FormField>
        );
      })}
      <h3 className="text-[18] font-semibold font-inter text-white">
        Update config
      </h3>
      {configItems.map((field, key) => {
        const { label, name, asNumber } = field;

        return 'items' in field ? (
          <Controller
            key={key}
            control={control}
            rules={requiredRule}
            name={`settings.deployment.update_config.${name}`}
            render={({
              field: { onChange, value: fieldValue },
              fieldState,
            }) => {
              const defaultItem = field.items.find(
                ({ value }) => value === fieldValue,
              );

              return (
                <FormField label={label} error={fieldState.error?.message}>
                  {() => (
                    <Select
                      className="[&_label]:m-0"
                      variant="formView"
                      options={field.items}
                      onOptionChange={({ value }) => onChange(value)}
                      withChevron
                      defaultValue={defaultItem ? [defaultItem.value] : []}
                      defaultLabel={defaultItem?.label || 'Select'}
                      multiple={false}
                    />
                  )}
                </FormField>
              );
            }}
          />
        ) : (
          <FormField
            key={key}
            clickable
            error={errors?.settings?.deployment?.update_config?.[name]?.message}
            label={label}
          >
            {error => (
              <Input
                {...register(`settings.deployment.update_config.${name}`, {
                  ...requiredRule,
                  ...(asNumber ? numberRule : undefined),
                  ...(asNumber ? { asNumber: true } : undefined),
                })}
                invalid={Boolean(error)}
              />
            )}
          </FormField>
        );
      })}
      <h3 className="text-[18] font-semibold font-inter text-white">
        Rollback config
      </h3>
      {rollbackConfigItems.map((field, key) => {
        const { label, name, asNumber } = field;

        return 'items' in field ? (
          <Controller
            key={key}
            control={control}
            rules={requiredRule}
            name={`settings.deployment.rollback_config.${name}`}
            render={({
              field: { onChange, value: fieldValue },
              fieldState,
            }) => {
              const defaultItem = field.items.find(
                ({ value }) => value === fieldValue,
              );

              return (
                <FormField label={label} error={fieldState.error?.message}>
                  {() => (
                    <Select
                      className="[&_label]:m-0"
                      variant="formView"
                      options={field.items}
                      onOptionChange={({ value }) => onChange(value)}
                      withChevron
                      defaultValue={defaultItem ? [defaultItem.value] : []}
                      defaultLabel={defaultItem?.label || 'Select'}
                      multiple={false}
                    />
                  )}
                </FormField>
              );
            }}
          />
        ) : (
          <FormField
            key={key}
            clickable
            error={
              errors?.settings?.deployment?.rollback_config?.[name]?.message
            }
            label={label}
          >
            {error => (
              <Input
                {...register(`settings.deployment.rollback_config.${name}`, {
                  ...requiredRule,
                  ...(asNumber ? numberRule : undefined),
                  ...(asNumber ? { asNumber: true } : undefined),
                })}
                invalid={Boolean(error)}
              />
            )}
          </FormField>
        );
      })}
    </div>
  );
};
