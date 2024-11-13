import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { useGetMyTutorAdv } from 'src/actions/tutor-adv';

import { EmptyContent } from 'src/components/empty-content';

import TutorAdvCard from 'src/sections/_partials/tutor-adv-card';
import LoadingIndicate from 'src/sections/_partials/loading-indicate';

import { useAuthContext } from 'src/auth/hooks';

export default function MyFavouriteList() {
  const { user } = useAuthContext();

  const id = user?.studentId;

  const { tutorAdvs, tutorAdvsLoading, tutorAdvsEmpty } = useGetMyTutorAdv(id);

  if (tutorAdvsLoading) return <LoadingIndicate />;
  if (tutorAdvsEmpty) return <EmptyContent title="Chưa có mục yêu thích nào" />;

  return (
    <Grid container spacing={3}>
      {tutorAdvs.map((course) => (
        <Grid xs={12} sm={6} md={4} key={course.id} sx={{}}>
          <Box sx={{ position: 'relative' }}>
            <TutorAdvCard tutorAdv={course} />
            {/* {isTutor && (
              <IconButton
                sx={{ position: 'absolute', top: 4, right: 4 }}
                size="small"
                onClick={() => {
                  handleDelete(course.id);
                }}
              >
                <Iconify
                  icon={deleting.value ? 'line-md:loading-loop' : 'clarity:remove-solid'}
                  color="error.main"
                />
              </IconButton>
            )} */}
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
