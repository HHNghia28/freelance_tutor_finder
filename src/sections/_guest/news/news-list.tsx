import { Box, Link, Stack, Divider, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import { maxLine } from 'src/theme/styles';
import { useGetEvents } from 'src/actions/event';

import { Image } from 'src/components/image';
import { EmptyContent } from 'src/components/empty-content';

import LoadingIndicate from 'src/sections/_partials/loading-indicate';

export default function NewsList() {
  const { events, eventsLoading, eventsEmpty } = useGetEvents();
  if (eventsLoading) return <LoadingIndicate />;
  if (eventsEmpty) return <EmptyContent title="Tin tức đang được cập nhật" />;
  return (
    <Stack spacing={3} divider={<Divider />}>
      {events.map((event) => (
        <Stack
          key={event.id}
          sx={{
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
          }}
        >
          <Box sx={{ position: 'relative', flexShrink: 0, maxWidth: 240 }}>
            <Image src={event.thumbnail} alt={event.title} ratio="5/3" />
          </Box>
          <Stack justifyContent="space-between" sx={{ flex: 1, ml: 1 }}>
            <Box>
              <Typography variant="caption" sx={{ display: 'block' }}>
                {fDate(event.createDate)}
              </Typography>
              <Link
                component={RouterLink}
                href={paths.guest.news.details(event.id)}
                variant="h5"
                sx={{ color: 'text.primary' }}
              >
                {event.title}
              </Link>
              <Typography variant="body2" sx={{ ...maxLine({ line: 4 }) }}>
                {event.description}
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ display: 'block' }}>
              Tác giả: <strong>{event.tutorName}</strong>
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
