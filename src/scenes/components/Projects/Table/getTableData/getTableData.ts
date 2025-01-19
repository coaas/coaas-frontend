import { CellType, TableData } from '@components/Table';
import { ProjectData } from '@globalTypes/projects';

export const getTableData = (namespaces: ProjectData[]): TableData => ({
  rows:
    namespaces.map(
      ({ name, slug, description, members_count, created_at }) => ({
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
            type: CellType.text,
            data: {
              title: slug,
            },
          },
          {
            type: CellType.number,
            data: {
              value: members_count,
            },
          },
          {
            type: CellType.date,
            data: {
              date: new Date(created_at),
            },
          },
        ],
      }),
    ) || [],
});
