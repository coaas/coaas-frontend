export const WrapperModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <div className="flex flex-col gap-5">{children}</div>
    </form>
  );
};
