import React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const PreviewHeader = ({ title, authors, language, publisher }) => {
  return (
    <Box>
      <Typography variant="h5" sx={{ m: 1 }}>
        {title} ({language.toUpperCase()})
      </Typography>
      <Typography variant="h6" sx={{ m: 1 }}>
        by {authors.join(', ')}
      </Typography>
      <Typography variant="caption">
        Publisher: {publisher || 'Not provided'}
      </Typography>
    </Box>
  );
};

export default PreviewHeader;
