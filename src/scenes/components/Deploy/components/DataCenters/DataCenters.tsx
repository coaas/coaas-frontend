import { clsx } from 'clsx';

import { Deploy, Plus } from '../icons';
import { Achieve } from '../Common/Achieve.tsx';
import { ServerType } from '../../model/dataCenter.types.ts';
import { convertServerType } from '../../model/static.ts';

type CommonProps = {
  w?: '72' | '[385px]';
};

type Server = {
  type?: 'card';
  serverType: ServerType;
  name: string;
};
type Add = { type?: 'add'; onAdd: () => void };

type CardProps = (Add | Server) & CommonProps;

export const DataCenter = ({
  type = 'card',
  w = '72',
  ...props
}: Readonly<CardProps>) => {
  const width = w === '72' ? 'w-72' : 'w-[385px]';
  const base = `flex border border-stroke-gray-dark bg-area-dark/70 ${width} rounded-lg py-5 px-6 pb-6 h-36`;

  if (type === 'add') {
    const { onAdd } = props as Add;
    return (
      <div
        className={clsx('justify-center items-center cursor-pointer', base)}
        onClick={onAdd}
      >
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
