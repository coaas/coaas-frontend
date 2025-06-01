import { CellType, TableData } from '@components/Table';
import { ServiceData } from '@globalTypes/services';

export const getTableData = (services: ServiceData[]): TableData<WithId> => ({
  rows:
    services.map(({ name, description, created_at, id }) => ({
      cells: [
        {
          type: CellType.text,
          data: {
            title: name,
          },
        },
        {
          type: CellType.text,
          data: {
            title: description,
          },
        },
        {
          type: CellType.date,
          data: {
            date: new Date(created_at),
          },
        },
      ],
      onClickInfo: { id },
    })) || [],
});
