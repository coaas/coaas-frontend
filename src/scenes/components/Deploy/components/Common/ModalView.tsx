import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from '@components/Modal';
import { Input as InputComp } from '@components/Input';
import { WrapperModal } from '@scenes/components/Deploy/components/Common/WrapperModal.tsx';
import { Label } from '@scenes/components/Staff/components/Modal/components';
import {
  Select as SelectComp,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/Select/Select.tsx';
import { useState } from 'react';

type Optional<T extends object> = {
  [K in keyof T]?: T[K];
};

export type Option<T extends string = string> = {
  id: T;
  value: string;
  disabled?: boolean;
};

export type Content = {
  label: {
    id: string;
    label: string;
  };
} & (Select | Input);

type Input = {
  type: 'input';
  isNumber?: boolean;
  defaultValue?: string;
  placeholder?: string;
};

type Select = {
  type: 'select';
  placeholder?: string;
  defaultValue?: string;
  options: Option[];
};

const isType = <T extends Content['type']>(
  key: T,
  obj: Content,
): obj is Extract<Content, { type: T }> => obj.type === key;

type ContentIds<T extends Content> = T extends { label: { id: infer U } }
  ? U
  : never;

type SelectIdsBy<
  T extends Select['type'] | Input['type'],
  K extends Content,
> = K extends {
  type: T;
  label: { id: infer U };
}
  ? U
  : never;

export const ModalView = <T extends Content[]>({
  onChange,
  title,
  content,
  invalidFields = [],
  renderActions,
  inputs,
  onSelect,
}: {
  onChange: (o: boolean) => void;
  title: string;
  content: T;
  renderActions: (
    inputModal: Record<ContentIds<T[number]>, string>,
  ) => React.ReactNode;
  invalidFields?: ContentIds<T[number]>[];
  inputs?: Optional<Record<SelectIdsBy<'input', T[number]>, string>>;
  onSelect?: (key: SelectIdsBy<'select', T[number]>, value: string) => void;
}) => {
  type Keys = ContentIds<T[number]>;

  const [input, setInput] = useState(
    content.reduce(
      (acc, val) => {
        acc[val.label.id as Keys] = val.defaultValue || '';
        return acc;
      },
      {} as Record<Keys, string>,
    ),
  );

  const renderContent = (content: Content) =>
    ({
      input: isType('input', content) && (
        <>
          <Label id={content.label.id} label={content.label.label} />
          <InputComp
            value={
              inputs && content.label.id in inputs
                ? inputs[content.label.id as keyof typeof inputs]
                : input[content.label.id as Keys]
            }
            placeholder={content.placeholder}
            disabled={inputs && content.label.id in inputs}
            invalid={invalidFields.includes(content.label.id as Keys)}
            type={content.isNumber ? 'number' : undefined}
            onChange={({ target: { value } }) =>
              setInput(prevState => ({
                ...prevState,
                [content.label.id as Keys]: value,
              }))
            }
          />
        </>
      ),
      select: isType('select', content) && (
        <>
          <Label id={content.label.id} label={content.label.label} />
          <SelectComp
            onValueChange={value => {
              // eslint-disable-next-line @typescript-eslint/no-unused-expressions
              onSelect &&
                onSelect(
                  content.label.id as unknown as SelectIdsBy<
                    'select',
                    T[number]
                  >,
                  value,
                );
              setInput(prevState => ({
                ...prevState,
                [content.label.id as Keys]: value,
              }));
            }}
            defaultValue={content.defaultValue}
          >
            <SelectTrigger>
              <SelectValue placeholder={content.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {content.options.map(({ id, value, disabled }) => (
                <SelectItem key={id} value={id} disabled={disabled}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectComp>
        </>
      ),
    })[content.type];

  return (
    <Modal open onOpenChange={onChange}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>
        <WrapperModal>
          {content.map(content => (
            <div key={content.label.id}>{renderContent(content)}</div>
          ))}
          {renderActions(input)}
        </WrapperModal>
      </ModalContent>
    </Modal>
  );
};
