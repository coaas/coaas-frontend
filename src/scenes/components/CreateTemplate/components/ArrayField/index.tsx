import {
  ArrayPath,
  Control,
  FieldArray,
  FieldArrayWithId,
  FieldValues,
  useFieldArray,
  UseFieldArrayRemove,
} from 'react-hook-form';
import { FormField } from '../FormField';
import { ReactNode } from 'react';
import { cn } from '@utils/styles';

interface ArrayFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: ArrayPath<T>;
  label?: string;
  error?: string;
  btnLabel: string;
  renderField: (
    field: FieldArrayWithId<T, ArrayPath<T>, 'id'>,
    remove: UseFieldArrayRemove,
    index: number,
  ) => ReactNode;
  defaultValue: FieldArray<T, ArrayPath<T>> | FieldArray<T, ArrayPath<T>>[];
  children?: ReactNode;
  fieldsWrapperStyles?: string;
  required?: boolean;
}

export const ArrayField = <T extends FieldValues>({
  control,
  name,
  renderField,
  label,
  defaultValue,
  btnLabel,
  error,
  children,
  fieldsWrapperStyles,
  required = false,
}: ArrayFieldProps<T>) => {
  const { append, fields, remove } = useFieldArray({
    name: name,
    control,
    rules: required ? {
      validate: fields => fields.length > 0 || 'required at least one entity',
    } : undefined,
  });

  return (
    <FormField error={error} label={label}>
      {() => (
        <div className="flex flex-col gap-[10px]">
          <div className={cn('flex flex-col gap-[10px]', fieldsWrapperStyles)}>
            {fields.map((field, index) => renderField(field, remove, index))}
          </div>
          <div className="flex gap-[10px]">
            <button
              type="button"
              className="rounded-md w-full max-w-[157px] text-sm flex items-center justify-center bg-stroke-gray text-white font-medium py-1"
              onClick={() => append(defaultValue)}
            >
              {btnLabel}
            </button>
            {children}
          </div>
        </div>
      )}
    </FormField>
  );
};
