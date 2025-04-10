import { FC, useCallback, useMemo, useState } from 'react';

import { Card, CardType } from '@components/Card';

import { getCardsData } from './getCardsData';
import { Modal } from './components';

export const CreateProject: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onBlankClick = useCallback(
    () => setIsModalOpen(true),
    [setIsModalOpen],
  );

  const cardsData = useMemo(
    () => getCardsData({ onBlankClick }),
    [onBlankClick],
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
                <button onClick={onClick} className={className}>
                  {children}
                </button>
              )}
            />
          ))}
        </ul>
      </section>
    </>
  );
};
