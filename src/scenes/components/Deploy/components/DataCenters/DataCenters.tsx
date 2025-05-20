import { clsx } from 'clsx';

import { Deploy, Plus } from '../icons';
import { Achieve } from '../Common/Achieve.tsx';
import { ServerType } from '../../model/dataCenter.types.ts';
import { convertServerType } from '../../model/static.ts';

type Server = {
  type?: 'card';
  serverType: ServerType;
  name: string;
};

type CardProps = { type?: 'add' } | Server;

export const DataCenter = ({
  type = 'card',
  ...props
}: Readonly<CardProps>) => {
  const base =
    'flex border border-stroke-gray-dark bg-area-dark/70 w-72 rounded-lg py-5 px-6 pb-6';

  if (type === 'add') {
    return (
      <div className={clsx('justify-center items-center cursor-pointer', base)}>
        <Plus />
      </div>
    );
  }

  const { serverType, name } = props as Server;

  return (
    <div className={clsx('flex-col justify-between', base)}>
      <div className="flex justify-between items-start mb-5">
        <Deploy width={30} height={30} />
        <Achieve size={'xxs'} serverType={serverType}>
          {convertServerType[serverType]}
        </Achieve>
      </div>
      <p className="text-xl uppercase font-semibold">{name}</p>
    </div>
  );
};
