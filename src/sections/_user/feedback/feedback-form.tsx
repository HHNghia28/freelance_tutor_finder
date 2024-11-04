import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';

import { useRouter } from 'src/routes/hooks';

import { createFeedback } from 'src/actions/feedback';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from '../../../auth/hooks';
import { FeedbackSchema } from './form/feedback-schema';

import type { FeedbackSchemaType } from './form/feedback-schema';

type Props = {
  courseId: string;
};
export default function FeedbackForm({ courseId }: Props) {
  const router = useRouter();

  const { user } = useAuthContext();

  const defaultValues = useMemo(
    () => ({
      tutorAdvertisementsId: courseId || '',
      studentId: user?.studentId || '',
      message: '',
    }),
    [user, courseId]
  );

  const methods = useForm<FeedbackSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(FeedbackSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createFeedback(data);

      toast.success('Cảm ơn bạn đã để lại đánh giá!');

      setTimeout(() => {
        reset();
        router.refresh();
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error('Đã có lỗi xảy ra!');
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2}>
        <Field.Text
          multiline
          minRows={2}
          maxRows={4}
          name="message"
          label="Đánh giá về khóa học này"
          placeholder="Để lại đánh giá.."
        />

        <LoadingButton
          loading={isSubmitting}
          type="submit"
          variant="contained"
          size="small"
          sx={{ ml: 'auto', minWidth: 200 }}
        >
          Gửi
        </LoadingButton>
      </Stack>
    </Form>
  );
}
