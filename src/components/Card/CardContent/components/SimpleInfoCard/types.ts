export type Shape = 'rect' | 'square';

type CardSettings = {
  /**
   * @default 'square'
   */
  shape?: Shape | null;
};

type SimpleInfoCardData = {
  title: string;
  subtitle?: string | null;
};

export type SimpleInfoCardProps = {
  data: SimpleInfoCardData;
  /**
   * @default { shape: 'square' }
   */
  settings?: CardSettings | null;
};
