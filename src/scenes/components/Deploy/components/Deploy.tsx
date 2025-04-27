import { Clusters } from '@scenes/components/Deploy';
import { useMemo, useState } from 'react';
import { Services } from '@scenes/components/Deploy/components/Services/Services.tsx';
import { DataCenters } from '@scenes/components/Deploy/components/DataCenters/DataCenters.tsx';
import { Achieve } from '@scenes/components/Deploy/components/Common/Achieve.tsx';
import {
  ClusterType,
  OrchEngine,
  Status,
} from '@scenes/components/Deploy/model/types.ts';
import { useApiQuery } from '@utils/lib/use-api-query.tsx';
import { Clusters as ClustersType } from '@scenes/components/Deploy/api/getClusters.ts';
import { DeployButton } from '@scenes/components/Deploy/components/Common/DeployButton.tsx';

const ENDPOINT = 'DeployService/GetProjectDeploy';

const deployTypes = ['Clusters', 'Services', 'Data Centers'] as const;
export const Deploy = () => {
  // const clusterApi = useQuery(clusterOptions);
  const clusterApi = useApiQuery<ClustersType>({
    request: {
      endpoint: ENDPOINT,
    },
  });

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

  const SelectedDeployComponent = {
    Clusters: <Clusters clusterApi={clusterApi} />,
    Services: <Services />,
    'Data Centers': <DataCenters />,
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
