import debounce from 'debounce';
import { FC, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Modal as ModalComponent,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from '@components/Modal';
import { Button } from '@components/Button';

import { FIELDS, SLUG_CHECK_DEBOUNCE } from './constants';
import { ModalProps, OnFormSubmit } from './types';
import { FieldId, InputSection } from './InputSection';
import { useCheckSlugMutation } from './useCheckSlugMutation';

export const Modal: FC<ModalProps> = ({
  isOpen,
  onIsOpenChange,
  onFormSubmit,
}) => {
  const { register, handleSubmit, reset, formState, watch } = useForm<
    Record<FieldId, string>
  >({
    criteriaMode: 'all',
    // shouldUseNativeValidation: true,
  });

  const [isSlugValid, setIsSlugValid] = useState<boolean | undefined>(
    undefined,
  );

  const mutation = useCheckSlugMutation({
    onError: () => setIsSlugValid(false),
    onSuccess: () => setIsSlugValid(true),
  });

  const formValues = watch();

  const { errors } = formState;

  const onOpenChange = (newIsOpen: boolean) => {
    onIsOpenChange(newIsOpen);
    // сбрасываем состояние формы при смене isOpen модалки
    reset();
    setIsSlugValid(undefined);
  };

  const onSubmit: OnFormSubmit = data => {
    onFormSubmit(data);
    onOpenChange(false);
  };

  // мемоизация необходима для корректной работы debounce
  const onSlugChange = useMemo(
    () => debounce(mutation.mutate, SLUG_CHECK_DEBOUNCE),
    [mutation.mutate],
  );

  const isSlugCheckingPending = onSlugChange.isPending || mutation.isPending;

  const isSubmitDisabled =
    // если slug не прошел проверку или проверки еще в процессе
    !isSlugValid ||
    isSlugCheckingPending ||
    // если не все поля заполнены
    !Object.keys(formValues).length ||
    Object.values(formValues).some(value => !value);

  return (
    <ModalComponent open={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>New namespace</ModalTitle>
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            {FIELDS.map(({ label, id }) => (
              <div key={id}>
                <InputSection
                  register={register}
                  id={id}
                  label={label}
                  isInvalid={!!errors[id]}
                  isSlugCheckingPending={isSlugCheckingPending}
                  isSlugValid={isSlugValid}
                  onSlugChange={onSlugChange}
                />
              </div>
            ))}
          </div>
          <Button className="mt-5 w-full" disabled={isSubmitDisabled}>
            Create namespace
          </Button>
        </form>
      </ModalContent>
    </ModalComponent>
  );
};
