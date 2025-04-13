import { checkTemplatesNameExistence } from '@api/queries';
import { useApiMutation } from '@utils/lib/use-api-query';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { FormField } from '../../components/FormField';
import { Input } from '@components/Input';
import debounce from 'debounce';
import { ChangeEvent, useCallback } from 'react';
import { requiredRule } from '../../constants';
import { cn } from '@utils/styles';
import { CheckTemplateNameDto } from '@globalTypes/templates';

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  onError: (msg: string) => void;
}

export const TemplateNameField = <T extends FieldValues>({
  control,
  name,
  onError,
}: Props<T>) => {
  const {
    field: { onChange, ...fieldProps },
    fieldState,
  } = useController({ control, name, rules: requiredRule });

  const { mutate, isPending } = useApiMutation({
    request: checkTemplatesNameExistence,
    options: { onError: error => onError(error.message) },
  });

  const debouncedMutate = useCallback(
    (dto: CheckTemplateNameDto) => debounce(() => mutate(dto), 500),
    [mutate],
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(value);
    if (value.length > 3) {
      debouncedMutate({ limit: 0, name: value });
    }
  };

  return (
    <FormField clickable error={fieldState.error?.message} label="Name">
      {error => (
        <div className="flex flex-col gap-[5px]">
          <Input
            {...fieldProps}
            onChange={handleInputChange}
            invalid={Boolean(error)}
            className={cn({ 'animate-pulse': isPending })}
          />

          <div className="flex gap-1 h-5">
            {isPending && (
              <>
                <span className="rounded-full border-blue border-2 border-b-0 size-5 animate-spin" />
                <p className=" text-white text-sm">loading...</p>
              </>
            )}
          </div>
        </div>
      )}
    </FormField>
  );
};
