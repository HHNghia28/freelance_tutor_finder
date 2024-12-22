// @mui
import type { StackProps } from '@mui/material/Stack';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = StackProps & {
  filters: { grades: string[]; subjects: string[] };
  onFilters: (name: string, value: any) => void;
  //
  onResetFilters: VoidFunction;
  //
  results: number;
};

export default function FiltersResult({
  filters,
  onFilters,
  //
  onResetFilters,
  //
  results,
  ...other
}: Props) {
  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{results}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          kết quả tìm thấy
        </Box>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {filters.grades.length > 0 && (
          <Block label="Khối lớp :">
            <Chip
              size="small"
              label={filters.grades.join(', ')}
              onDelete={() => onFilters('grades', [])}
            />
          </Block>
        )}
        {filters.subjects.length > 0 && (
          <Block label="Môn học :">
            <Chip
              size="small"
              label={filters.subjects.join(', ')}
              onDelete={() => onFilters('subjects', [])}
            />
          </Block>
        )}

        <Button color="error" onClick={onResetFilters} startIcon={<Iconify icon="fa:refresh" />}>
          Đặt lại
        </Button>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type BlockProps = StackProps & {
  label: string;
};

function Block({ label, children, sx, ...other }: BlockProps) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}
