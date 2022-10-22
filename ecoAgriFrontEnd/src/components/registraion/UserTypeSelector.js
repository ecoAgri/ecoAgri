import { Grid, Typography } from '@mui/material'
import React from 'react'
import UserTypes from './UserTypes'
import { useNavigate } from 'react-router';

import classes from "./SignUpForm.module.css";
function UserTypeSelector(props) {

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Typography variant="h5" color="primary" sx={{ mb: 5 }}>How do you want to register ?</Typography>
      <Grid container>
        <Grid item xs={3}>
          <UserTypes onClick={props.onClick} image="images/userTypes/Farmer.png" userType="Farmer" />
        </Grid>
        <Grid item xs={3}>
          <UserTypes onClick={props.onClick} image="images/userTypes/Buyer.png" userType="Buyer" />
        </Grid>
        <Grid item xs={3}>
          <UserTypes onClick={props.onClick} image="images/userTypes/Charity.png" userType="Charity" />
        </Grid>
        <Grid item xs={3}>
          <UserTypes onClick={props.onClick} image="images/userTypes/Advertiser.png" userType="Advertiser" />
        </Grid>
      </Grid>
      <Typography className={classes.text} sx={{mt: 2}}>
        Already have an account? <a style={{ cursor: "pointer" }} onClick={() => { navigate("/login") }}>sign in</a>
      </Typography>
    </React.Fragment>
  )
}

export default UserTypeSelector