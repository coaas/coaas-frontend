import { Outlet } from 'react-router-dom';
import { Navigation } from '../Navigation';
import { useDraftIdStorage } from '../../lib/use-draft-id-storage';
import { useApiQuery } from '@utils/lib/use-api-query';
import { getTemplateDraft } from '@api/queries';

export const CreateTemplateLayout = () => {
  const { isLoading, draftId } = useDraftIdStorage();

  const { isLoading: draftDataLoading } = useApiQuery({
    request: getTemplateDraft,
    payload: { id: draftId },
  });

  return (
    <section className="p-[70px_186px_140px_125px] flex justify-between ">
      <div className="max-w-[741px] w-full">
        <div>
          <h2 className="text-2xl font-semibold mb-[25px]">
            Creating Template
          </h2>
          {isLoading || draftDataLoading ? (
            <div className="w-full flex justify-center items-center mt-10">
              <span className=" animate-spin size-20 border-blue border-2 border-b-transparent rounded-full" />
            </div>
          ) : (
            draftId && (
              <>
                <Outlet />
              </>
            )
          )}
        </div>
      </div>
      <Navigation />
    </section>
  );
};
