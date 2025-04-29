import { Banner } from '@components/Banner';
import { Link } from 'react-router-dom';
import { Card, CardType } from '@components/Card';
import { RouteMap } from '@components/Layout/components/types';
import { createDynamicPath } from '@utils/lib/create-dynamic-path';
import { useCurrentUserTemplates } from '@scenes/components/CurrentUserTemplates/useCurrentUserTemplates';
import { cn } from '@utils/styles';
import { Draft, Template } from '@globalTypes/templates';

const Section = (props: { name: string; entries: Template[] | Draft[] }) => {
  const { name, entries } = props;

  return (
    <>
      <div className="mt-5">
        <h4 className="font-semibold text-xl">{name}</h4>
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
        <h5 style={{ textTransform: 'capitalize' }}>{name}</h5>
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
    </>
  );
};

export const CurrentUserTemplates = () => {
  const { drafts, templates } = useCurrentUserTemplates();

  return (
    <section className=" w-full m-auto max-w-[1268px] py-[70px] px-3.5">
      <Banner
        title="Template Hub"
        subtitle={`Сервис предоставляет масштабируемые вычислительные мощности\nдля размещения и тестирования ваших проектов.`}
      />
      <Section name={'шаблоны'} entries={templates} />
      <Section name={'черновики'} entries={drafts} />
    </section>
  );
};
