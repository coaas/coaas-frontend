import { clsx } from 'clsx';
import { Dollar } from '@scenes/components/Deploy/components/icons';

const Service = ({ color }: { color: 'green' | 'red' | 'orange' }) => {
  const variants = {
    color: {
      green: 'bg-green/20 border-green',
      red: 'bg-error/20 border-error',
      orange: 'bg-orange/20 border-orange',
    },
    text: {
      green: 'text-green',
      red: 'text-error',
      orange: 'text-orange',
    },
  };

  return (
    <div
      className={clsx(
        'w-[334px] h-[52px] py-4 px-6 rounded-lg border',
        variants.color[color],
      )}
    >
      <div className="flex justify-between items-center">
        <p className={variants.text[color]}>Backend</p>
        <div className="flex gap-2 text-sm">
          <p>CPU: 2</p>
          <p>RAM: 4</p>
        </div>
      </div>
    </div>
  );
};

const Server = ({ status }: { status: 'active' | 'loaded' | 'died' }) => {
  const variants = {
    status: {
      active: 'text-green bg-green/20 border-green',
      loaded: 'text-orange bg-orange/20 border-orange',
      died: 'text-error bg-error/20 border-error',
    },
  };

  return (
    <div
      className="px-6 py-4 border border-stroke-gray-dark flex flex-col gap-2 rounded-lg"
      style={{
        backgroundImage:
          'linear-gradient(to bottom, rgba(50,53,72,0.7), rgba(50,53,72,0.2))',
      }}
    >
      <div className="flex justify-between">
        <p>administrator</p>
        <div className="flex gap-1 items-center">
          <p
            className={clsx(
              'px-2 py-0.5  text-xxs border-solid border-2 rounded-sm font-bold uppercase',
              variants.status[status],
            )}
          >
            {status}
          </p>
          <Dollar />
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-blue text-xl font-bold">k1l2m3n4o5p6</p>
        <div className="flex gap-2 text-blue-light text-xs">
          <p>CPU: 6/64</p>
          <p>RAM: 1024 GB</p>
          <p>Memory: 40.00 GB</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Service color={'green'} />
        <Service color={'orange'} />
        <Service color={'red'} />
      </div>
    </div>
  );
};

const Cluster = ({ name }: { name: string }) => {
  return (
    <div
      className="w-full rounded-sm p-8 flex flex-col items-start gap-4"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='white' stroke-width='1' stroke-dasharray='54%2c 24' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
      }}
    >
      <h3 className="text-2xl font-bold">{name}</h3>
      <div className="flex flex-wrap gap-4">
        <Server status={'active'} />
        <Server status={'loaded'} />
        <Server status={'died'} />
      </div>
    </div>
  );
};

export const Deploy = () => {
  return (
    <div className="flex flex-col mt-20 px-20 items-center gap-10">
      <Cluster name={'Russia (Moscow), ru-central-1, Yandex Cloud'} />
      <Cluster name={'Europe (Frankfurt), eu-central-1, AWS'} />
    </div>
  );
};
