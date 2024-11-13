import type { IPayment } from 'src/types/payment';
import type { GridColDef } from '@mui/x-data-grid';

import { fDateTime } from 'src/utils/format-time';
import { fPercent, fCurrency } from 'src/utils/format-number';

export const baseColumns: GridColDef<IPayment>[] = [
  {
    field: 'invoiceAmount',

    headerName: 'Tổng tiền',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    minWidth: 200,
    valueFormatter: (value) => fCurrency(value),
  },
  {
    field: 'discount',
    headerName: 'Giảm giá',
    headerAlign: 'center',
    align: 'center',
    minWidth: 120,
    flex: 1,
    renderCell: (params) => (
      <>
        {fPercent(params.value)} ({fCurrency(params.row.invoiceAmount * (params.value / 100))})
      </>
    ),
  },

  {
    field: 'amountCharged',
    flex: 1,
    headerName: 'Thực trả',
    headerAlign: 'center',
    minWidth: 200,
    align: 'center',
  },
  {
    field: 'timeCharge',
    headerName: 'Ngày thanh toán',
    flex: 1,
    headerAlign: 'center',
    minWidth: 200,
    align: 'center',
    valueFormatter: (value) => fDateTime(value),
  },
  {
    field: 'note',
    flex: 2,
    headerName: 'Ghi chú',
  },
];
