import type { IEvent } from 'src/types/event';
import type { GridColDef } from '@mui/x-data-grid';

import { fDateTime } from 'src/utils/format-time';

import SimpleImage from 'src/sections/_partials/simple-image';

export const baseColumns: GridColDef<IEvent>[] = [
  {
    field: 'thumbnail',
    width: 120,
    headerName: 'Thumbnail',
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => <SimpleImage src={params.value} alt={params.row.title} />,
  },
  {
    field: 'title',
    headerName: 'Tiêu đề',
    width: 120,
    flex: 1,
  },

  {
    field: 'tutorName',
    headerName: 'Tác giả',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'createDate',
    headerName: 'Ngày đăng',
    flex: 1,
    minWidth: 150,
    valueFormatter: (value) => fDateTime(value),
  },
];
