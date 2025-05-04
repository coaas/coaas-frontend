import { useState } from 'react';
import { useData } from './useData';
import { getParsedData } from './utils';

export const useStaff = () => {
  const { data, ...rest } = useData();

  const { members } = getParsedData(data);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const onModalOpen = () => setIsModalOpen(true);

  return {
    members,
    isModalOpen,
    setIsModalOpen,
    onModalOpen,
    ...rest,
  };
};
