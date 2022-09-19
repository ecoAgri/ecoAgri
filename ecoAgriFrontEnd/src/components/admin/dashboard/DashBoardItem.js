import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router'
import DonationPendingTable from './DonationHistoryTable'
import MainHeader from '../../layouts/MainHeader'
import CenteredBox from '../../ui/CenteredBox'

const style = {
  // position: 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  width: "100%",
  // height: 505,
  bgcolor: 'background.paper',
  overflow: "auto",
  // border: "none",
  boxShadow: 10,
  borderRadius: 2,
  p: 4,
};
function DashBoardItem(props) {
  return (
    <Grid container>
      <Grid item xs={12}>
          <Typography sx={{ mb: 2 }} variant="h5">{props.tableName}</Typography>
      </Grid>
      <Grid item xs={12}>
          {props.table}
      </Grid>
    </Grid>
  )
}

export default DashBoardItem