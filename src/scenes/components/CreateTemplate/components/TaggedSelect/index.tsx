import { Control, useController } from 'react-hook-form';
import { CreateTemplateForm } from '../../types';
import { FormField } from '../FormField';
import { Select } from '@components/Select';
import { TagLikeButton } from '../TaglikeButton';

interface Props {
  fieldLabel?: string;
  selectLabel?: string;
  control: Control<CreateTemplateForm>;
  name: 'info.categories' | 'info.languages' | 'image.managed.versions';
  options: Option<string | number>[];
  className?: string;
  rules?: { required: string };
}

export const TaggedSelect = ({
  control,
  fieldLabel,
  selectLabel,
  name,
  options,
  className,
  rules,
}: Props) => {
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
                  ? value.filter(item => item !== option.value)
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
                    key={option.value}
                    onClick={() => {
                      const newItems = value.filter(v => v !== option.value);
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
