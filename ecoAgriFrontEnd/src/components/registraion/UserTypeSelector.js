import { Button, Grid, Typography, IconButton } from '@mui/material'
import React from 'react'
import CenteredBox from '../ui/CenteredBox'
import UserTypes from './UserTypes'
import PersonIcon from '@mui/icons-material/Person';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GoForward from '../ui/GoForward';
import { useDispatch, useSelector } from 'react-redux';
import { userTypeSelectorButtonActions } from '../../store/userType-selector-slice';
function UserTypeSelector() {

  const beforeClickBackButton = useSelector(
    (state) => state.userTypeSelectorButton.beforeClickBackButton
  )
  return (
    <React.Fragment>

      <Typography variant="h5" color="primary" sx={{mb: 5}}>How do you want to register ?</Typography>
      <Grid container>
        <Grid item xs={3}>
          <UserTypes image="images/userTypes/Farmer.png" userType="Farmer" />
        </Grid>
        <Grid item xs={3}>
          <UserTypes image="images/userTypes/Buyer.png" userType="Buyer" />
        </Grid>
        <Grid item xs={3}>
          <UserTypes image="images/userTypes/Charity.png" userType="Charity" />
        </Grid>
        <Grid item xs={3}>
          <UserTypes image="images/userTypes/Advertiser.png" userType="Advertiser" />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default UserTypeSelector