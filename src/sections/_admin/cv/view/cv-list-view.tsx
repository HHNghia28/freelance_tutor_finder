import type { ITutor } from 'src/types/tutor';

import { useMemo, useState } from 'react';

import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import { LoadingButton } from '@mui/lab';
import {
  DataGrid,
  gridClasses,
  GridActionsCellItem,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { DashboardContent } from 'src/layouts/dashboard';
import { tutorReject, useGetTutors, tutorApproved } from 'src/actions/tutor';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { baseColumns } from '../table/cv-columns';
import CVModalViewRow from '../cv-modal-view-row';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function CVListView() {
  const { tutors, tutorsLoading, tutorsMutate } = useGetTutors('waitting');
  const [rowSelect, setRowSelect] = useState<{
    tutor: ITutor;
    action: 'view' | 'reject' | 'approved';
  } | null>(null);

  const isProcessing = useBoolean();
  const handleApprovedOrReject = async () => {
    if (!rowSelect) return;
    try {
      isProcessing.onTrue();

      const isApproved = rowSelect?.action === 'approved';
      if (isApproved) {
        await tutorApproved(rowSelect?.tutor.id);
        toast.error(
          <>
            Đã từ chối gia sư <strong>{rowSelect.tutor.fullname}</strong>!
          </>
        );
      } else {
        await tutorReject(rowSelect?.tutor.id);
        toast.error(
          <>
            Đã từ chối gia sư <strong>{rowSelect.tutor.fullname}</strong>!
          </>
        );
      }
      tutorsMutate();
    } catch (error) {
      console.error(error);
      toast.error('Đã có lỗi xảy ra!');
    } finally {
      setRowSelect(null);
      isProcessing.onFalse();
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
        width: 100,
        getActions: (params: any) => [
          <GridActionsCellItem
            icon={<Iconify icon="raphael:view" />}
            label="Xem"
            onClick={() =>
              setRowSelect({
                tutor: params.row,
                action: 'view',
              })
            }
          />,
          <GridActionsCellItem
            icon={<Iconify icon="material-symbols:order-approve" />}
            label="Chấp nhận"
            sx={{ color: 'info.main' }}
            showInMenu
            onClick={() =>
              setRowSelect({
                tutor: params.row,
                action: 'approved',
              })
            }
          />,
          <GridActionsCellItem
            icon={<Iconify icon="icon-park-outline:doc-fail" />}
            label="Từ chối"
            sx={{ color: 'error.main' }}
            showInMenu
            onClick={() =>
              setRowSelect({
                tutor: params.row,
                action: 'reject',
              })
            }
          />,
        ],
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Duyệt CV"
          links={[
            { name: 'Trang chủ', href: paths.dashboard.root },
            { name: 'CV', href: paths.dashboard.cv },
            { name: 'Danh sách' },
          ]}
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
            rows={tutors.map((account) => ({ ...account, id: account.id as any }))}
            columns={columns as any}
            loading={tutorsLoading}
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
      <CVModalViewRow
        open={!!rowSelect && rowSelect.action === 'view'}
        tutorId={rowSelect?.tutor.id || ''}
        onClose={() => setRowSelect(null)}
      />
      <ConfirmDialog
        open={!!rowSelect && rowSelect.action !== 'view'}
        onClose={() => setRowSelect(null)}
        title={rowSelect?.action === 'approved' ? 'Chấp nhận gia sư' : 'Từ chối gia sư'}
        content={
          rowSelect?.action === 'approved' ? (
            <>
              Bạn có chấp nhận gia sư <strong> {rowSelect?.tutor?.fullname} </strong>?
            </>
          ) : (
            <>
              Xác nhận từ chối gia sư <strong> {rowSelect?.tutor?.fullname} </strong>?
            </>
          )
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={handleApprovedOrReject}
            loading={isProcessing.value}
          >
            Xác nhận
          </LoadingButton>
        }
      />
    </>
  );
}
