import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';
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
    <AppBar position="sticky">
      <Toolbar>
        <MenuBookIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Book Finder
        </Typography>
        <Button color="inherit" startIcon={<LogoutIcon />} onClick={Logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
