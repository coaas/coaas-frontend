import { clsx } from 'clsx';

export const DeployButton = ({
  color,
  children,
  onClick,
  isBorder,
}: {
  color: 'blue' | 'transparent' | 'area';
  children: React.ReactNode;
  onClick: () => void;
  isBorder?: boolean;
}) => {
  const variants = {
    base: 'rounded-lg w-full font-medium py-1',
    color: {
      blue: 'bg-stroke-blue text-white',
      area: 'bg-area text-white',
      transparent: 'text-white',
    },
    border: 'border-4 border-area-dark',
  };

  return (
    <button
      className={clsx(
        variants.base,
        variants.color[color],
        isBorder && variants.border,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
