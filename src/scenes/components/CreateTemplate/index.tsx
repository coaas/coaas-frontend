import { InfoForm } from './components/InfoForm';

export const CreateTemplate = () => {
  return (
    <section className="p-[70px_70px_140px_125px] ">
      <div className="max-w-[741px]">
        <div>
          <h2 className="text-2xl font-semibold mb-[25px]">
            Creating Template
          </h2>
          <InfoForm />
        </div>
      </div>
    </section>
  );
};
