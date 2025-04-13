import { Control, FieldValues, Path, useController } from 'react-hook-form';

import { FormField } from '../FormField';
import { Select } from '@components/Select';
import { TagLikeButton } from '../TaglikeButton';
import { ButtonVariant } from '../TaglikeButton/styles';

interface Props<T extends FieldValues> {
  fieldLabel?: string;
  selectLabel?: string;
  control: Control<T>;
  name: Path<T>;
  options: Option<string | number>[];
  className?: string;
  rules?: { required: string };
  buttonVariant?: ButtonVariant;
}

export const TaggedSelect = <T extends FieldValues>({
  control,
  fieldLabel,
  selectLabel,
  name,
  options,
  className,
  rules,
  buttonVariant,
}: Props<T>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
  });

  return (
    <FormField className={className} error={error?.message} label={fieldLabel}>
      {() => (
        <div className="flex flex-wrap gap-[10px]">
          <Select
            className="max-w-[137px]  py-[6px]"
            onOptionChange={option =>
              onChange(
                value.includes(String(option.value))
                  ? value.filter(
                      (item: string | number) => item !== option.value,
                    )
                  : [...value, option.value],
              )
            }
            options={options}
            defaultLabel={selectLabel}
            multiple
            withSearch
            variant="formView"
          >
            {(options, setSelectItems) => (
              <>
                {options.map(option => (
                  <TagLikeButton
                    variant={buttonVariant}
                    key={option.value}
                    onClick={() => {
                      const newItems = value.filter(
                        (v: string | number) => v !== option.value,
                      );
                      onChange(newItems);
                      setSelectItems(newItems);
                    }}
                  >
                    {option.label}
                  </TagLikeButton>
                ))}
              </>
            )}
          </Select>
        </div>
      )}
    </FormField>
  );
};
