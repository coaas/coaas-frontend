import { Banner } from '@components/Banner';
import { Link } from 'react-router-dom';
import { Card, CardType } from '@components/Card';
import { RouteMap } from '@components/Layout/components/types';
import { createDynamicPath } from '@utils/lib/create-dynamic-path';
import { useMyTemplates } from '@scenes/components/MyTemplates/useMyTemplates';
import { cn } from '@utils/styles';

export const MyTemplates = () => {
  const entries = useMyTemplates();

  return (
    <section className=" w-full m-auto max-w-[1268px] py-[70px]">
      <Banner
        title="Template Hub"
        subtitle={`Сервис предоставляет масштабируемые вычислительные мощности\nдля размещения и тестирования ваших проектов.`}
      />
      <div className="mt-5">
        <h4 className="font-semibold text-xl">Мои шаблоны</h4>
      </div>
      {entries.length > 0 && (
        <div className="mt-5">
          <p className=" text-[16px] leading-[33px] text-white font-semibold">
            {`Result${entries.length > 0 ? 's' : ''}: `}
            <span className="text-blue">{entries.length}</span>
          </p>
        </div>
      )}
      <div className={cn('max-h-[564px] overflow-auto mt-5')}>
        {entries.map(({ name, description, id }, key) => (
          <Link
            key={key}
            to={createDynamicPath(RouteMap.template, { template_slug: id })}
          >
            <Card
              type={CardType.simpleInfo}
              Wrapper={({ children, className }) => (
                <div className={className}>{children}</div>
              )}
              props={{
                data: {
                  title: name,
                  subtitle: description,
                },
              }}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};
