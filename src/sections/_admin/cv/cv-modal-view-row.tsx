import type { DialogProps } from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Stack,
  Button,
  Dialog,
  Divider,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  CircularProgress,
} from '@mui/material';

import { fDate } from 'src/utils/format-time';

import { useGetTutor } from 'src/actions/tutor';

import SimpleImage from 'src/sections/_partials/simple-image';

type Props = Omit<DialogProps, 'children'> & {
  tutorId: string;
};
export default function CVModalViewRow({ tutorId, ...dialogProps }: Props) {
  const { tutor, tutorLoading, tutorEmpty } = useGetTutor(tutorId);

  return (
    <Dialog
      PaperProps={{
        sx: {
          maxWidth: 'md',
          width: '90%',
        },
      }}
      {...dialogProps}
    >
      <DialogTitle>Xem thông tin gia sư</DialogTitle>
      <DialogContent>
        {tutorLoading && (
          <Stack alignItems="center" justifyContent="center" sx={{ height: 400 }}>
            <CircularProgress size={60} />
          </Stack>
        )}
        {!tutorLoading && !tutorEmpty && (
          <Grid container>
            <Grid xs={12} md={6}>
              <Box sx={{ mb: 3 }}>
                <SimpleImage
                  src={tutor?.photo || ''}
                  alt={tutor?.fullname || ''}
                  sx={{ width: 220, height: 220, mx: 'auto', borderRadius: 11000 }}
                />
              </Box>
              <Stack
                spacing={2}
                alignItems="center"
                justifyContent="center"
                sx={{ textAlign: 'center' }}
              >
                <Block
                  label="Họ và tên - Giới tính"
                  value={`${tutor?.fullname} - ${tutor?.gender === 'male' ? 'Nam' : 'Nữ'}`}
                />
                <Block label="Số điện thoại" value={tutor?.phoneNumber} />
              </Stack>

              <Button
                href={tutor?.cvUrl || '.'}
                target="_blank"
                variant="contained"
                color="primary"
                sx={{
                  maxWidth: 300,
                  width: 1,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  mt: 2,
                }}
              >
                Xem CV
              </Button>
            </Grid>
            <Grid xs={12} md={6}>
              <Stack spacing={2}>
                <Block label="Giới thiệu" value={tutor?.selfIntroduction} />
                <Block label="Thành tựu" value={tutor?.teachingAchievement} />
                <Block label="Điểm nổi bật" value={tutor?.academicSpecialty} />
                <Block label="Ngày đăng kí" value={fDate(tutor?.registrationDate)} />
                <Divider />
                <Block label="Số CCCD/CMND" value={fDate(tutor?.citizenId)} />
                <Block label="Địa chỉ" value={tutor?.location} />
                <Block label="Ngày sinh" value={fDate(tutor?.dateOfBirth)} />
              </Stack>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogProps?.onClose as any}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}

type BlockProps = {
  label: any;
  value: any;
};
function Block({ value, label }: BlockProps) {
  return (
    <Box>
      <Typography sx={{ display: 'block' }} variant="body2">
        {label}
      </Typography>
      <Typography sx={{ display: 'block' }} variant="subtitle1">
        {value}
      </Typography>
    </Box>
  );
}
