import type { IAccount } from 'src/types/account';

import { useMemo, useState } from 'react';

import Card from '@mui/material/Card';
import { LoadingButton } from '@mui/lab';
import { Box, MenuItem, TextField, IconButton } from '@mui/material';
import {
  DataGrid,
  gridClasses,
  GridActionsCellItem,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { DashboardContent } from 'src/layouts/dashboard';
import { blockAccount, unblockAccount, useGetAccounts } from 'src/actions/account';

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
  const filters = useSetState<{
    isBlock: any;
  }>({
    isBlock: null,
  });

  const { accounts, accountsLoading, accountsMutate } = useGetAccounts();

  const isBlocking = useBoolean();

  const dataFiltered = useMemo(() => {
    if (filters.state.isBlock !== null)
      return accounts.filter((account) => account.isBlocked === !!filters.state.isBlock);
    return accounts;
  }, [accounts, filters.state.isBlock]);

  const handleBlock = async () => {
    try {
      isBlocking.onTrue();
      await blockAccount(userBlock!.id);
      accountsMutate();
      toast.success('Chặn tài khoản thành công!');
    } catch (error) {
      console.error(error);
      toast.error('Đã có lỗi xảy ra!');
    } finally {
      isBlocking.onFalse();
      setUserBlock(null);
    }
  };
  const handleUnblock = async (id: string) => {
    try {
      isBlocking.onTrue();
      await unblockAccount(id);
      accountsMutate();
      toast.success('Bỏ chặn tài khoản thành công!');
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
          <GridActionsCellItem
            icon={<Iconify icon="fa6-solid:shield-halved" />}
            label="Chặn/Bỏ chặn"
            sx={{ color: 'warning.main' }}
            onClick={() => {
              console.log(params);
              if (params.row.isBlocked) handleUnblock(params.id as any);
              else setUserBlock(params.row);
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
            rows={dataFiltered as any}
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
                    p: 1,

                    width: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box sx={{ maxWidth: 200, width: 1 }}>
                    <TextField
                      fullWidth
                      label="Trạng thái"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      select
                      size="small"
                      value={filters.state.isBlock}
                      onChange={(event) => filters.setField('isBlock', event.target.value)}
                      InputProps={{
                        ...(filters.state.isBlock !== null && {
                          startAdornment: (
                            // <InputAdornment position="start">
                            <IconButton
                              onClick={() => filters.setField('isBlock', null)}
                              size="small"
                              sx={{
                                color: '#333',
                                '&:hover': {
                                  color: 'red',
                                },
                              }}
                            >
                              <Iconify icon="solar:close-circle-linear" width={14} height={14} />
                            </IconButton>
                            // </InputAdornment>
                          ),
                        }),
                      }}
                    >
                      <MenuItem value={1}>Bị chặn</MenuItem>
                      <MenuItem value={0}>Hoạt động</MenuItem>
                    </TextField>
                    {filters.state.isBlock !== null}
                  </Box>

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
