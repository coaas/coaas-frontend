import { CellType, TableData } from '@components/Table';
import { Invitation } from '@scenes/components/StaffInvitations/useIvitations/useData/types';

export const getTableData = (
  invitations: Invitation[],
  resendInvitation: (i: Invitation) => void,
): TableData => ({
  rows:
    invitations.map(invitation => ({
      cells: [
        {
          type: CellType.text,
          data: {
            title: invitation.email,
          },
        },
        {
          type: CellType.text,
          data: {
            title: invitation.username,
          },
        },
        {
          type: CellType.date,
          data: {
            date: new Date(invitation.expires_at),
          },
        },
        {
          type: CellType.button,
          data: {
            children: 'Resend invitation',
            onClick: () => resendInvitation(invitation),
          },
        },
      ],
    })) || [],
});
