import { Form } from './Form';
import { useCreateServiceForm } from './useCreateServiceForm';

export const CreateServiceForm = () => {
  const { data, isFetching, isTemplateCustom } = useCreateServiceForm();

  if (isFetching) return <div>Loading...</div>;
  if (!data) return <div>Error</div>;

  return (
    <section className="p-10 max-w-[700px]">
      <h3 className="font-semibold text-2xl text-white mb-5">
        {`Creating ${data.info.name}`}
      </h3>
      <Form data={data} />
    </section>
  );
};
