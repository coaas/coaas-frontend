import { Input } from '@components/Input';
import { TemplateSettingsForm } from '@globalTypes/templates.draft';
import { FormField } from '@scenes/components/CreateTemplate/components/FormField';
import { useFormContext } from 'react-hook-form';
import { healthCheckFields } from '../constants';
import {
  numberRule,
  requiredRule,
} from '@scenes/components/CreateTemplate/constants';

export const HealthCheck = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TemplateSettingsForm>();

  return (
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
  );
};
