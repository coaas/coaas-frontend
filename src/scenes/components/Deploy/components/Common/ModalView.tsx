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
import { useEffect, useState } from 'react';

type Optional<T extends object> = {
  [K in keyof T]?: T[K];
};

export type ModalOption<T extends string = string> = {
  readonly id: T;
  readonly value: string;
  readonly disabled?: boolean;
};

export type Content = {
  readonly label: {
    readonly id: string;
    readonly label: string;
  };
} & (Select | Input | ButtonInput);

type Input = {
  readonly type: 'input';
  readonly isNumber?: boolean;
  readonly defaultValue?: string;
  readonly placeholder?: string;
  readonly disabled?: boolean;
};

type ButtonInput = {
  readonly type: 'inputButton';
  readonly getValue: () => string;
  readonly defaultValue: string;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly buttonText: string;
};

type Select = {
  readonly type: 'select';
  readonly placeholder?: string;
  readonly defaultValue?: string;
  readonly options: readonly ModalOption[];
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

export const ModalView = <T extends readonly Content[]>({
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
  invalidFields?: ContentIds<T[number]>[] | null;
  inputs?: Optional<Record<SelectIdsBy<'input', T[number]>, string>>;
  onSelect?: (
    key: SelectIdsBy<'select', T[number]>,
    value: string,
    inputModal: Record<ContentIds<T[number]>, string>,
  ) => void;
}) => {
  type Keys = ContentIds<T[number]>;
  invalidFields ??= [];

  const [input, setInput] = useState(
    content.reduce(
      (acc, val) => {
        acc[val.label.id as Keys] = val.defaultValue || '';
        return acc;
      },
      {} as Record<Keys, string>,
    ),
  );

  useEffect(() => {
    setInput(
      content.reduce(
        (acc, val) => {
          acc[val.label.id as Keys] = val.defaultValue || '';
          return acc;
        },
        {} as Record<Keys, string>,
      ),
    );
  }, [content]);

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
            disabled={
              (inputs && content.label.id in inputs) || content.disabled
            }
            invalid={
              invalidFields && invalidFields.includes(content.label.id as Keys)
            }
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
                  input,
                );
              setInput(prevState => ({
                ...prevState,
                [content.label.id as Keys]: value,
              }));
            }}
            defaultValue={content.defaultValue}
            required={true}
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
      inputButton: isType('inputButton', content) && (
        <>
          <Label id={content.label.id} label={content.label.label} />
          <div className="flex gap-2">
            <InputComp
              value={
                inputs && content.label.id in inputs
                  ? inputs[content.label.id as keyof typeof inputs]
                  : input[content.label.id as Keys]
              }
              placeholder={content.placeholder}
              disabled={
                (inputs && content.label.id in inputs) || content.disabled
              }
              invalid={
                invalidFields &&
                invalidFields.includes(content.label.id as Keys)
              }
              onChange={({ target: { value } }) =>
                setInput(prevState => ({
                  ...prevState,
                  [content.label.id as Keys]: value,
                }))
              }
            />
            {/*<DeployButton color={'area'} onClick={() => {}}>*/}
            {/*  {content.buttonText}*/}
            {/*</DeployButton>*/}
          </div>
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
