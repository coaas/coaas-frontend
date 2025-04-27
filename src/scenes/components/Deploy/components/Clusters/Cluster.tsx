import type {
  Server,
  Cluster as ClusterModel,
  Instance,
} from '../../model/types.ts';
import { ClusterType } from '../../model/types.ts';

export const Cluster = ({
  name,
  servers,
  clusterType,
  renderServer,
}: {
  renderServer: (props: Server | Instance) => React.ReactNode;
  clusterType: ClusterType;
  servers: Server[] | Instance[];
} & Pick<ClusterModel, 'name'>) => {
  const variants = {
    strokeType: {
      [ClusterType.SERVERS]: 'white',
      [ClusterType.REGIONS]: '#507EF5',
    },
  };

  return (
    <div
      className="w-full rounded-sm p-8 flex flex-col items-start gap-4"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='${encodeURIComponent(variants.strokeType[clusterType])}' stroke-width='2' stroke-dasharray='54%2c 24' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
      }}
    >
      <h3 className="text-2xl font-bold">{name}</h3>
      <div className="flex flex-wrap gap-4">{servers.map(renderServer)}</div>
    </div>
  );
};
