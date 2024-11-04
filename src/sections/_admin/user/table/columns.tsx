import type { IAccount } from 'src/types/account';
import type { GridColDef } from '@mui/x-data-grid';

import Box from '@mui/material/Box';
import SimpleImage from 'src/sections/_partials/simple-image';

export const baseColumns: GridColDef<IAccount>[] = [
  {
    field: 'photo',
    width: 120,
    headerName: 'Hình đại diện',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => <SimpleImage src={params.value} alt={params.row.fullname} />,
  },
  {
    field: 'fullname',
    headerName: 'Họ và tên',
    width: 120,
    flex: 1,
  },

  {
    field: 'phoneNumber',
    headerName: 'Số điện thoại',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    minWidth: 150,
  },
];
