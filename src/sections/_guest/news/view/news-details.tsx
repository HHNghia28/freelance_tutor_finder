import type { IEvent } from 'src/types/event';

import { Box, Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { Markdown } from 'src/components/markdown';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

type Props = {
  event: IEvent;
};
export default function NewsDetailsView({ event }: Props) {
  return (
    <Container>
      <CustomBreadcrumbs
        separator="/"
        sx={{
          '& .MuiBreadcrumbs-ol': {
            columnGap: 0.5,
          },
        }}
        links={[
          {
            name: 'Tin tức gia sư',
            href: paths.guest.news.list,
          },
          {
            name: event.title,
          },
        ]}
      />
      <Typography variant="h2" gutterBottom>
        {event.title}
      </Typography>

      <Box>
        <Markdown children={event.description} />
      </Box>
    </Container>
  );
}
