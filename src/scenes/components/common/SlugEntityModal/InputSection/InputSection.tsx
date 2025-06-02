import { FC } from 'react';

import { Input } from '@components/Input';

import { InputSectionProps } from './types';

export const InputSection: FC<InputSectionProps> = ({
  label,
  id,
  register,
  isInvalid,
  isSlugCheckingPending,
  isSlugValid,
  onSlugChange,
}) => {
  const localizeId = `input_with_slug_${id}`;

  return (
    <>
      <label
        htmlFor={localizeId}
        className="mb-1 font-medium text-sm text-white"
      >
        {label}
      </label>
      {id === 'slug' ? (
        <>
          <Input
            invalid={isInvalid}
            id={localizeId}
            {...register(id, {
              required: true,
              onChange: e => onSlugChange(e.target.value),
            })}
          />
          {
            // TODO: implement proper placeholders and icons
            isSlugCheckingPending ? (
              <div>Checking...</div>
            ) : (
              typeof isSlugValid === 'boolean' &&
              (isSlugValid ? (
                <div>Valid</div>
              ) : (
                <div>Invalid! This slug is already in use</div>
              ))
            )
          }
        </>
      ) : (
        <Input
          invalid={isInvalid}
          id={localizeId}
          {...register(id, {
            required: true,
          })}
        />
      )}
    </>
  );
};
