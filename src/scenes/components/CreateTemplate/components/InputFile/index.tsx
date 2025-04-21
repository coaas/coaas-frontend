import { useMergeRefs } from '@floating-ui/react';
import React, { useRef, ComponentProps } from 'react';
import { useController, Control, FieldValues, Path } from 'react-hook-form';
import { requiredRule } from '../../constants';
import { useApiMutation } from '@utils/lib/use-api-query';
import { uploadTemplatesHubArchive } from '@api/queries';
import { cn } from '@utils/styles';

interface FileInputProps<T extends FieldValues>
  extends Omit<ComponentProps<'input'>, 'name'> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export const FileInput = <T extends FieldValues>({
  control,
  name,
  label,
  ...restProps
}: FileInputProps<T>) => {
  const { data, mutate, error, isPending, reset } = useApiMutation({
    request: uploadTemplatesHubArchive,
    options: { onSuccess: ({ url }) => onChange(url) },
  });
  const inputRef = useRef<null | HTMLInputElement>(null);

  const {
    field: { onChange, onBlur, ref: fieldRef },
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
    rules: requiredRule,
  });

  const mergedRefs = useMergeRefs([fieldRef, inputRef]);

  const handleFileChange = async (file: File) => {
    const chunkSize = 1024 * 1024;
    const totalChunks = Math.ceil(file.size / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      const reader = new FileReader();

      reader.readAsDataURL(chunk);

      reader.onload = async () => {
        const base64Chunk = reader.result?.toString().split(',')[1] || '';

        const payload = {
          state: 0,
          id: file.name,
          filename: file.name,
          chunk: base64Chunk,
        };

        mutate(payload);
      };
    }
  };

  const handleRemoveFile = () => {
    reset();
    onChange(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="mb-4 h-[105px]">
      {label && (
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
        className={cn(
          'mt-1 border-2 border-dashed border-stroke-gray-dark rounded-md p-4 cursor-pointer h-full flex items-center justify-center',
          { 'border-error': error?.message || fieldError?.message },
        )}
      >
        {isPending && <p className="text-blue-500 text-sm">uploading...</p>}
        {error && <p className="text-error text-sm">{error.message}</p>}
        {data?.url && (
          <div className="mt-2">
            <p className="text-green-500 text-sm">{data?.url}</p>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="ml-2 text-red-500 text-sm underline"
            >
              delete
            </button>
          </div>
        )}
        {!data?.url && !error && (
          <p className="text-gray text-lg">Drop archive or click to upload</p>
        )}
        <input
          type="file"
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) {
              handleFileChange(file);
            }
          }}
          onBlur={onBlur}
          {...restProps}
          ref={mergedRefs}
          className="hidden"
        />
      </div>
      {fieldError?.message && (
        <span className="text-error text-sm">{fieldError.message}</span>
      )}
    </div>
  );
};
