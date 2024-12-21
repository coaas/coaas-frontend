import { FC } from 'react';

import { Banner } from '../Banner';

export const Default: FC = () => (
  <div className="p-10">
    <Banner
      title="Compute Cloud"
      subtitle="Сервис предоставляет масштабируемые вычислительные мощности
для размещения и тестирования ваших проектов."
      buttons={[
        { title: 'Создать ресурс' },
        { title: 'Документация', variant: 'secondary' },
      ]}
    />
  </div>
);

const meta = {
  title: 'components/Banner',
  component: Default,
};

export default meta;
