import { useMemo } from 'react';

import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import { DataGrid, gridClasses, GridToolbarQuickFilter } from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';

import { fTimestamp } from 'src/utils/format-time';

import { useGetInvoices } from 'src/actions/payment';
import { DashboardContent } from 'src/layouts/dashboard';

import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { baseColumns } from '../table/columns';
import PaymentStatistic from '../payment-statistic';

// ----------------------------------------------------------------------

export default function PaymentListView() {
  const { invoices, invoicesLoading } = useGetInvoices();

  const recentInvoices = useMemo(
    () =>
      invoices.toSorted(
        (a, b) => (fTimestamp(b.timeCharge) as any) - (fTimestamp(a.timeCharge) as any)
      ),
    [invoices]
  );

  const columns = useMemo(
    () => [...baseColumns],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Thanh toán"
        links={[
          { name: 'Trang chủ', href: paths.dashboard.root },
          { name: 'Thanh toán', href: paths.dashboard.payment },
          { name: 'Danh sách' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <PaymentStatistic />
      <Card
        sx={{
          width: 1,
        }}
      >
        <DataGrid
          checkboxSelection
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnMenu
          rows={recentInvoices}
          columns={columns as any}
          loading={invoicesLoading}
          getRowHeight={() => 'auto'}
          pageSizeOptions={[5, 10, 25]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          // onRowSelectionModelChange={(newSelectionModel) => setSelectedRowIds(newSelectionModel)}

          slots={{
            noRowsOverlay: () => <EmptyContent title="Bảng rỗng!" />,
            noResultsOverlay: () => <EmptyContent title="Không có kêt quả tìm kiếm" />,
            toolbar: () => (
              <Box
                sx={{
                  p: 1,

                  mr: 0,
                  ml: 'auto',
                }}
              >
                <GridToolbarQuickFilter autoComplete="false" size="small" debounceMs={500} />
              </Box>
            ),
          }}
          // slotProps={{
          //   toolbar: {
          //     showQuickFilter: true,
          //   },
          // }}
          sx={{
            [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' },

            [`& .${gridClasses.overlayWrapper}`]: {
              minHeight: 300,
            },
          }}
        />
      </Card>
    </DashboardContent>
  );
}
