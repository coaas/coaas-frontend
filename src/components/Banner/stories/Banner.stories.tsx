import { FC } from 'react';

import { Banner } from '../Banner';

export const Default: FC = () => (
  <div className="p-10">
    <Banner
      title="Compute Cloud"
      subtitle="Service provides scalable computing resources
for hosting and testing your projects."
      buttons={[
        { title: 'Create Resource' },
        { title: 'Documentation', variant: 'secondary' },
      ]}
    />
  </div>
);

const meta = {
  title: 'components/Banner',
  component: Default,
};

export default meta;
