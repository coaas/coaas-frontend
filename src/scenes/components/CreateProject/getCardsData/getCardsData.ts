import { GetCardsDataParams } from './types';

export const getCardsData = ({ 
  onBlankClick, 
  onGitImportClick, 
  onDockerComposeImportClick 
}: GetCardsDataParams) => [
  {
    onClick: onBlankClick,
    title: 'Create blank project',
    subtitle:
      'Create a blank project to store your files, plan your work, and collaborate on code, among other things.',
  },
  {
    onClick: onGitImportClick || (() => {}),
    title: 'Import from Git',
    subtitle:
      'Import an existing project from a Git repository to get started quickly with your codebase.',
  },
  {
    onClick: onDockerComposeImportClick || (() => {}),
    title: 'Import from Docker Compose',
    subtitle:
      'Import a project configuration from a Docker Compose file to set up your multi-container application.',
  },
];
