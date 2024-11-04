import type { ITutor } from 'src/types/tutor';
import type { GridColDef } from '@mui/x-data-grid';

import { Button } from '@mui/material';

import SimpleImage from 'src/sections/_partials/simple-image';

export const baseColumns: GridColDef<ITutor>[] = [
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
    field: 'cvUrl',
    headerName: 'CV',
    flex: 1,
    minWidth: 150,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Button variant="contained" color="primary" href={params.value} target="_blank">
        Xem CV
      </Button>
    ),
  },
];
