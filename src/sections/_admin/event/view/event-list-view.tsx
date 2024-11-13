import type { IEvent } from 'src/types/event';

import { useMemo, useState } from 'react';

import Card from '@mui/material/Card';
import { LoadingButton } from '@mui/lab';
import { Box, Button } from '@mui/material';
import {
  DataGrid,
  gridClasses,
  GridActionsCellItem,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { fTimestamp } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';
import { deleteEvent, useGetEvents } from 'src/actions/event';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { baseColumns } from '../table/event-column';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function EventListView() {
  const router = useRouter();
  const { events, eventsLoading, eventsMutate } = useGetEvents();
  const [rowSelect, setRowSelect] = useState<IEvent | null>(null);

  const isProcessing = useBoolean();

  const recentEvents = useMemo(
    () =>
      events.toSorted(
        (a, b) => (fTimestamp(b.updateDate) as any) - (fTimestamp(a.updateDate) as any)
      ),
    [events]
  );
  const columns = useMemo(
    () => [
      ...baseColumns,
      {
        type: 'actions',
        field: 'actions',
        headerName: 'Hành động',
        align: 'center',
        headerAlign: 'center',
        width: 100,
        getActions: (params: any) => [
          <GridActionsCellItem
            icon={<Iconify icon="solar:pen-bold" />}
            label="Chỉnh sửa"
            showInMenu
            onClick={() => router.push(paths.dashboard.news.edit(params.id))}
          />,
          <GridActionsCellItem
            icon={<Iconify icon="solar:trash-bin-trash-bold" />}
            label="Xóa"
            sx={{ color: 'error.main' }}
            showInMenu
            onClick={() => setRowSelect(params.row)}
          />,
        ],
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleRemove = async () => {
    try {
      isProcessing.onTrue();
      await deleteEvent(rowSelect!.id!);
      toast.success('Xóa dữ liệu thành công!');
      eventsMutate();
    } catch (error) {
      toast.error('Đã có lỗi xảy ra!');
    } finally {
      isProcessing.onFalse();
      setRowSelect(null);
    }
  };
  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Tin tức"
          links={[
            { name: 'Trang chủ', href: paths.dashboard.root },
            { name: 'Tin tức', href: paths.dashboard.news.list },
            { name: 'Danh sách' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
          action={
            <Button variant="contained" LinkComponent={RouterLink} href={paths.dashboard.news.new}>
              Thêm tin mới
            </Button>
          }
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
            rows={recentEvents as any}
            columns={columns as any}
            loading={eventsLoading}
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
                    p: 0.5,
                    pb: 0,
                    mr: 0,
                    ml: 'auto',
                  }}
                >
                  <GridToolbarQuickFilter autoComplete="false" size="small" />
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
        open={!!rowSelect}
        onClose={() => setRowSelect(null)}
        title="Xác nhận xóa dòng này?"
        content={
          <>
            Bạn chắc chắn xóa <strong> {rowSelect?.title} </strong>?
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={handleRemove}
            loading={isProcessing.value}
          >
            Xác nhận
          </LoadingButton>
        }
      />
    </>
  );
}
