import type { ITutorAdv } from 'src/types/tutor-adv';

import { useMemo } from 'react';

import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, IconButton, ButtonGroup } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { fTimestamp } from 'src/utils/format-time';

import { payment } from 'src/actions/payment';
import { deleteTutorAdv, useGetMyTutorAdv } from 'src/actions/tutor-adv';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';

import TutorAdvCard from 'src/sections/_partials/tutor-adv-card';
import LoadingIndicate from 'src/sections/_partials/loading-indicate';

import { useAuthContext } from 'src/auth/hooks';

export default function MyCourseList() {
  const router = useRouter();
  const { user } = useAuthContext();
  const isTutor = user?.role === 'Tutor';
  const id = isTutor ? user.tutorId : user?.studentId;

  const { tutorAdvs, tutorAdvsLoading, tutorAdvsEmpty, tutorAdvsMutate } = useGetMyTutorAdv(
    id,
    isTutor
  );

  const recentTutors = useMemo(
    () =>
      tutorAdvs.toSorted(
        (a, b) => (fTimestamp(b.updateDate) as any) - (fTimestamp(a.updateDate) as any)
      ),
    [tutorAdvs]
  );

  if (tutorAdvsLoading) return <LoadingIndicate />;

  if (tutorAdvsEmpty) return <EmptyContent title="Chưa có khóa học nào thuộc về bạn" />;

  return (
    <Grid container spacing={3}>
      {recentTutors.map((course) => (
        <Grid xs={12} sm={6} md={4} key={course.id} sx={{}}>
          <TutorAdvItem
            isTutor={isTutor}
            mutate={tutorAdvsMutate}
            router={router}
            tutorAdv={course}
          />
        </Grid>
      ))}
    </Grid>
  );
}
type TutorAdvItemProps = {
  tutorAdv: ITutorAdv;
  mutate: any;
  isTutor: boolean;
  router: any;
};
function TutorAdvItem({ router, tutorAdv, mutate, isTutor }: TutorAdvItemProps) {
  const deleteConfirm = useBoolean();

  const deleting = useBoolean();

  const paying = useBoolean();

  const handleDelete = async () => {
    try {
      deleting.onTrue();
      await deleteTutorAdv(tutorAdv.id);

      mutate();
      toast.success('Xóa bài đăng thành công');
    } catch (error) {
      console.error(error);
      toast.error('Đã có lỗi xảy ra');
    } finally {
      deleting.onFalse();
    }
  };

  const handlePay = async () => {
    try {
      paying.onTrue();
      const data = await payment(tutorAdv.id);
      window.location.href = data;
    } catch (error) {
      console.error(error);
    } finally {
      paying.onFalse();
    }
  };
  return (
    <>
      <Box sx={{ position: 'relative', height: 1 }}>
        <TutorAdvCard tutorAdv={tutorAdv} />
        {isTutor && (
          <>
            <ButtonGroup sx={{ position: 'absolute', top: 4, right: 4 }}>
              <IconButton
                size="small"
                onClick={() => {
                  router.push(paths.user.my_course.update(tutorAdv.id));
                }}
              >
                <Iconify icon="icon-park-solid:edit" color="error.warning" />
              </IconButton>
              <IconButton size="small" onClick={deleteConfirm.onTrue}>
                <Iconify
                  icon={deleting.value ? 'line-md:loading-loop' : 'clarity:remove-solid'}
                  color="error.main"
                />
              </IconButton>
            </ButtonGroup>

            {(tutorAdv.status === 'CANCEL' || tutorAdv.status === 'WAITTING') && (
              <LoadingButton
                variant="contained"
                color="error"
                sx={{ position: 'absolute', bottom: '41%', left: 8 }}
                onClick={handlePay}
                loading={paying.value}
              >
                Thanh toán ngay
              </LoadingButton>
            )}
          </>
        )}
      </Box>
      <ConfirmDialog
        open={deleteConfirm.value}
        onClose={deleteConfirm.onFalse}
        title="Xác nhận xóa bài đăng này?"
        content="Bạn có chắc chắn muốn xóa bài đăng này?"
        action={
          <LoadingButton
            loading={deleting.value}
            onClick={handleDelete}
            variant="contained"
            color="error"
          >
            Xóa
          </LoadingButton>
        }
      />
    </>
  );
}
