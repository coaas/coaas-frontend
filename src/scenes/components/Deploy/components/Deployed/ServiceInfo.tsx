import { Icon, IconType } from '@components/Icon';
import { Button } from '@components/Button';
import { useService } from '@scenes/components/Service/useService.ts';

export const ServiceInfo = () => {
  const { data: service, isError, isPending } = useService();

  const getServiceTypeText = (type: number) =>
    ({ 0: 'Managed', 1: 'Custom' })[type] ?? `Type ${type}`;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isError || isPending) {
    return null;
  }

  return (
    <div className="bg-area-dark border border-stroke-gray rounded-xl p-6 w-full mb-8">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-6">
          <div className="flex-shrink-0">
            <Icon
              type={IconType.cube}
              props={{ size: 64, className: 'text-stroke-blue' }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-semibold text-white mb-2">
              {service.name}
            </h1>
            <p className="text-gray text-base leading-relaxed mb-4">
              {service.description || 'No description provided'}
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray">
              <div className="flex items-center space-x-2">
                <Icon
                  type={IconType.settings}
                  props={{ size: 16, className: 'text-gray' }}
                />
                <span>Type: {getServiceTypeText(service.type)}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span>Created:</span>
                <span>{formatDate(service.created_at)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3 flex-shrink-0 ml-6">
          <Button variant="outline">Settings</Button>
          <button
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 border-2 bg-background"
            style={{
              borderColor: '#ef4444',
              color: '#ef4444',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#ef4444';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#ef4444';
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
