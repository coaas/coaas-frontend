export const Counter = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  return (
    <div className="px-2 py-0.5 border-solid uppercase text-blue bg-blue/20 border-blue flex gap-1 rounded-md border-[1px] font-medium text-xs select-none">
      <button
        className="font-bold"
        onClick={() => onChange(Math.max(0, value - 1))}
      >
        -
      </button>
      <p className="text-center">{value}</p>
      <button className="font-bold" onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  );
};
