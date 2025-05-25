import type {
  Cluster as ClusterModel,
  Instance,
  Server,
} from '../../model/cluster.types.ts';
import { ClusterType } from '../../model/cluster.types.ts';
import { FixedRule } from '../../model/deployed.types.ts';
import { Dotted } from '../Common/Dotted.tsx';
import { Heading } from '../Common/Heading.tsx';

type BaseProps<T extends object> = {
  clusterType: ClusterType;
  AddView?: React.ReactNode;
  isHidden?: boolean;
} & Pick<ClusterModel, 'name'> &
  T;

// export function Cluster(
//   props: BaseProps<{
//     renderServer: (props: Server | Instance) => React.ReactNode;
//     servers: Server[] | Instance[];
//   }>,
// ): React.ReactElement;
// export function Cluster(
//   props: BaseProps<{
//     renderServer: (props: FixedRule) => React.ReactNode;
//     servers: FixedRule[];
//   }>,
// ): React.ReactElement;
export function Cluster({
  name,
  servers,
  clusterType,
  renderServer,
  AddView,
  isHidden,
}: BaseProps<{
  renderServer: (props: Server | Instance | FixedRule) => React.ReactNode;
  servers: Server[] | Instance[] | FixedRule[];
}>) {
  return (
    <Dotted type={clusterType} isHidden={isHidden}>
      {!isHidden && <Heading>{name}</Heading>}
      <div className="flex flex-wrap gap-4 w-full">
        {servers.map(renderServer)}
        {AddView}
      </div>
    </Dotted>
  );
}
