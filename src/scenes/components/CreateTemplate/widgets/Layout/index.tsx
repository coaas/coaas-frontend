import { Outlet } from 'react-router-dom';
import { Navigation } from '../Navigation';
import { useDraftIdStorage } from '../../lib/use-draft-id-storage';
import { StateType } from '@globalTypes/templates.draft';

interface Props {
  state: StateType;
}

export const CreateTemplateLayout = ({ state }: Props) => {
  const { isLoading, draftId } = useDraftIdStorage();

  return (
    <section className="p-[70px_186px_140px_125px] flex justify-between ">
      <div className="max-w-[741px] w-full">
        <div>
          <h2 className="text-2xl font-semibold mb-[25px]">
            Creating Template
          </h2>
          {isLoading ? (
            <div className="w-full flex justify-center items-center mt-10">
              <span className=" animate-spin size-20 border-blue border-2 border-b-transparent rounded-full" />
            </div>
          ) : (
            draftId && (
              <>
                <Outlet context={{ state, id: draftId }} />
              </>
            )
          )}
        </div>
      </div>
      <Navigation />
    </section>
  );
};
