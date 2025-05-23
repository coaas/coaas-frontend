import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from 'react-hook-form';

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
  rules?: Omit<
    RegisterOptions<T>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  buttonVariant?: ButtonVariant;
  onSearch?: (value: string) => void;
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
  onSearch,
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
            defaultValue={value}
            options={options}
            defaultLabel={selectLabel}
            multiple
            withSearch
            onSearchChange={onSearch}
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
