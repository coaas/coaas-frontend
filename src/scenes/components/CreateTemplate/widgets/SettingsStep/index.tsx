import { useForm } from 'react-hook-form';
import { TemplateSettings } from '../../types';
import { ArrayField } from '../../components/ArrayField';
import { Input } from '@components/Input';
import { dependencies, numberRule, ports, requiredRule } from '../../constants';
import { DeleteButton } from '../../components/ArrayField/delete-button';
import { TaggedSelect } from '../../components/TaggedSelect';
import { FormField } from '../../components/FormField';

const healthCheckFields = [
  { label: 'Test', name: 'test', asNumber: false },
  { label: 'Interval', name: 'interval', asNumber: true },
  { label: 'Timeout', name: 'timeout', asNumber: true },
  { label: 'Retries', name: 'retries', asNumber: true },
  { label: 'Start period', name: 'start_period', asNumber: true },
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
    </>
  );
};
