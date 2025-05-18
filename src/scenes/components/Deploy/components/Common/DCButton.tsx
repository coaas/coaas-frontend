export const DcButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      className="w-full text-center border-2 border-white rounded-lg py-2 font-semibold"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
