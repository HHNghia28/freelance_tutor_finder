import type { ITutorAdv } from 'src/types/tutor-adv';

import { useMemo } from 'react';

import { Box, Paper, Stack, Avatar, IconButton, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { maxLine, varAlpha } from 'src/theme/styles';
import { addToFavorite, removeFavorite, useGetMyTutorAdv } from 'src/actions/tutor-adv';

import { Image } from 'src/components/image';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';

import { useAuthContext } from 'src/auth/hooks';

import BriefTutorAdv from './brief-tutor-adv';

type Props = {
  tutorAdv: ITutorAdv;
};
export default function TutorAdvCard({ tutorAdv }: Props) {
  const router = useRouter();
  const { user, unauthenticated } = useAuthContext();
  const { tutorAdvs, tutorAdvsMutate } = useGetMyTutorAdv(user?.studentId || '');

  const isShowFavoriteBtn = user?.role === 'Student' || unauthenticated;

  const isAdding = useBoolean();

  const isFavorited = useMemo(
    () => !!tutorAdvs.find((adv) => adv.id === tutorAdv.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tutorAdvs, tutorAdv.id, isAdding.value]
  );

  const handleFavorite = async () => {
    if (unauthenticated) {
      router.push(paths.auth.jwt.signIn);
      return;
    }

    try {
      isAdding.onTrue();
      if (isFavorited) {
        await removeFavorite({
          studentId: user!.studentId,
          tutorAdvertisementsId: tutorAdv.id,
        });
      } else {
        await addToFavorite({
          studentId: user!.studentId,
          tutorAdvertisementsId: tutorAdv.id,
        });

        toast.success('Đã thêm vào yêu thích!');
      }
      tutorAdvsMutate();
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra!');
    } finally {
      isAdding.onFalse();
    }
  };
  return (
    <Paper
      component={RouterLink}
      href={paths.guest.tutor.details(tutorAdv.id)}
      sx={{
        display: 'block',
        textDecoration: 'none',
        borderRadius: 2,
        overflow: 'hidden',
        border: (theme) => `1px solid ${varAlpha(theme.palette.grey['500Channel'], 0.12)}`,
        height: 1,
        position: 'relative',
        boxShadow: (theme) => theme.shadows[1],
        '&:hover': {
          boxShadow: (theme) => theme.shadows[19],
          '& .mnl__image__root': {
            transform: 'scale(1.02)',
          },
        },
      }}
    >
      {isShowFavoriteBtn && (
        <IconButton
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            zIndex: 4,

            ...(isFavorited && {
              color: 'error.main',
            }),
          }}
          onClick={(event) => {
            event.preventDefault();
            handleFavorite();
          }}
        >
          <Iconify icon="healthicons:heart" />
        </IconButton>
      )}
      <Stack direction="column" sx={{ height: 1 }}>
        <Box sx={{ position: 'relative', flex: 1 }}>
          <Image
            src={tutorAdv.thumbnail}
            alt={tutorAdv.title}
            ratio="1/1"
            sx={{
              width: 1,

              transform: 'scale(1)',
              transition: (theme) => theme.transitions.create('transform', {}),
            }}
          />
        </Box>
        <Box sx={{ flex: 1, p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Stack
            direction="row"
            minWidth={0}
            alignItems="center"
            justifyContent="space-between"
            sx={{ flex: 1 }}
          >
            <Typography variant="overline" sx={{ color: 'secondary.main' }}>
              {tutorAdv.course} - {tutorAdv.grade}
            </Typography>
            {tutorAdv.discount > 0 ? (
              <Box sx={{ flexShrink: 0 }}>
                <Typography
                  variant="caption"
                  sx={{ textDecoration: 'line-through', fontWeight: 600 }}
                >
                  {fCurrency(tutorAdv.fee)}
                </Typography>
                <Typography variant="h5" sx={{ color: 'error.main' }}>
                  {fCurrency(tutorAdv.fee - tutorAdv.fee * (tutorAdv.discount / 100))}
                </Typography>
              </Box>
            ) : (
              <Typography variant="h5" sx={{ flexShrink: 0 }}>
                {fCurrency(tutorAdv.fee)}
              </Typography>
            )}
          </Stack>
          <Typography
            variant="h5"
            sx={{ color: 'text.primary', display: 'block', ...maxLine({ line: 2 }) }}
          >
            {tutorAdv.title}
          </Typography>
          <BriefTutorAdv
            studentCount={tutorAdv.numberOfStudent}
            feedbackCount={tutorAdv.feedbacks?.length || 0}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
            <Avatar src={tutorAdv.photo} alt={tutorAdv.fullname} />

            <Typography variant="body2">{tutorAdv.fullname}</Typography>
          </Box>
          <Stack
            spacing={4}
            direction="row"
            sx={{
              position: 'relative',
              mt: 'auto',
            }}
          >
            {[
              {
                icon: <Iconify icon="mdi:clock-outline" sx={{ color: 'inherit' }} />,
                label: `Số ngày học:\n ${tutorAdv.daysPerMonth}`,
              },

              {
                icon: <Iconify icon="fa:calendar" sx={{ color: 'inherit' }} />,
                label: `Kỳ học:\n ${fDate(tutorAdv.startDate)} - ${fDate(tutorAdv.endDate)}`,
              },
            ].map((item) => (
              <Stack
                key={item.label}
                spacing={1}
                direction="row"
                alignItems="center"
                sx={{ typography: 'body2', color: 'text.secondary' }}
              >
                {item.icon}
                {item.label}
              </Stack>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
