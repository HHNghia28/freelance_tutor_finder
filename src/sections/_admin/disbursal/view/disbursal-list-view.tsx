import type { ITutorAdv } from 'src/types/tutor-adv';

import { useMemo, useState } from 'react';

import Card from '@mui/material/Card';
import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import { DataGrid, gridClasses, GridToolbarQuickFilter } from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';
import { disbursalTutorAdv, useGetTutorAdvDisbursals } from 'src/actions/tutor-adv';

import { toast } from 'src/components/snackbar';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { baseColumns } from '../table/columns';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function DisbursalListView() {
  const [tutorAdv, setTutorAdv] = useState<ITutorAdv | null>(null);

  const { tutorAdvs, tutorAdvsLoading, tutorAdvsMutate } = useGetTutorAdvDisbursals();

  const isConfirm = useBoolean();

  const handlePay = async () => {
    try {
      isConfirm.onTrue();
      await disbursalTutorAdv(tutorAdv!.id);
      tutorAdvsMutate();
      toast.success('Giải ngân thành công!');
    } catch (error) {
      console.error(error);
      toast.error('Đã có lỗi xảy ra!');
    } finally {
      isConfirm.onFalse();
      setTutorAdv(null);
    }
  };

  const columns = useMemo(
    () => [
      ...baseColumns,
      {
        type: 'actions',
        field: 'actions',
        headerName: 'Hành động',
        align: 'center',
        headerAlign: 'center',
        width: 150,
        renderCell: (params: any) => (
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              setTutorAdv(params.row);
            }}
          >
            Giải ngân
          </Button>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Danh sách giải ngân"
          links={[{ name: 'Trang chủ', href: paths.dashboard.root }, { name: 'Danh sách' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
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
            rows={tutorAdvs as any}
            columns={columns as any}
            loading={tutorAdvsLoading}
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

      <ConfirmDialog
        open={!!tutorAdv}
        onClose={() => setTutorAdv(null)}
        title="Xác nhận giải ngân"
        content={
          <>
            Giải ngân cho bài đăng <strong> {tutorAdv?.title} </strong>?
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={handlePay}
            loading={isConfirm.value}
          >
            Xác nhận
          </LoadingButton>
        }
      />
    </>
  );
}
