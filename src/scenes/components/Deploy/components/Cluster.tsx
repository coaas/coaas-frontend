import type { Server, Cluster as ClusterType } from '../model/types.ts';

export const Cluster = ({
  name,
  region,
  provider,
  servers,
  renderServer,
}: {
  renderServer: (props: Server) => React.ReactNode;
} & ClusterType) => {
  return (
    <div
      className="w-full rounded-sm p-8 flex flex-col items-start gap-4"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='white' stroke-width='1' stroke-dasharray='54%2c 24' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
      }}
    >
      <h3 className="text-2xl font-bold">
        {[name, region, provider].join(', ')}
      </h3>
      <div className="flex flex-wrap gap-4">{servers.map(renderServer)}</div>
    </div>
  );
};
