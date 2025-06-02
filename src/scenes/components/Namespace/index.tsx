import { FC } from 'react';
import { Icon, IconType } from '@components/Icon';
import { Button } from '@components/Button';
import { cn } from '@utils/styles';
import { useNamespace } from './useNamespace';

export const Namespace: FC = () => {
  const { data: namespace, isLoading, error } = useNamespace();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stroke-blue"></div>
          <p className="text-gray text-sm">Loading namespace...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-area-dark rounded-full">
            <div className="text-4xl">❌</div>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Loading Error
          </h2>
          <p className="text-gray">
            Failed to load namespace data. Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  if (!namespace) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-area-dark rounded-full">
            <div className="text-4xl">⚠️</div>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-3">
            Namespace Not Found
          </h2>
          <p className="text-gray">
            The specified namespace does not exist or has been deleted.
          </p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getMembersText = (count: number) => {
    return count === 1 ? 'member' : 'members';
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="w-full m-auto max-w-[1268px] py-[70px] px-3.5">
        {/* Main Namespace Card */}
        <div className="bg-area-dark border border-stroke-gray rounded-xl p-6">
          <div className="flex items-start justify-between">
            {/* Left side - Icon and Content */}
            <div className="flex items-start space-x-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <Icon 
                  type={IconType.cube} 
                  props={{ size: 64, className: 'text-stroke-blue' }} 
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-semibold text-white mb-2">
                  {namespace.name}
                </h1>
                <p className="text-gray text-base leading-relaxed mb-4">
                  {namespace.description || 'No description provided'}
                </p>
                
                {/* Additional info */}
                <div className="flex items-center space-x-6 text-sm text-gray">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      type={IconType.user} 
                      props={{ size: 16, className: 'text-gray' }} 
                    />
                    <span>
                      {namespace.members_count} {getMembersText(namespace.members_count)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span>Created:</span>
                    <span>{formatDate(namespace.created_at)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Action Buttons */}
            <div className="flex items-center space-x-3 flex-shrink-0 ml-6">
              <Button variant="outline">
                Settings
              </Button>
              <button 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-base font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 border-2 bg-background"
                style={{
                  borderColor: '#ef4444',
                  color: '#ef4444',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ef4444';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#ef4444';
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Empty space below */}
        <div className="mt-8">
          {/* Future content can be added here */}
        </div>
      </section>
    </div>
  );
};
