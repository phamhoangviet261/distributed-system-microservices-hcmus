import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box sx={{ display: 'flex', margin: "30px auto", justifyContent: "center", alignItems: "center", gap: "20px" }}>
      <CircularProgress /> Loading . . .
    </Box>
  );
}