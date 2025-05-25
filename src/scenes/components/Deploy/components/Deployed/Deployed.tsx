import { ClusterType, Status } from '../../model/cluster.types.ts';
import { Server as ServerComp } from '../Clusters/Server.tsx';
import { ClustersResponse } from '../../api/getDeploy.ts';
import { Cluster as ClusterComp } from '../Clusters/Cluster.tsx';
import { isInstance, isServer } from '../../utils/checkers.ts';

export const Deployed = ({ clusters }: { clusters: ClustersResponse }) => {
  const transferClusters =
    clusters.type === ClusterType.REGIONS
      ? clusters.clusters
      : [
          {
            instances: clusters.clusters[0].servers.flatMap(server => [
              ...server.instances,
            ]),
          },
        ];

  return (
    <div className="flex flex-col gap-6 self-start w-full">
      {transferClusters.map(cluster => (
        <ClusterComp
          clusterType={clusters.type}
          name={
            'provider' in cluster
              ? [cluster.provider, cluster.region, cluster.name].join(', ')
              : ''
          }
          servers={'servers' in cluster ? cluster.servers : cluster.instances}
          isHidden={clusters.type === ClusterType.SERVERS}
          renderServer={server => (
            <ServerComp
              key={server.id}
              name={server.id ?? ''}
              width={'285'}
              status={
                isServer(server)
                  ? server.status
                  : isInstance(server)
                    ? server.status
                    : Status.UNKNOWN
              }
              cpu={server.cpu}
              ram={server.ram}
              disk={
                isServer(server)
                  ? server.disk
                  : isInstance(server)
                    ? server.memory
                    : 0
              }
              id={
                isServer(server)
                  ? server.name
                  : isInstance(server)
                    ? server.service.id
                    : ''
              }
              instances={[]}
              renderInstance={() => <></>}
              clusterType={ClusterType.SERVERS}
              type={'deployed'}
            />
          )}
        />
      ))}
    </div>
  );
};
