import type { IAccount } from 'src/types/account';

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
import { blockAccount, useGetAccounts } from 'src/actions/account';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { baseColumns } from '../table/columns';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function AccountListView() {
  const [userBlock, setUserBlock] = useState<IAccount | null>(null);

  const { accounts, accountsLoading } = useGetAccounts();
  const isBlocking = useBoolean();

  const handleBlock = async () => {
    try {
      isBlocking.onTrue();
      await blockAccount(userBlock!.id);

      toast.error('Chặn tài khoản thành công!');
    } catch (error) {
      console.error(error);
      toast.error('Đã có lỗi xảy ra!');
    } finally {
      isBlocking.onFalse();
      setUserBlock(null);
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
          // <GridActionsCellItem
          //   icon={<Iconify icon="solar:pen-bold" />}
          //   label="Chỉnh sửa"
          //   showInMenu
          // />,
          // <GridActionsCellItem
          //   icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          //   label="Xóa"
          //   sx={{ color: 'error.main' }}
          //   showInMenu
          // />,
          <GridActionsCellItem
            icon={<Iconify icon="ic:baseline-block" />}
            label="Chặn"
            sx={{ color: 'warning.main' }}
            onClick={() => {
              setUserBlock(params.row);
            }}
            showInMenu
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
          heading="Quản lý tài khoản"
          links={[
            { name: 'Trang chủ', href: paths.dashboard.root },
            { name: 'Tài khoản', href: paths.dashboard.user.root },
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
            rows={accounts.map((account) => ({ ...account, id: account.id as any }))}
            columns={columns as any}
            loading={accountsLoading}
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
        open={!!userBlock}
        onClose={() => setUserBlock(null)}
        title="Chặn tài khoản"
        content={
          <>
            Bạn có chắc muốn chặn tài khoản <strong> {userBlock?.fullname} </strong>?
          </>
        }
        action={
          <LoadingButton
            variant="contained"
            color="error"
            onClick={handleBlock}
            loading={isBlocking.value}
          >
            Chặn
          </LoadingButton>
        }
      />
    </>
  );
}
