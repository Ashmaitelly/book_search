import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { Typography } from '@mui/material';

const PreviewHeader = ({ title, authors = [], language = '', publisher }) => {
  return (
    <Box sx={{ textAlign: 'left', mb: 2 }}>
      <Typography variant="h5">
        {title}{' '}
        {language && <Chip label={language.toUpperCase()} size="small" sx={{ verticalAlign: 'middle' }} />}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        by {authors.length ? authors.join(', ') : 'Unknown author'}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Publisher: {publisher || 'Not provided'}
      </Typography>
    </Box>
  );
};

export default PreviewHeader;
