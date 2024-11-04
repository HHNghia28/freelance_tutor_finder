import Grid from '@mui/material/Unstable_Grid2';
import { Box, Link, Paper, IconButton, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate } from 'src/utils/format-time';

import { deleteEvent, useGetEvents } from 'src/actions/event';

import { Image } from 'src/components/image';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';

import LoadingIndicate from 'src/sections/_partials/loading-indicate';

export default function MyEventList() {
  const { events, eventsLoading, eventsEmpty, eventsMutate } = useGetEvents();
  const deleting = useBoolean();

  if (eventsLoading) return <LoadingIndicate />;
  if (eventsEmpty) return <EmptyContent title="Bạn chưa đăng tin tức nào" />;
  const handleDelete = async (courseId: string) => {
    try {
      deleting.onTrue();
      await deleteEvent(courseId);

      eventsMutate();
      toast.success('Xóa tin tức thành công');
    } catch (error) {
      console.error(error);
      toast.error('Đã có lỗi xảy ra');
    } finally {
      deleting.onFalse();
    }
  };
  return (
    <Grid container spacing={3}>
      {events.map((event) => (
        <Grid xs={12} sm={6} md={4} key={event.id} sx={{}}>
          <Box sx={{ position: 'relative' }}>
            <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Box sx={{ position: 'relative' }}>
                <Image src={event.thumbnail} alt={event.title} ratio="5/3" />
              </Box>
              <Box sx={{ flex: 1, ml: 1 }}>
                <Typography variant="caption" sx={{}}>
                  {fDate(event.createDate)}
                </Typography>
                <Link
                  component={RouterLink}
                  href={paths.guest.news.details(event.id)}
                  variant="h4"
                  sx={{ color: 'text.primary', display: 'block' }}
                >
                  {event.title}
                </Link>
              </Box>
            </Paper>

            <IconButton
              sx={{ position: 'absolute', top: 4, right: 4 }}
              size="small"
              onClick={() => {
                handleDelete(event.id);
              }}
            >
              <Iconify
                icon={deleting.value ? 'line-md:loading-loop' : 'clarity:remove-solid'}
                color="error.main"
              />
            </IconButton>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
