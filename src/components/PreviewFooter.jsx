import React from 'react';
import Box from '@mui/material/Box';
import { Typography, Link } from '@mui/material';

const PreviewFooter = ({ pages, epub, pdf }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="subtitle2">{pages} Pages</Typography>

      <Typography variant="subtitle2">
        Download: <Link href={pdf}>PDF</Link> <Link href={epub}>EPUB</Link>
      </Typography>
    </Box>
  );
};

export default PreviewFooter;
