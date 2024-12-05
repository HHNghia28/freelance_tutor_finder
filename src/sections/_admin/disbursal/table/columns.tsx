import type { GridColDef } from '@mui/x-data-grid';
import type { ITutorAdv } from 'src/types/tutor-adv';

import { Box, Avatar, Typography } from '@mui/material';

import { fCurrency } from 'src/utils/format-number';

import { maxLine } from 'src/theme/styles';

import SimpleImage from 'src/sections/_partials/simple-image';

export const baseColumns: GridColDef<ITutorAdv>[] = [
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
    field: 'fullname',
    headerName: 'Gia sư',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => (
      <Box display="flex" flexDirection="row" minWidth={0} alignItems="center">
        <Avatar
          src={params.row.photo}
          alt={params.row.fullname}
          sx={{ width: 56, height: 56, mr: 1 }}
        />
        <Box>
          <Typography
            sx={{
              ...maxLine({
                line: 1,
              }),
            }}
            title={params.row.fullname}
            variant="subtitle1"
          >
            {params.row.fullname}
          </Typography>

          <Typography variant="caption" sx={{ display: 'block' }}>
            {params.row.phoneNumber}
          </Typography>
          <Typography variant="caption">{params.row.email}</Typography>
        </Box>
      </Box>
    ),
  },
  {
    field: 'totalPayment',
    headerName: 'Tổng tiền',
    flex: 1,
    minWidth: 150,
    valueFormatter: (value) => fCurrency(value),
  },
];
