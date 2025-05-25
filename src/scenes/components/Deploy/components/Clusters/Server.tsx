import { useMemo, useState } from 'react';

import {
  ClusterType,
  Instance,
  Server as ServerType,
  Status,
} from '../../model/cluster.types.ts';
import { convertStatus, convertStatusRegion } from '../../model/static.ts';
import { Dollar } from '../../components/icons';
import { Achieve } from '../../components/Common/Achieve.tsx';
import { clsx } from 'clsx';
import { Counter } from '@scenes/components/Deploy/components/Common/Counter.tsx';

export const Server = ({
  status,
  name,
  cpu,
  ram,
  disk,
  id,
  instances,
  renderInstance,
  clusterType,
  type = 'deploy',
  width = '385',
}: {
  renderInstance: (instance: Instance) => React.ReactNode;
  clusterType: ClusterType;
  type?: 'deploy' | 'deployed' | 'deployRules';
  width?: '385' | '285';
} & Pick<
  ServerType,
  'status' | 'name' | 'cpu' | 'ram' | 'disk' | 'id' | 'instances'
>) => {
  const variants = {
    status: {
      [Status.ACTIVE]: 'text-green bg-green/20 border-green',
      [Status.LOADED]: 'text-orange bg-orange/20 border-orange',
      [Status.DIED]: 'text-error bg-error/20 border-error',
      [Status.UNKNOWN]: 'text-gray bg-gray/20 border-gray',
    },
    cluster: {
      [ClusterType.REGIONS]: 'flex gap-2 text-blue-light text-xs',
      [ClusterType.SERVERS]: 'flex flex-col text-blue-light text-lg',
    },
    name: {
      deploy: 'text-blue font-bold text-xl',
      deployRules: 'text-blue font-bold text-xl',
      deployed: 'text-white',
    },
  };

  const usage = useMemo(
    () =>
      instances.reduce(
        (acc, val) => {
          acc.cpu += val.cpu;
          acc.ram += val.ram;
          acc.disk += val.memory;
          return acc;
        },
        { cpu: 0, disk: 0, ram: 0 },
      ),
    [instances],
  );

  const AchieveComp = (
    <Achieve status={status} size={'xxs'}>
      {ClusterType.SERVERS === clusterType
        ? convertStatusRegion[status]
        : convertStatus[status]}
    </Achieve>
  );

  const RegionComp = (
    <Achieve color={'blue'} size={'xxs'}>
      ru
    </Achieve>
  );

  const RightSideComp = {
    deploy: (
      <>
        {AchieveComp}
        {ClusterType.REGIONS === clusterType && <Dollar />}
      </>
    ),
    deployed: (
      <>
        <Dollar />
        {RegionComp}
      </>
    ),
    deployRules: (
      // <Achieve size={'xxs'} color={'gray'}>
      //   user
      // </Achieve>
      <></>
    ),
  }[type];

  const [value, setValue] = useState(0);

  return (
    <div
      className={
        'px-6 py-4 border border-stroke-gray-dark flex flex-col gap-2 rounded-lg group'
      }
      style={{
        width: `${width}px`,
        backgroundImage:
          'linear-gradient(to bottom, rgba(50,53,72,0.7), rgba(50,53,72,0.2))',
      }}
    >
      <div className="flex justify-between">
        <span className="flex items-center justify-start gap-4">
          {ClusterType.REGIONS === clusterType ? (
            <p>{id}</p>
          ) : (
            <p className={clsx(variants.name[type])}>{name}</p>
          )}
          {type === 'deployed' && AchieveComp}
          {type === 'deployRules' && RegionComp}
        </span>
        <div className="flex gap-1 items-center">{RightSideComp}</div>
      </div>
      <div className="flex flex-col relative">
        {ClusterType.REGIONS === clusterType && (
          <p className="text-blue text-xl font-bold">{name}</p>
        )}
        {type === 'deployed' && (
          <p className="text-blue text-xl font-bold">{id}</p>
        )}
        {type === 'deployRules' && (
          <div className="absolute bottom-0 right-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Counter value={value} onChange={setValue} />
            <button>
              <Achieve size={'lg'} color={'red'} rounded={'md'}>
                Delete
              </Achieve>
            </button>
          </div>
        )}
        <div className={variants.cluster[clusterType]}>
          <p>
            CPU: {usage.cpu}/{cpu}
          </p>
          <p>
            RAM: {usage.ram}/{ram} GB
          </p>
          <p>
            Memory: {usage.disk}/{disk} GB
          </p>
        </div>
      </div>
      {clusterType === ClusterType.REGIONS && (
        <div className="flex flex-col gap-4">
          {instances.map(renderInstance)}
        </div>
      )}
    </div>
  );
};
