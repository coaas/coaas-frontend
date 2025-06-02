import { Outlet, useParams } from 'react-router-dom';
import { Navigation } from '../Navigation';
import { StateType } from '@globalTypes/templates.draft';
import { useApiQuery } from '@utils/lib/use-api-query';
import { getTemplateDraft } from '@api/queries';

interface Props {
  state: StateType;
}

export const CreateTemplateDraftLayout = ({ state }: Props) => {
  const { draft_id } = useParams<{ draft_id: string }>();

  const { isLoading } = useApiQuery({
    request: getTemplateDraft,
    payload: { id: draft_id },
    requestOptions: {
      prefixUrl: '/api',
    },
  });

  return (
    <section className="p-[70px_186px_140px_125px] flex justify-between ">
      <div className="max-w-[741px] w-full">
        <div>
          <h2 className="text-2xl font-semibold mb-[25px]">Editing Draft</h2>
          {isLoading ? (
            <div className="w-full flex justify-center items-center mt-10">
              <span className=" animate-spin size-20 border-blue border-2 border-b-transparent rounded-full" />
            </div>
          ) : (
            draft_id && (
              <>
                <Outlet context={{ state, id: draft_id }} />
              </>
            )
          )}
        </div>
      </div>
      <Navigation />
    </section>
  );
};
