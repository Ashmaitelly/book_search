import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import { isSignedIn, signOut } from '../functions/auth';

export default function BAppBar() {
  //navigation hook
  const navigate = useNavigate();
  //Go to landing page if no token
  useEffect(() => {
    if (!isSignedIn()) {
      navigate('/');
    }
  }, [navigate]);

  //Logout function
  const Logout = () => {
    signOut();
    navigate('/');
  };
  return (
    <Box sx={{ m: 0, p: 0 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Book Finder
          </Typography>
          <Button color="inherit" onClick={Logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
