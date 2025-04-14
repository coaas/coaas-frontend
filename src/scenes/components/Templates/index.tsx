import { getTemplateFilters, getTemplates } from '@api/queries';
import { Banner } from '@components/Banner';
import { Select } from '@components/Select';
import { useInfiniteApiQuery, useApiQuery } from '@utils/lib/use-api-query';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { templateStatus, templateTypes } from './constants';
import { objectEntries } from '@utils/lib/object-entries';
import { Search } from '@components/Search';
import { Button } from '@components/Button';
import { Card, CardType } from '@components/Card';
import { TemplatesList } from './components/TemplatesList';
import { RouteMap } from '@components/Layout/components/types';

export const Templates = () => {
  const search = useLocation().search;
  const [searchParams, setSearchParams] = useSearchParams(search);
  const { query, categories, types, languages, status } = Object.fromEntries([
    ...searchParams.entries(),
  ]);

  const {
    data: filters = { categories: [], languages: [] },
    isLoading: filtersLoading,
  } = useApiQuery({
    request: getTemplateFilters,
  });

  const templateFilters = {
    ...filters,
    types: templateTypes,
    status: templateStatus,
  };

  const {
    entries,
    isLoading: templatesLoading,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteApiQuery({
    request: getTemplates,
    payload: {
      filters: {
        categories: (categories && JSON.parse(categories)) || [],
        languages: (languages && JSON.parse(languages)) || [],
        types: (types && JSON.parse(types)) || [],
        status: (status && JSON.parse(status)) || [],
      },
      query,
    },
  });

  const handleSearchChange = (value: string) =>
    setSearchParams(params => {
      if (value.length > 3) {
        params.set('query', value);
      } else {
        params.delete('query');
      }
      return params;
    });

  const handleFilterChange = (
    option: Option<string | number>,
    filterKey: keyof typeof templateFilters,
  ) => {
    setSearchParams(params => {
      const optionValue = option.value.toString();
      const currentFilters: (string | number)[] =
        JSON.parse(params.get(filterKey) || '[]') || [];
      const singleItem = currentFilters.length <= 1;
      const hasFilter = currentFilters.includes(optionValue);
      if (hasFilter) {
        if (singleItem) {
          params.delete(filterKey);
        } else {
          params.set(
            filterKey,
            JSON.stringify(currentFilters.filter(f => f !== optionValue)),
          );
        }
      } else {
        params.set(
          filterKey,
          JSON.stringify(currentFilters.concat(optionValue)),
        );
      }
      return params;
    });
  };

  return (
    <section className=" w-full m-auto max-w-[1268px] py-[70px]">
      <Banner
        title="Template Hub"
        subtitle={`Сервис предоставляет масштабируемые вычислительные мощности\nдля размещения и тестирования ваших проектов.`}
      />
      <div className="flex items-center gap-4 mt-5">
        <Search
          className="flex-2 max-w-[791px]"
          initValue={query}
          onChange={handleSearchChange}
          config={{ placeholder: 'Search templates', delay: 500 }}
        />
        {objectEntries(templateFilters).map(([filterKey, options]) =>
          filtersLoading ? (
            <div
              className="animate-pulse bg-stroke-gray rounded-md border-stroke border flex-1 min-w-[140px] min-h-[34px]"
              key={filterKey}
            />
          ) : (
            <Select
              key={filterKey}
              variant="filterView"
              onOptionChange={option => handleFilterChange(option, filterKey)}
              defaultLabel={filterKey}
              defaultValue={JSON.parse(searchParams.get(filterKey) || '[]')}
              options={options.map(({ key, value }) => ({
                label: value,
                value: key,
              }))}
              className="flex-1 max-w-[130px]"
              multiple
              withChevron
            />
          ),
        )}
      </div>
      <Link className="block mt-[14px]" to={RouteMap.templatesCreate}>
        <Button>Create template</Button>
      </Link>
      <TemplatesList
        className="flex flex-col gap-4 mt-[25px]"
        isFetching={isFetching || templatesLoading}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        scrollThreshold={200}
      >
        {entries.map(({ name, description }) => (
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
        ))}
      </TemplatesList>
    </section>
  );
};
