import type {
  Cluster as ClusterModel,
  Instance,
  Server,
} from '../../model/cluster.types.ts';
import { ClusterType } from '../../model/cluster.types.ts';
import { Dotted } from '../Common/Dotted.tsx';
import { Heading } from '../Common/Heading.tsx';
import { DataCenter } from '../DataCenters/DataCenters.tsx';

export const Cluster = ({
  name,
  servers,
  clusterType,
  renderServer,
  view,
}: {
  renderServer: (props: Server | Instance) => React.ReactNode;
  clusterType: ClusterType;
  servers: Server[] | Instance[];
  view: 'deploy' | 'dataCenter';
} & Pick<ClusterModel, 'name'>) => {
  return (
    <Dotted type={clusterType}>
      <Heading>{name}</Heading>
      <div className="flex flex-wrap gap-4">
        {servers.map(renderServer)}
        {view === 'dataCenter' && <DataCenter type={'add'} />}
      </div>
    </Dotted>
  );
};
