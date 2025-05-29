import { useState } from 'react';
import { getAddServerToClusterContent } from '@scenes/components/Deploy/model/modalsContent.ts';
import {
  Cluster,
  Server,
} from '@scenes/components/Deploy/model/cluster.types.ts';
import {
  getClusterJsonToken,
  getClusterNodes,
} from '@scenes/components/Deploy/api/getDataCenter.ts';
import { ServerRole } from '@scenes/components/Deploy/model/dataCenter.types.ts';
import { ClustersResponse } from '@scenes/components/Deploy/api/getDeploy.ts';

export const useDataCenter = ({
  setModalType,
  clusters,
}: {
  setModalType: React.Dispatch<
    React.SetStateAction<boolean | 'server' | 'cluster'>
  >;
  clusters: ClustersResponse;
}) => {
  const [modalWarning, setModalWarning] = useState({ isOpen: false, text: '' });
  const [selectedCluster, setSelectedCluster] = useState<
    Cluster | Server | null
  >(null);
  const [modalServerContent, setModalServerContent] = useState<ReturnType<
    typeof getAddServerToClusterContent
  > | null>(null);
  const [nodeIds, setNodeIds] = useState<
    { id: string; value: string }[] | null
  >(null);

  const handleAddServerToDataCenter = async (cluster: Cluster | Server) => {
    const isSkipFetch =
      ('servers' in cluster ? cluster.servers : cluster.instances).length === 0;

    if (isSkipFetch) {
      setModalType('server');
      setSelectedCluster(cluster);
      setModalServerContent(
        getAddServerToClusterContent({
          selectedClusterId: cluster.id,
          isDockerApi: true,
        }),
      );
      setNodeIds(null);
      return;
    }

    setSelectedCluster(cluster);
    getClusterNodes(cluster.id).then(nodes => {
      const fullNodes = [
        ...nodes.new_nodes.map(n => ({
          id: n.node_id,
          value: n.node_id,
        })),
        { id: 'not_found', value: 'Not found' },
      ];

      setNodeIds(fullNodes);
      setModalType('server');
      setModalServerContent(
        getAddServerToClusterContent({
          selectedClusterId: cluster.id,
          nodeIds: fullNodes,
          isDockerApi: false,
        }),
      );
    });
  };

  const handleSelectServer = async (
    key: string,
    value: string,
    inputModal: Record<string, string>,
    clusterId: string,
  ) => {
    if (!nodeIds) return;

    if (key === 'node_id' && value === 'not_found') {
      const cluster = clusters.clusters.find(c => c.id === clusterId);
      const { value: token } = await getClusterJsonToken({
        cluster_id: clusterId,
        role:
          inputModal.is_manager === 'manager'
            ? ServerRole.MANAGER
            : ServerRole.WORKER,
      });
      if (!cluster) return;
      const ip = cluster.servers[0].ip;
      setModalWarning({
        isOpen: true,
        text: `docker swarm join --token ${token} ${ip}:2377`,
      });

      setModalServerContent(
        getAddServerToClusterContent({
          selectedClusterId: clusterId,
          isDockerApi: true,
          nodeIds,
          isNotFoundNodeIds: true,
        }),
      );
    }

    if (key === 'is_manager') {
      setModalServerContent(
        getAddServerToClusterContent({
          selectedClusterId: clusterId,
          nodeIds,
          isDockerApi: value === 'manager',
        }),
      );
    }
  };

  return {
    nodeIds,
    modalWarning,
    setModalWarning,
    selectedCluster,
    modalServerContent,
    handleAddServerToDataCenter,
    handleSelectServer,
  };
};
