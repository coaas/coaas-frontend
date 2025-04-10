import { FC } from 'react';

import { api } from '@api/constants';
import {
  GetIsSlugExist,
  ResponseData,
  SlugEntityModal,
} from '@scenes/components/common/SlugEntityModal';

import { ModalProps } from './types';

const ENDPOINT = 'NamespacesManager/NamespaceSlugExists';

export const Modal: FC<ModalProps> = ({
  isOpen,
  onIsOpenChange,
  onFormSubmit,
}) => {
  const getIsSlugExist: GetIsSlugExist = slug =>
    api
      .post(ENDPOINT, {
        body: JSON.stringify({ slug }),
      })
      .json<ResponseData>();

  return (
    <SlugEntityModal
      title="New namespace"
      buttonTitle="Create namespace"
      isOpen={isOpen}
      getIsSlugExist={getIsSlugExist}
      onIsOpenChange={onIsOpenChange}
      onFormSubmit={onFormSubmit}
    />
  );
};
