import { ButtonVariant } from '@components/Button';

type ButtonData = {
  title: string;
  onClick?: () => void;
  variant?: ButtonVariant;
};

export type BannerProps = WithClassname & {
  title: string;
  subtitle?: string;
  buttons?: ButtonData[];
};
