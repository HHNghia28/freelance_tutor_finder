import type { IUserItem, IUserTableFilters } from 'src/types/user';

import { useMemo } from 'react';

import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import {
  DataGrid,
  gridClasses,
  GridActionsCellItem,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { useGetAccounts } from 'src/actions/account';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { baseColumns } from '../table/columns';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function UserListView() {
  const { accounts, accountsLoading } = useGetAccounts();

  const confirm = useBoolean();

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
        getActions: () => [
          <GridActionsCellItem icon={<Iconify icon="raphael:view" />} label="Xem" />,
          <GridActionsCellItem
            icon={<Iconify icon="solar:pen-bold" />}
            label="Chỉnh sửa"
            showInMenu
          />,
          <GridActionsCellItem
            icon={<Iconify icon="solar:trash-bin-trash-bold" />}
            label="Xóa"
            sx={{ color: 'error.main' }}
            showInMenu
          />,
        ],
      },
    ],
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
            rows={accounts.map((account) => ({ ...account, id: account.userId as any }))}
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

      {/* <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      /> */}
    </>
  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: IUserItem[];
  filters: IUserTableFilters;
  comparator: (a: any, b: any) => number;
};

function applyFilter({ inputData, comparator, filters }: ApplyFilterProps) {
  const { name, status, role } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((user) => user.status === status);
  }

  if (role.length) {
    inputData = inputData.filter((user) => role.includes(user.role));
  }

  return inputData;
}
