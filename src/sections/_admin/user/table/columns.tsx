import type { IAccount } from 'src/types/account';
import type { GridColDef } from '@mui/x-data-grid';

import { Typography } from '@mui/material';

import { maxLine } from 'src/theme/styles';

import { Label } from 'src/components/label';

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
    renderCell: (params) => (
      <Typography
        sx={{
          ...maxLine({
            line: 2,
          }),
        }}
        title={params.value}
      >
        {params.value}
      </Typography>
    ),
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
    renderCell: (params) => (
      <Typography
        sx={{
          ...maxLine({
            line: 1,
          }),
        }}
        title={params.value}
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: 'role',
    headerName: 'Vai trò',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'isBlocked',
    headerName: 'Trạng thái',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <Label color={!params.value ? 'info' : 'error'}>
        {!params.value ? 'Hoạt động' : 'Bị chặn'}
      </Label>
    ),
  },
];
