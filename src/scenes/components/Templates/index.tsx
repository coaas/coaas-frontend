// import { getTemplates } from '@api/queries';
// import { Select } from '@components/Select';
// import { useQuery } from '@utils/lib/use-query';
// import { useState } from 'react';
import { Banner } from '@components/Banner';

export const Templates = () => {
  // const { data } = useQuery({
  //   query: getTemplates,
  //   body: {
  //     filters: { categories: [], languages: [], types: [] },
  //   },
  // });

  // const [filters, setFilters] = useState<Option<string | number>[]>([]);

  // const handleFilterChange = (option: Option<string | number>) => {
  //   setFilters(filters =>
  //     filters.find(filter => filter.label === option.label)
  //       ? filters.filter(el => el.value !== option.value)
  //       : [...filters, option],
  //   );
  // };

  return (
    <section className=" w-full m-auto max-w-[1268px] py-[70px]">
      <Banner
        title="Template Hub"
        subtitle={`Сервис предоставляет масштабируемые вычислительные мощности\nдля размещения и тестирования ваших проектов.`}
      />
      {/* <Select
        className={'min-w-[137px] max-w-[137px]'}
        onOptionChange={handleFilterChange}
        multiple
        defaultOption={{ label: 'languages', value: '' }}
        options={[
          { label: 'python', value: 'python' },
          { label: 'javascript', value: 'javascript' },
          { label: 'go', value: 'go' },
        ]}
      /> */}
    </section>
  );
};
