import { clsx } from 'clsx';

export const DeployButton = ({
  color,
  children,
  onClick,
}: {
  color: 'blue' | 'transparent';
  children: React.ReactNode;
  onClick: () => void;
}) => {
  const variants = {
    base: 'rounded-sm w-full font-medium py-1',
    color: {
      blue: 'bg-stroke-blue',
      transparent: '',
    },
  };

  return (
    <button
      className={clsx(variants.base, variants.color[color])}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
