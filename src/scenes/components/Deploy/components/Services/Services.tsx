import { useMemo, useReducer, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useMutation, useQueries } from '@tanstack/react-query';
import { xorBy } from 'lodash';

import { Dotted } from '../../components/Common/Dotted.tsx';
import { DeployButton } from '../../components/Common/DeployButton.tsx';
import { Deploy } from '../icons';

import { queryClient } from '@api/constants.ts';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from '@components/Modal';
import { Button } from '@components/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/Select';
import { Label } from '@scenes/components/Staff/components/Modal/components';

import { ServiceType } from '../../model/service.types.ts';
import {
  deployedServicesOptions,
  DeployedServicesResponse,
  deployService,
  listServicesOptions,
  ListServicesResponse,
  createDeployedServicesOptions,
  createListServicesOptions,
} from '../../api/getServiceManager.ts';
import { WrapperModal } from '../../components/Common/WrapperModal.tsx';
import { useTourMode } from '@utils/tourMode.ts';

const Service = ({
  description,
  name,
  type,
  id,
}: {
  description: string;
  name: string;
  type: ServiceType;
  id: string;
}) => {
  const navigate = useNavigate();
  const { namespace_slug, project_slug } = useParams();

  const handleClick = () => {
    navigate(
      `/namespaces/${namespace_slug}/projects/${project_slug}/deploy/${id}`,
    );
  };

  return (
    <div
      className="bg-area-dark/70 border border-stroke-gray-dark px-8 py-6 flex gap-8 w-full rounded-lg items-center cursor-pointer hover:bg-area-dark/90 transition-colors"
      onClick={handleClick}
    >
      <Deploy />
      <div className="flex flex-col">
        <div className="flex gap-2 items-center mb-1">
          <p className="text-xl font-bold">{name}</p>
          <p className="px-2 bg-stroke-blue/20 rounded-lg border-2 border-stroke-blue text-blue font-bold">
            {type}
          </p>
        </div>
        <p className="text-lg text-stroke-gray-lght">{description}</p>
      </div>
    </div>
  );
};

export const Services = () => {
  const [isDeployModal, toggleIsDeployModal] = useReducer(d => !d, false);
  const [deployValue, setDeployValue] = useState('');
  const [showNotDeployed, setShowNotDeployed] = useState(false);
  const { isActive: isTourMode } = useTourMode();

  const [deployResult, listResult] = useQueries({
    queries: [
      isTourMode ? createDeployedServicesOptions(isTourMode) : deployedServicesOptions,
      isTourMode ? createListServicesOptions(isTourMode) : listServicesOptions,
    ],
  });

  const deployedServices = deployResult.data as DeployedServicesResponse;
  const listServices = listResult.data as ListServicesResponse;
  const isSuccess = deployResult.isSuccess && listResult.isSuccess;

  const { mutate: mutateDeployService } = useMutation({
    mutationFn: deployService,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [
          deployedServicesOptions.queryKey,
          listServicesOptions.queryKey,
        ],
      });
    },
  });

  const deployableServices = useMemo(() => {
    if (!isSuccess) return [];
    if (deployedServices?.services.length === 0) {
      setDeployValue(listServices.services[0].id);
      return listServices?.services;
    }
    const services = xorBy(
      deployedServices?.services,
      listServices?.services,
      'id',
    );
    if (services.length === 0) return [];
    setDeployValue(services[0].id);
    return services;
  }, [deployedServices?.services, listServices?.services, isSuccess]);

  const handleDeploy = () => {
    if (!deployValue) return;
    mutateDeployService(deployValue);
    toggleIsDeployModal();
  };

  useEffect(() => {
    const checkError = async (error: Error & { response?: Response }) => {
      if (error.response?.status === 404) {
        const data = await error.response.json();
        if (data.code === 'PROJECT_DEPLOY_NOT_FOUND') {
          setShowNotDeployed(true);
        }
      }
    };

    if (deployResult.error) {
      checkError(deployResult.error as Error & { response?: Response });
    }
    if (listResult.error) {
      checkError(listResult.error as Error & { response?: Response });
    }
  }, [deployResult.error, listResult.error]);

  if (showNotDeployed) {
    return (
      <p className="text-xl w-full text-center">
        You have not deployed project yet.
      </p>
    );
  }

  return (
    <Dotted data-tour="services-content">
      <Modal open={isDeployModal} onOpenChange={toggleIsDeployModal}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Choose the service for deploying</ModalTitle>
          </ModalHeader>
          <WrapperModal>
            <div>
              <Label id={'Service'} label={'Choose service'} />
              <Select onValueChange={setDeployValue} defaultValue={deployValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose service" />
                </SelectTrigger>
                <SelectContent>
                  {deployableServices.map(({ id, name }) => (
                    <SelectItem key={id} value={id}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between">
              {[
                { text: 'Close', onClick: toggleIsDeployModal },
                { text: 'Deploy', onClick: handleDeploy },
              ].map(({ text, onClick }) => (
                <Button key={text} variant={'outline'} onClick={onClick}>
                  {text}
                </Button>
              ))}
            </div>
          </WrapperModal>
        </ModalContent>
      </Modal>
      <DeployButton color={'blue'} isBorder onClick={toggleIsDeployModal}>
        Deploy service
      </DeployButton>
      {deployedServices?.services.map(s => <Service key={s.id} {...s} />)}
    </Dotted>
  );
};
