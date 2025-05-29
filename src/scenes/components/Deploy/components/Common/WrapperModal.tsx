export const WrapperModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <form
      onSubmit={e => e.preventDefault()}
      className="max-h-[55vh] overflow-y-auto"
    >
      <div className="flex flex-col gap-5">{children}</div>
    </form>
  );
};
