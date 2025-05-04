import { CellType, TableData } from '@components/Table';
import { MemberData } from '@globalTypes/members';

export const getTableData = (members: MemberData[]): TableData => ({
  rows:
    members.map(({ joined_at, user: { first_name, last_name, username } }) => ({
      cells: [
        {
          type: CellType.text,
          data: {
            title: first_name,
          },
        },
        {
          type: CellType.text,
          data: {
            title: last_name,
          },
        },
        {
          type: CellType.text,
          data: {
            title: username,
          },
        },
        {
          type: CellType.date,
          data: {
            date: new Date(joined_at),
          },
        },
      ],
    })) || [],
});
