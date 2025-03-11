import { FormProvider } from 'react-hook-form';
import { DockerImageStep } from './widgets/DockerImageStep';
import { InfoStep } from './widgets/InfoStep';
import { useFormMethods } from './use-form-methods';

export const CreateTemplate = () => {
  const { methods } = useFormMethods();
  return (
    <section className="p-[70px_70px_140px_125px] ">
      <div className="max-w-[741px]">
        <div>
          <h2 className="text-2xl font-semibold mb-[25px]">
            Creating Template
          </h2>
          <FormProvider {...methods}>
            <InfoStep />
            <DockerImageStep />
          </FormProvider>
        </div>
      </div>
    </section>
  );
};
