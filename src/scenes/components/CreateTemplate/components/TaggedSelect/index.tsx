import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  useController,
} from 'react-hook-form';

import { FormField } from '../FormField';
import { Select } from '@components/Select/index.tsx';
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

  const selectedValues: (string | number)[] = Array.isArray(value) ? value : [];

  const handleOptionChange = (option: Option<string | number>) => {
    const optionValue = option.value;
    const isSelected = selectedValues.includes(optionValue);

    if (isSelected) {
      const newValues = selectedValues.filter(
        (item: string | number) => item !== optionValue,
      );
      onChange(newValues);
    } else {
      const newValues = [...selectedValues, optionValue];
      onChange(newValues);
    }
  };

  const handleTagRemove = (optionValue: string | number) => {
    const newValues = selectedValues.filter(
      (item: string | number) => item !== optionValue,
    );
    onChange(newValues);
  };

  return (
    <FormField className={className} error={error?.message} label={fieldLabel}>
      <div className="flex flex-col gap-[10px]">
        <Select
          className="max-w-[137px] py-[6px]"
          onOptionChange={handleOptionChange}
          defaultValue={selectedValues}
          options={options}
          defaultLabel={selectLabel}
          multiple={true}
          withSearch
          onSearchChange={onSearch}
          variant="formView"
        />
        {selectedValues.length > 0 && (
          <div className="flex flex-wrap gap-[10px]">
            {options
              .filter(option => selectedValues.includes(option.value))
              .map(option => (
                <TagLikeButton
                  variant={buttonVariant}
                  key={option.value}
                  onClick={() => handleTagRemove(option.value)}
                >
                  {option.label}
                </TagLikeButton>
              ))}
          </div>
        )}
      </div>
    </FormField>
  );
};
