import { getTemplateDraft } from '@api/queries';
import { useApiQuery } from '@utils/lib/use-api-query';
import { useParams } from 'react-router-dom';
import { Hero } from '../Template/components/Hero';
import { MapperPreviewBlock } from '../common/MapperPreviewBlock';

export const TemplateDraft = () => {
  const { template_slug } = useParams();

  const { data: templateResponse, isLoading } = useApiQuery({
    request: getTemplateDraft,
    payload: { id: template_slug },
    requestOptions: {
      prefixUrl: '/api',
    },
  });

  return (
    <section className="w-full max-w-[1268px] m-auto pt-[70px] pb-[140px]">
      {isLoading && (
        <div className="w-full flex justify-center items-center mt-10">
          <span className=" animate-spin size-20 border-blue border-2 border-b-transparent rounded-full" />
        </div>
      )}
      {templateResponse && (
        <div className="flex flex-col gap-[30px]">
          <Hero 
            {...templateResponse.info} 
            isDraft={true}
            draftId={template_slug}
          />
          <div className="py-[22px] px-[32px] flex flex-col gap-2 border rounded-xl border-stroke-gray-dark">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className=" text-[24px] leading-none font-semibold text-white">
                  {templateResponse.info.name}
                </h3>
                <p className=" text-[16px] leading-none font-normal text-gray mt-2">
                  {templateResponse.info.docs}
                </p>
              </div>
            </div>
          </div>
          <MapperPreviewBlock
            mapper={{
              previewName: 'Untitled',
              previewDescription: '',
              serviceName: templateResponse.info.name,
              secrets: templateResponse.settings.secrets,
              configs: templateResponse.settings.configs,
              env_vars: templateResponse.settings.env_vars,
              ports: templateResponse.settings.ports.map(port => ({
                name: port,
              })),
            }}
          />
        </div>
      )}
    </section>
  );
}; 