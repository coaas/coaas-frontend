import { FC, useCallback, useMemo, useState } from 'react';

import { Card, CardType } from '@components/Card';
import { useNotificationContext } from '@components/Notification';

import { getCardsData } from './getCardsData';
import { Modal } from './components';

export const CreateProject: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { open } = useNotificationContext();

  const onBlankClick = useCallback(
    () => setIsModalOpen(true),
    [setIsModalOpen],
  );

  const onGitImportClick = useCallback(() => {
    open({
      title: 'Feature not available',
      description: 'Import from Git functionality is not implemented yet',
      variant: 'error'
    });
  }, [open]);

  const onDockerComposeImportClick = useCallback(() => {
    open({
      title: 'Feature not available',
      description: 'Import from Docker Compose functionality is not implemented yet',
      variant: 'error'
    });
  }, [open]);

  const cardsData = useMemo(
    () => getCardsData({ 
      onBlankClick, 
      onGitImportClick, 
      onDockerComposeImportClick 
    }),
    [onBlankClick, onGitImportClick, onDockerComposeImportClick],
  );

  return (
    <>
      <Modal isOpen={isModalOpen} onIsOpenChange={setIsModalOpen} />
      <section className="p-10">
        <h2 className="font-semibold text-2xl text-white">
          Create new project
        </h2>
        <ul className="mt-5 flex flex-col gap-4">
          {cardsData.map(({ onClick, title, subtitle }, idx) => (
            <Card
              key={idx}
              type={CardType.simpleInfo}
              props={{
                data: { title, subtitle },
                settings: { shape: 'rect' },
              }}
              Wrapper={({ children, className }) => (
                <div 
                  onClick={onClick} 
                  className={`${className} text-left cursor-pointer`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onClick();
                    }
                  }}
                >
                  {children}
                </div>
              )}
            />
          ))}
        </ul>
      </section>
    </>
  );
};
