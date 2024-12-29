import type { IStudentInCourse } from 'src/types/tutor-adv';

import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { fIsAfter } from 'src/utils/format-time';

import { studentPayment } from 'src/actions/payment';

import { toast } from 'src/components/snackbar';

import { useAuthContext } from 'src/auth/hooks';

type Props = {
  tutorAdvId: string;
  startDate: string;
  students: IStudentInCourse[];
};
export default function StudentRegisterBtn({ tutorAdvId, startDate, students }: Props) {
  const { user, authenticated, unauthenticated } = useAuthContext();
  const router = useRouter();
  const isRegister =
    user?.role === 'Student' && students.some((student) => student.email === user.user.email);

  const isLate = fIsAfter(new Date(), startDate);

  const isLoading = useBoolean();

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (authenticated && isRegister)
    return (
      <Button
        variant="contained"
        color="info"
        size="large"
        sx={{
          mt: 2,
          ...(isLate && {
            pointerEvents: 'none',
          }),
        }}
      >
        Bạn đã ĐK khóa học này
      </Button>
    );

  const handleRegister = async () => {
    if (unauthenticated) {
      router.push(paths.auth.jwt.signInReturn(window.location.pathname));
    }
    if (isLate) {
      return;
    }
    try {
      isLoading.onTrue();
      const href = await studentPayment(tutorAdvId, user!.studentId);
      window.location.href = href;
    } catch (error) {
      console.error(error);
      toast.error('Đã có lỗi xảy ra!');
    } finally {
      isLoading.onFalse();
    }
  };

  return (
    <LoadingButton
      variant="contained"
      color={isLate ? 'error' : 'primary'}
      size="large"
      onClick={handleRegister}
      loading={isLoading.value}
      sx={{
        mt: 2,
        ...(isLate && {
          pointerEvents: 'none',
        }),
      }}
    >
      {isLate ? 'Khóa học đã bắt đầu' : 'Đăng ký khóa học'}
    </LoadingButton>
  );
}
