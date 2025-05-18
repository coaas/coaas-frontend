import { useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { Clusters } from './Clusters/Clusters';
import { Services } from './Services/Services.tsx';
import { Achieve } from './Common/Achieve.tsx';
import { ClusterType, OrchEngine, Status } from '../model/cluster.types.ts';
import { clusterOptions } from '../api/getDeploy.ts';
import { DeployButton } from './Common/DeployButton.tsx';

const deployTypes = ['Clusters', 'Services', 'Data Centers'] as const;
export const Deploy = () => {
  const clusterApi = useQuery(clusterOptions);
  const [selectedDeploy, setSelectedDeploy] = useState<
    (typeof deployTypes)[number]
  >(deployTypes[0]);

  const deployTags = useMemo(
    () =>
      clusterApi.data
        ? [
            clusterApi.data?.type === ClusterType.REGIONS
              ? 'regions'
              : 'servers',
            clusterApi.data?.orchestration_engine === OrchEngine.DOCKER
              ? 'docker'
              : 'kubernetes',
          ]
        : [],
    [clusterApi],
  );

  if (clusterApi.isError) {
    return (
      <p className="text-xl text-center">You have not deployed project yet.</p>
    );
  }

  if (clusterApi.isPending) {
    return null;
  }

  const SelectedDeployComponent = {
    Clusters: <Clusters clusters={clusterApi.data} />,
    Services: <Services />,
    'Data Centers': <Clusters clusters={clusterApi.data} view={'dataCenter'} />,
  }[selectedDeploy];

  return (
    <div className="flex flex-col mt-8 px-20 items-center">
      <div className="self-start flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Deploy</h1>
        <div className="flex gap-2">
          {deployTags.map(tag => (
            <Achieve key={tag} status={Status.UNKNOWN} size={'lg'}>
              {tag}
            </Achieve>
          ))}
        </div>
      </div>
      <div className="w-full mt-4 mb-8 border-2 border-stroke-blue p-1 rounded-sm">
        <div className="flex">
          {deployTypes.map(name => (
            <DeployButton
              key={name}
              color={selectedDeploy === name ? 'blue' : 'transparent'}
              onClick={() => setSelectedDeploy(name)}
            >
              {name}
            </DeployButton>
          ))}
        </div>
      </div>
      {SelectedDeployComponent}
    </div>
  );
};
