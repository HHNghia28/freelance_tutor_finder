import type { UploadProps, FilesUploadType } from 'src/components/upload';

import { useState } from 'react';

import Box from '@mui/material/Box';
import { Modal } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { fData } from 'src/utils/format-number';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { fileData } from 'src/components/file-thumbnail';

// ----------------------------------------------------------------------
type Props = {
  files: FilesUploadType;
  onRemove: UploadProps['onRemove'];
};
export function MultiFilePreview({ onRemove, files = [] }: Props) {
  const [view, setView] = useState<any>();

  return (
    <Box
      component="ul"
      sx={{
        gap: 1,
        display: 'flex',
        mt: 3,
        flexDirection: 'column',
      }}
    >
      {files.map((file) => {
        const { name, size } = fileData(file);

        return (
          <Box
            component="li"
            key={(file as any)?.path || file}
            sx={{
              py: 1,
              pr: 1,
              pl: 1.5,
              gap: 1.5,
              display: 'flex',
              borderRadius: 1,
              alignItems: 'center',
              border: (theme) =>
                `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
            }}
          >
            <ListItemText
              primary={name}
              secondary={size ? fData(size) : ''}
              secondaryTypographyProps={{ component: 'span', typography: 'caption' }}
              onClick={() =>
                setView(typeof file === 'string' ? file : (file as any)?.preview || '')
              }
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            />

            {onRemove && (
              <IconButton size="small" onClick={() => onRemove(file)}>
                <Iconify icon="mingcute:close-line" width={16} />
              </IconButton>
            )}
          </Box>
        );
      })}

      <Modal
        open={!!view}
        onClose={() => setView('')}
        sx={{ alignContent: 'center' }}
        disableAutoFocus
      >
        <Box sx={{ maxWidth: 'lg', width: '90%', maxHeight: '90vh', mx: 'auto' }}>
          <Box
            component="video"
            // src={typeof view === 'string' ? view : (view as any)?.preview || ''}
            sx={{ width: 1, height: 1, display: 'block' }}
            controls
            autoPlay
          >
            <Box
              component="source"
              src={typeof view === 'string' ? view : (view as any)?.preview || ''}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
