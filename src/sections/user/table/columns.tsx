import type { IAccount } from 'src/types/account';
import type { GridColDef } from '@mui/x-data-grid';

import { fDate } from 'src/utils/format-time';

export const baseColumns: GridColDef<IAccount>[] = [
  {
    field: 'userName',
    headerName: 'Username',
    width: 120,
    flex: 1,
  },
  {
    field: 'gender',
    headerName: 'Giới tính',
  },

  {
    field: 'phoneNumber',
    headerName: 'Số điện thoại',
    minWidth: 150,
  },
  {
    field: 'dateOfBirth',
    headerName: 'Ngày sinh',
    minWidth: 150,
    valueFormatter: (params) => fDate(params),
  },
  {
    field: 'registrationDate',
    headerName: 'Ngày Đk',
    minWidth: 150,
    valueFormatter: (params) => fDate(params),
  },
];
