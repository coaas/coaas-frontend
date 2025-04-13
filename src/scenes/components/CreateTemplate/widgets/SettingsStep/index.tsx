import { Controller, useForm } from 'react-hook-form';
import { TemplateSettings } from '../../types';
import { ArrayField } from '../../components/ArrayField';
import { Input } from '@components/Input';
import {
  conditionItems,
  dependencies,
  failureActionItems,
  numberRule,
  orderItems,
  ports,
  requiredRule,
} from '../../constants';
import { DeleteButton } from '../../components/ArrayField/delete-button';
import { TaggedSelect } from '../../components/TaggedSelect';
import { FormField } from '../../components/FormField';
import { Select } from '@components/Select';

const healthCheckFields = [
  { label: 'Test', name: 'test', asNumber: false },
  { label: 'Interval', name: 'interval', asNumber: true },
  { label: 'Timeout', name: 'timeout', asNumber: true },
  { label: 'Retries', name: 'retries', asNumber: true },
  { label: 'Start period', name: 'start_period', asNumber: true },
] as const;

const restartPolicyFields = [
  {
    label: 'Condition',
    name: 'condition',
    asNumber: true,
    items: conditionItems,
  },
  { label: 'Delay', name: 'delay', asNumber: true },
  { label: 'Max attempts', name: 'max_attempts', asNumber: true },
  { label: 'Window', name: 'window', asNumber: true },
] as const;

const configItems = [
  { label: 'Parallelism', name: 'parallelism', asNumber: true },
  { label: 'Delay', name: 'delay', asNumber: true },
  { label: 'Monitor', name: 'monitor', asNumber: true },
  { label: 'Max failure ratio', name: 'max_failure_ratio', asNumber: true },
  { label: 'Order', name: 'order', asNumber: true, items: orderItems },
  {
    label: 'Failure action',
    name: 'failure_action',
    asNumber: true,
    items: failureActionItems,
  },
] as const;

export const SettingsStep = () => {
  const {
    control,
    formState: { errors },
    register,
  } = useForm<TemplateSettings>({
    defaultValues: {
      settings: {
        secrets: [{ name: 'DATABASE_URI' }],
        configs: [{ path: '/app/logging.cfg' }],
        env_vars: [{ key: 'DOCS_PATH', value: '/docs' }],
        ports: ['8080'],
        health_check: {
          test: 'curl --fail -s http://localhost:8080/health/check',
          interval: 30,
          timeout: 10,
          retries: 6,
          start_period: 20,
        },
        deployment: {
          restart_policy: {
            condition: 0,
            delay: 0,
            max_attempts: 0,
            window: 0,
          },
          rollback_config: {
            delay: 0,
            failure_action: 0,
            max_failure_ratio: 0,
            monitor: 0,
            order: 0,
            parallelism: 0,
          },
          update_config: {
            delay: 0,
            failure_action: 0,
            max_failure_ratio: 0,
            monitor: 0,
            order: 0,
            parallelism: 0,
          },
        },
      },
      dependencies: [],
    },
  });

  return (
    <>
      <div className="flex flex-col gap-[23px]">
        <h4 className="text-xl font-semibold font-inter text-white">
          Settings
        </h4>
        <ArrayField
          label="Secrets"
          control={control}
          name="settings.secrets"
          btnLabel="Add secret"
          defaultValue={{ name: '' }}
          error={errors.settings?.secrets?.message}
          renderField={(field, remove, index) => (
            <div className="flex gap-[10px]" key={field.id}>
              <Input
                className="max-h-9"
                {...register(`settings.secrets.${index}.name`, requiredRule)}
              />
              <DeleteButton
                onClick={() => remove(index)}
                disabled={index === 0}
              />
            </div>
          )}
        />
        <ArrayField
          label="Configs"
          control={control}
          name="settings.configs"
          btnLabel="Add config"
          defaultValue={{ path: '' }}
          error={errors.settings?.configs?.message}
          renderField={(field, remove, index) => (
            <div className="flex gap-[10px]" key={field.id}>
              <Input
                className="max-h-9"
                {...register(`settings.configs.${index}.path`, requiredRule)}
              />
              <DeleteButton
                onClick={() => remove(index)}
                disabled={index === 0}
              />
            </div>
          )}
        />
        <ArrayField
          label="Env variables"
          control={control}
          name="settings.env_vars"
          btnLabel="Add var"
          defaultValue={{ key: '', value: '' }}
          error={errors.settings?.env_vars?.message}
          renderField={(field, remove, index) => (
            <div className="flex gap-[10px]" key={field.id}>
              <Input
                className="max-h-9"
                {...register(`settings.env_vars.${index}.key`, requiredRule)}
              />
              <span className="self-center text-white text-sm leading-6">
                =
              </span>
              <Input
                className="max-h-9"
                {...register(`settings.env_vars.${index}.value`, requiredRule)}
              />
              <DeleteButton
                onClick={() => remove(index)}
                disabled={index === 0}
              />
            </div>
          )}
        >
          <label className="cursor-pointer rounded-md w-full max-w-[157px] text-sm flex items-center justify-center bg-stroke-gray text-white font-medium py-1">
            Import .env
            <input type="file" className="hidden" />
          </label>
        </ArrayField>
        <TaggedSelect
          options={ports}
          control={control}
          name="settings.ports"
          fieldLabel="Ports"
          selectLabel="Add port"
        />
        <TaggedSelect
          options={dependencies}
          control={control}
          name="dependencies"
          fieldLabel="Dependencies"
          selectLabel="Add dependence"
          buttonVariant="blue"
        />
      </div>
      <div className="flex flex-col gap-[23px] mt-[25px]">
        <h4 className="text-xl font-semibold font-inter text-white">
          Healthcheck
        </h4>
        {healthCheckFields.map(({ label, name, asNumber }, key) => (
          <FormField
            key={key}
            clickable
            error={errors?.settings?.health_check?.[name]?.message}
            label={label}
          >
            {error => (
              <Input
                {...register(`settings.health_check.${name}`, {
                  ...requiredRule,
                  ...(asNumber ? numberRule : undefined),
                  ...(asNumber ? { asNumber: true } : undefined),
                })}
                invalid={Boolean(error)}
              />
            )}
          </FormField>
        ))}
      </div>
      <div className="flex flex-col gap-5 mt-[25px]">
        <h4 className="text-xl font-semibold font-inter text-white">
          Deploy Settings
        </h4>
        <h3 className="text-[18] font-semibold font-inter text-white">
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
                        defaultLabel={defaultItem?.label}
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
                        defaultLabel={defaultItem?.label}
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
                errors?.settings?.deployment?.update_config?.[name]?.message
              }
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
        {configItems.map((field, key) => {
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
                        defaultLabel={defaultItem?.label}
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
    </>
  );
};
