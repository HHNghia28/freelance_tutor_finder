import { useMemo } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Link, Paper, Stack, Avatar, Divider, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate, fTimestamp } from 'src/utils/format-time';

import { useGetEvents } from 'src/actions/event';
import { maxLine, varAlpha } from 'src/theme/styles';

import { Image } from 'src/components/image';
import { EmptyContent } from 'src/components/empty-content';

import LoadingIndicate from 'src/sections/_partials/loading-indicate';

export default function NewsList() {
  const { events, eventsLoading, eventsEmpty } = useGetEvents();
  const recentEvents = useMemo(
    () =>
      events.toSorted(
        (a, b) => (fTimestamp(b.updateDate) as any) - (fTimestamp(a.updateDate) as any)
      ),
    [events]
  );
  if (eventsLoading) return <LoadingIndicate />;
  if (eventsEmpty) return <EmptyContent title="Tin tức đang được cập nhật" />;
  return (
    <Grid container spacing={2}>
      {recentEvents.map((event) => (
        <Grid
          xs={12}
          sm={6}
          md={4}
          key={event.id}
          sx={
            {
              // flexDirection: {
              //   xs: 'column',
              //   md: 'row',
              // },
            }
          }
        >
          <Paper
            component={RouterLink}
            href={paths.guest.news.details(event.id)}
            sx={{
              display: 'block',
              textDecoration: 'none',
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: (theme) => theme.shadows[1],
              '&:hover': {
                boxShadow: (theme) => theme.shadows[19],
                '& #img': {
                  transform: 'scale(1.02)',
                },
              },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                transform: 'scale(1)',
                transition: (theme) => theme.transitions.create('transform', {}),
              }}
              id="img"
            >
              <Image src={event.thumbnail} alt={event.title} ratio="1/1" />
            </Box>
            <Stack
              direction="row"
              spacing={4}
              sx={{
                p: 4,
                border: (theme) => `1px solid ${varAlpha(theme.palette.grey['500Channel'], 0.12)}`,
                borderTop: 'none',
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="subtitle2">{fDate(event.updateDate, 'MMM')}</Typography>
                <Divider flexItem sx={{ mt: 1, mb: 0.5 }} />
                <Typography variant="h3">{fDate(event.updateDate, 'DD')}</Typography>
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Link
                  component={RouterLink}
                  href={paths.guest.news.details(event.id)}
                  variant="h6"
                  sx={{ color: 'text.primary', ...maxLine({ line: 2 }) }}
                  title={event.title}
                >
                  {event.title}
                </Link>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 1,
                    mt: 1,
                  }}
                >
                  <Avatar src={event.photo} alt={event.tutorName} />
                  <Box>
                    <Typography variant="body2" sx={{ ...maxLine({ line: 1 }) }}>
                      {event.tutorName}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', ...maxLine({ line: 2 }) }}
                    >
                      {event.teachingAchievement}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
