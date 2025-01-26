import { GetCardsDataParams } from './types';

export const getCardsData = ({ onBlankClick }: GetCardsDataParams) => [
  {
    onClick: onBlankClick,
    title: 'Create blank project',
    subtitle:
      'Create a blank project to store your files, plan your work, and collaborate on code, among other things.',
  },
];
