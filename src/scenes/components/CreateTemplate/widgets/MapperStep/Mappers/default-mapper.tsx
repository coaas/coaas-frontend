import { Input } from '@components/Input';
import { Select } from '@components/Select';
import { TextArea } from '@components/TextArea';
import { FormButton } from '@scenes/components/CreateTemplate/components/FormButton';
import { FormField } from '@scenes/components/CreateTemplate/components/FormField';
import { TaggedInput } from '@scenes/components/CreateTemplate/components/TaggedInput';
import { useDefaultValues } from '@scenes/components/CreateTemplate/lib/use-default-values';

const blankItems = [
  { label: 'Blank', value: 'Blank' },
  { label: 'Value', value: 'Value' },
  { label: 'Enum', value: 'Enum' },
];

export const DefaultMapper = () => {
  const { mapper } = useDefaultValues();

  const { serviceName, name, configs, description, env_vars, ports, secrets } =
    mapper;

  return (
    <div className="p-5 border-2 border-stroke-gray-dark border-dashed  rounded-[10px] flex flex-col gap-[25px]">
      <h4 className="text-white text-2xl text-[27px] font-inter font-semibold">
        {`Creating ${serviceName}`}
      </h4>
      <div className="flex flex-col gap-5">
        <FormField clickable label="Name">
          <Input defaultValue={name} />
        </FormField>
        <FormField clickable label="Description">
          <TextArea className="w-full" defaultValue={description} />
        </FormField>
      </div>
      <div className="flex flex-col gap-[23px]">
        <h4 className="text-white text-xl text-[22px] font-inter font-semibold">
          Configure service
        </h4>
      </div>
      <FormField label="Secrets">
        <div className="flex flex-col gap-[10px]">
          {secrets.map(({ name }, key) => (
            <div
              className="grid grid-cols-[minmax(0,160px)_min-content_minmax(0,1fr)] gap-[10px]"
              key={key}
            >
              <Input disabled defaultValue={name} className="bg-area-dark" />
              <span className="text-sm self-center font-inter text-white">
                =
              </span>
              <Select
                variant="formView"
                withChevron
                options={blankItems}
                defaultLabel="Select"
                className="[&_label]:m-0"
                onOptionChange={() => {}}
              />
            </div>
          ))}
        </div>
      </FormField>
      <FormField label="Configs">
        <div className="flex flex-col gap-[10px]">
          {configs.map(({ path }, key) => (
            <div
              className="grid grid-cols-[minmax(0,160px)_min-content_minmax(0,1fr)] gap-[10px]"
              key={key}
            >
              <Input disabled defaultValue={path} className="bg-area-dark" />
              <span className="text-sm self-center font-inter text-white">
                =
              </span>
              <Select
                variant="formView"
                withChevron
                options={blankItems}
                defaultLabel="Select"
                className="[&_label]:m-0"
                onOptionChange={() => {}}
              />
            </div>
          ))}
        </div>
      </FormField>
      <FormField label="Env variables">
        <div className="flex flex-col gap-[10px]">
          {env_vars.map(({ key, value }, index) => (
            <div
              className="grid grid-cols-[minmax(0,1fr)_min-content_minmax(0,1fr)] gap-[10px]"
              key={index}
            >
              <Input disabled defaultValue={key} className="bg-area-dark" />
              <span className="text-sm self-center font-inter text-white">
                =
              </span>
              <Input disabled defaultValue={value} />
            </div>
          ))}
        </div>
      </FormField>
      <FormField label="Ports">
        {ports.map(({ name }, key) => (
          <TaggedInput
            className="[&_label]:bg-area-dark"
            key={key}
            defaultValue={name}
            disabled
            deleteDisabled
          />
        ))}
      </FormField>
      <FormButton variant="preview" disabled>
        Create service
      </FormButton>
    </div>
  );
};
