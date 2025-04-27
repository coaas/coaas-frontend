import { Clusters as ClustersType } from '@scenes/components/Deploy/api/getClusters.ts';
import { Server } from './Server.tsx';
import { Instance } from './Instance.tsx';
import { Cluster } from './Cluster.tsx';
import { ClusterType } from '@scenes/components/Deploy/model/types.ts';
import { UseQueryResult } from '@tanstack/react-query';

export const Clusters = ({
  clusterApi: { data: clusters, isPending, isError },
}: {
  clusterApi: UseQueryResult<ClustersType, Error>;
}) => {
  const transferClusters =
    clusters?.type === ClusterType.SERVERS
      ? clusters?.clusters
      : clusters?.clusters[0].servers;

  if (isError) {
    return <p className="text-xl">У вас ещё ничего нет</p>;
  }

  if (isPending) {
    return null;
  }

  return (
    <div className="flex flex-col w-full gap-10">
      {transferClusters?.map(cluster => (
        <Cluster
          key={cluster.id}
          servers={'servers' in cluster ? cluster.servers : cluster.instances}
          name={
            clusters?.type === ClusterType.SERVERS
              ? [cluster.name, cluster.region, cluster.provider].join(', ')
              : [
                  cluster.name,
                  cluster.region,
                  cluster.availability_zone,
                  `${'cpu' in cluster ? cluster.cpu : ''} CPU`,
                  `${'ram' in cluster ? cluster.ram : ''} RAM`,
                  `${'disk' in cluster ? cluster.disk : ''} DISK`,
                ].join(' ')
          }
          clusterType={clusters?.type}
          renderServer={server => (
            <Server
              key={server.id}
              name={'name' in server ? server.name : server.service.name}
              id={server.id}
              status={server.status}
              instances={'instances' in server ? server.instances : []}
              cpu={server.cpu}
              ram={server.ram}
              disk={'disk' in server ? server.disk : server.memory}
              clusterType={clusters?.type}
              renderInstance={instance => (
                <Instance key={instance.id} {...instance} />
              )}
            />
          )}
        />
      ))}
    </div>
  );
};
