import { useMemo, useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Stack,
  Paper,
  Select,
  MenuItem,
  Checkbox,
  Typography,
  InputLabel,
  FormControl,
  ListItemText,
  OutlinedInput,
} from '@mui/material';

import { sortStringByNumbers } from 'src/utils/helper';

import { useGetGrades } from 'src/actions/grade';
import { useGetSubjects } from 'src/actions/subject';

import { EmptyContent } from 'src/components/empty-content';

import TutorAdvCard from 'src/sections/_partials/tutor-adv-card';

import FiltersResult from './filters-result';

type Props = {
  title: string;
  data: any[];
};
export default function TutorAdvDisplay({ title, data }: Props) {
  const [filters, setFilters] = useState<{ grades: string[]; subjects: string[] }>({
    grades: [],
    subjects: [],
  });
  const { grades } = useGetGrades();
  const { subjects } = useGetSubjects();
  const isFiltering = !!filters.grades.length || !!filters.subjects.length;
  const gradeOptions = useMemo(() => {
    if (!grades.length) return [];
    return sortStringByNumbers(grades, (a, b) => ({
      a: a.name,
      b: b.name,
    }));
  }, [grades]);

  const dataFiltered = useMemo(() => {
    let arrayFiltered: any[] = data || [];
    if (filters.grades.length) {
      arrayFiltered = arrayFiltered.filter((elmt: { grade: string }) =>
        filters.grades.includes(elmt.grade)
      );
    }
    if (filters.subjects.length) {
      arrayFiltered = arrayFiltered.filter((elmt: { course: string }) =>
        filters.subjects.includes(elmt.course)
      );
    }
    return arrayFiltered;
  }, [filters.grades, filters.subjects, data]);

  const handleFilterGrades = (event: any) => {
    const {
      target: { value },
    } = event;
    setFilters((prev) => ({
      ...prev,
      grades: typeof value === 'string' ? value.split(',') : value,
    }));
  };
  const handleFilterSubjects = (event: any) => {
    const {
      target: { value },
    } = event;
    setFilters((prev) => ({
      ...prev,
      subjects: typeof value === 'string' ? value.split(',') : value,
    }));
  };
  return (
    <Paper elevation={2} sx={{ p: 1, mt: 5 }}>
      <Stack
        direction={{ md: 'row', xs: 'column' }}
        alignItems={{ md: 'center' }}
        justifyContent="space-between"
      >
        <Typography variant="h3" sx={{ textTransform: 'uppercase', flexShrink: 0 }} gutterBottom>
          {title}
        </Typography>
        <Box
          sx={{
            flex: 1,
            maxWidth: { md: 500, xs: 1 },
            display: 'flex',
            alignItems: 'center',
            flexDirection: {
              md: 'row',
              xs: 'column',
            },
            gap: 1,
          }}
        >
          <FormControl fullWidth size="small">
            <InputLabel id="grade-filter">Khối lớp</InputLabel>
            <Select
              labelId="grade-filter"
              value={filters.grades}
              onChange={handleFilterGrades}
              multiple
              input={<OutlinedInput label="Khối lớp" />}
              renderValue={(selected: any) => selected.join(', ')}
            >
              {gradeOptions.map((grade) => (
                <MenuItem key={grade.id} value={grade.name}>
                  <Checkbox checked={filters.grades.indexOf(grade.name as never) > -1} />
                  <ListItemText primary={grade.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small">
            <InputLabel id="subject-filter">Môn học</InputLabel>
            <Select
              labelId="subject-filter"
              value={filters.subjects}
              onChange={handleFilterSubjects}
              multiple
              input={<OutlinedInput label="Môn học" />}
              renderValue={(selected: any) => selected.join(', ')}
            >
              {subjects.map((subject) => (
                <MenuItem key={subject.id} value={subject.name}>
                  <Checkbox checked={filters.subjects.indexOf(subject.name) > -1} />
                  <ListItemText primary={subject.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>
      <Grid container spacing={3}>
        {isFiltering && (
          <Grid xs={12}>
            <FiltersResult
              filters={filters}
              onFilters={(name, value) => {
                setFilters((prev) => ({
                  ...prev,
                  [name]: value,
                }));
              }}
              onResetFilters={() => setFilters({ grades: [], subjects: [] })}
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          </Grid>
        )}
        {dataFiltered.map((course) => (
          <Grid xs={12} sm={6} md={4} key={course.id} sx={{}}>
            <TutorAdvCard tutorAdv={course} />
          </Grid>
        ))}
        {!dataFiltered.length && isFiltering && (
          <Grid xs={12}>
            <EmptyContent title="Không tìm thấy khóa học!" sx={{ py: 4 }} />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
