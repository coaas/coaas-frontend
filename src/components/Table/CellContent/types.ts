import { ButtonProps } from '@components/Button';

export enum CellType {
  text = 'text',
  number = 'number',
  date = 'date',
  tag = 'tag',
  button = 'button',
}

type TextCellData = {
  title: string;
};

type NumberCellData = {
  value: number;
};

type DateCellData = {
  date: Date;
};

type TagCellData = {
  title: string;
  type: 'active' | 'activeTransparent';
};

export type CellData =
  | GenericData<CellType.text, TextCellData>
  | GenericData<CellType.date, DateCellData>
  | GenericData<CellType.tag, TagCellData>
  | GenericData<CellType.button, ButtonProps>
  | GenericData<CellType.number, NumberCellData>;

export type CellContentProps = {
  cell: CellData;
};
