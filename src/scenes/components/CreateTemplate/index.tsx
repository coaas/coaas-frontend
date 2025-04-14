import { useApiQuery } from '@utils/lib/use-api-query';
import { DockerImageStep } from './widgets/DockerImageStep';
import { InfoStep } from './widgets/InfoStep';
import { SettingsStep } from './widgets/SettingsStep';
import { createTemplateDraft } from '@api/queries';
import { DraftIdService } from './lib/draft-id-service';
import { useEffect, useState } from 'react';

export const CreateTemplate = () => {
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
    <section className="p-[70px_70px_140px_125px] ">
      <div className="max-w-[741px]">
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
              <InfoStep />
              <DockerImageStep />
              <SettingsStep />
            </>
          )}
        </div>
      </div>
    </section>
  );
};
