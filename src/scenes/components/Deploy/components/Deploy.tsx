import { useQuery } from '@tanstack/react-query';
import { clusterOptions } from '@scenes/components/Deploy/api/getClusters.ts';
import { Cluster } from './Cluster.tsx';
import { Server } from './Server.tsx';
import { Instance } from './Instance.tsx';

export const Deploy = () => {
  const { data: clusters, isPending, isError } = useQuery(clusterOptions);

  if (isPending || isError) {
    return null;
  }

  return (
    <div className="flex flex-col mt-20 px-20 items-center gap-10">
      {clusters?.clusters.map(cluster => (
        <Cluster
          key={cluster.id}
          {...cluster}
          renderServer={server => (
            <Server
              key={server.id}
              {...server}
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
