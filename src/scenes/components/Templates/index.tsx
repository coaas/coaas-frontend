import { getTemplateFilters, getTemplates } from '@api/queries';
import { Banner } from '@components/Banner';
import { Select } from '@components/Select';
import { useIQuery, useQuery } from '@utils/lib/use-query';
import { useLocation, useSearchParams } from 'react-router-dom';
import { TemplateStatus, templateTypes } from './constants';
import { objectEntries } from '@utils/lib/object-entries';
import { Search } from '@components/Search';
import { Button } from '@components/Button';
import { Card, CardType } from '@components/Card';
import { TemplatesList } from './components/TemplatesList';

export const Templates = () => {
  const search = useLocation().search;
  const [searchParams, setSearchParams] = useSearchParams(search);
  const { query, categories, types, languages, status } = Object.fromEntries([
    ...searchParams.entries(),
  ]);

  const {
    data: filters = { categories: [], languages: [] },
    isLoading: filtersLoading,
  } = useQuery({
    query: getTemplateFilters,
  });

  const templateFilters = {
    ...filters,
    types: templateTypes,
    status: TemplateStatus,
  };

  const {
    data: templatesData,
    isLoading: templatesLoading,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useIQuery(getTemplates, {
    filters: {
      categories: (categories && categories.split(',')) || [],
      languages: (languages && languages.split(',')) || [],
      types: (types && types.split(',').map(Number)) || [],
      status: (status && status.split(',').map(Number)) || [],
    },
    query,
  });

  const templates =
    templatesData?.pages?.flatMap(({ templates }) => templates) || [];

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
      const currentFilters = (params.get(filterKey) || '')
        .split(',')
        .filter(Boolean);
      const singleItem = currentFilters.length <= 1;
      const hasFilter = currentFilters.includes(optionValue);
      if (hasFilter) {
        if (singleItem) {
          params.delete(filterKey);
        } else {
          params.set(
            filterKey,
            currentFilters.filter(f => f !== optionValue).join(','),
          );
        }
      } else {
        params.set(filterKey, currentFilters.concat(optionValue).join(','));
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
              className="animate-pulse bg-area-dark rounded-md border-stroke border flex-1 min-w-[140px] min-h-[34px]"
              key={filterKey}
            />
          ) : (
            <Select
              key={filterKey}
              withSearch
              onOptionChange={option => handleFilterChange(option, filterKey)}
              defaultLabel={filterKey}
              defaultValue={searchParams
                .get(filterKey)
                ?.split(',')
                .map(value => ({
                  label: options.find(el => el.value === value)?.key || '',
                  value,
                }))}
              options={options.map(({ key, value }) => ({ label: key, value }))}
              className="flex-1 max-w-[130px]"
              multiple
            />
          ),
        )}
      </div>
      <Button className="block mt-[14px]">Create template</Button>
      <TemplatesList
        className="flex flex-col gap-4 mt-[25px]"
        isFetching={isFetching || templatesLoading}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        scrollThreshold={200}
      >
        {templates.map(({ name, description }) => (
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
