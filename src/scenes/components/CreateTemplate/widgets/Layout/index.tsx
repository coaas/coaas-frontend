import { useApiQuery } from '@utils/lib/use-api-query';
import { createTemplateDraft } from '@api/queries';
import { DraftIdService } from '../../lib/draft-id-service';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../Navigation';

export const CreateTemplateLayout = () => {
  const [storedId, setStoredId] = useState(DraftIdService.getId());

  const { data, isLoading } = useApiQuery({
    request: createTemplateDraft,
    options: { enabled: !storedId },
  });
  const draftId = data?.id;

  useEffect(() => {
    if (draftId) {
      DraftIdService.setId(draftId);
      setStoredId(draftId);
    }
  }, [draftId]);

  return (
    <section className="p-[70px_186px_140px_125px] flex justify-between ">
      <div className="max-w-[741px] w-full">
        <div>
          <h2 className="text-2xl font-semibold mb-[25px]">
            Creating Template
          </h2>
          {isLoading && (
            <div className="w-full flex justify-center items-center mt-10">
              <span className=" animate-spin size-20 border-blue border-2 border-b-transparent rounded-full" />
            </div>
          )}
          {storedId && (
            <>
              <Outlet />
            </>
          )}
        </div>
      </div>
      <Navigation />
    </section>
  );
};
