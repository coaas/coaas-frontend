import { FC, useState, useMemo } from 'react';
import { Modal, ModalContent } from '@components/Modal';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@components/Select/Select';
import { FormButton } from '@scenes/components/CreateTemplate/components/FormButton';
import { useApiQuery } from '@utils/lib/use-api-query';
import { getUserNamespacesAndProjects } from '@api/queries';
import { useNavigate } from 'react-router-dom';

interface CreateServiceModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  templateId: string;
}

export const CreateServiceModal: FC<CreateServiceModalProps> = ({
  isOpen,
  onOpenChange,
  templateId,
}) => {
  const navigate = useNavigate();
  const { data, isLoading } = useApiQuery({
    request: getUserNamespacesAndProjects,
    requestOptions: { prefixUrl: '/api' },
  });

  const [namespace, setNamespace] = useState<string>('');
  const [project, setProject] = useState<string>('');

  // Get list of namespaces
  const namespaces = useMemo(
    () => (data ? Object.entries(data.namespaces) : []),
    [data],
  );
  // Get list of projects for selected namespace
  const projects = useMemo(() => {
    if (!namespace || !data) return [];
    const ns = data.namespaces[namespace];
    return ns ? Object.entries(ns.projects) : [];
  }, [namespace, data]);

  const handleConfigure = () => {
    if (namespace && project) {
      navigate(
        `/namespaces/${namespace}/projects/${project}/services/new/${templateId}`,
      );
      onOpenChange(false);
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <div className="w-full max-w-md">
          <h2 className="text-xl font-semibold mb-6">Create service</h2>
          <div className="flex flex-col gap-4 mb-6">
            <div>
              <label className="block mb-1 text-gray-400 text-sm">
                Namespace
              </label>
              <Select
                value={namespace}
                onValueChange={value => {
                  setNamespace(value);
                  setProject('');
                }}
                disabled={isLoading || namespaces.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select namespace" />
                </SelectTrigger>
                <SelectContent>
                  {namespaces.map(([slug, ns]) => (
                    <SelectItem key={slug} value={slug}>
                      {ns.name || slug}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block mb-1 text-gray-400 text-sm">
                Project
              </label>
              <Select
                value={project}
                onValueChange={setProject}
                disabled={!namespace || projects.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map(([slug, prj]) => (
                    <SelectItem key={slug} value={slug}>
                      {prj.name || slug}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <FormButton
            size="lg"
            className="w-full"
            onClick={handleConfigure}
            disabled={!namespace || !project}
          >
            Configure
          </FormButton>
        </div>
      </ModalContent>
    </Modal>
  );
};
