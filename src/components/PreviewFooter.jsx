import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';

const PreviewFooter = ({ pages, epub, pdf }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        mt: 2,
      }}
    >
      <Typography variant="subtitle2" color="text.secondary">
        {pages ? `${pages} pages` : ''}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {pdf && (
          <Button size="small" variant="outlined" startIcon={<DownloadIcon />} href={pdf}>
            PDF
          </Button>
        )}
        {epub && (
          <Button size="small" variant="outlined" startIcon={<DownloadIcon />} href={epub}>
            EPUB
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default PreviewFooter;
