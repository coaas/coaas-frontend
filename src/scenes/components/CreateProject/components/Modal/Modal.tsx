import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { api } from '@api/constants';
import {
  GetIsSlugExist,
  ResponseData,
  SlugEntityModal,
} from '@scenes/components/common/SlugEntityModal';

import { ModalProps } from './types';
import { useCreateProject } from './useCreateProject';

const ENDPOINT = 'ProjectsManager/ProjectSlugExists';

export const Modal: FC<ModalProps> = ({ isOpen, onIsOpenChange }) => {
  const { namespace_slug: namespaceSlug } = useParams();

  const mutation = useCreateProject({
    namespaceSlug,
    onError: () => console.log('error'),
    onSuccess: newProject => {
      console.log('newProject', newProject);
    },
  });

  const getIsSlugExist: GetIsSlugExist = slug =>
    api
      .post(ENDPOINT, {
        body: JSON.stringify({ slug }),
        headers: {
          'x-namespace-slug': namespaceSlug,
        },
      })
      .json<ResponseData>();

  return (
    <SlugEntityModal
      title="Create blank project"
      buttonTitle="Create project"
      isOpen={isOpen}
      getIsSlugExist={getIsSlugExist}
      onIsOpenChange={onIsOpenChange}
      onFormSubmit={mutation.mutate}
    />
  );
};
