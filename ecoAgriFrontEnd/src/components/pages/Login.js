import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import UserTypeSelector from '../registraion/UserTypeSelector';

import { useSelector } from "react-redux";
import SignUpForm from '../registraion/SignUpForm';
import SignInForm from '../login/SignInForm';
import { Grid } from '@mui/material';
import LandingAppBar from '../Landing/LandingAppBar';


export default function Registration() {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    // height: (selectedSignupButton !== "") ? 600 : "auto",
    // overflow: "auto",
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    border: "none",
    boxShadow: 24,
    borderRadius: 2,
    px: 4,
    pt: 2
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <LandingAppBar />
      </Grid>
      <Grid item xs={12} sx={{ mt: 5 }}>
        <Box sx={style}>
          <SignInForm />
        </Box>
      </Grid>
    </Grid>
  );
}
