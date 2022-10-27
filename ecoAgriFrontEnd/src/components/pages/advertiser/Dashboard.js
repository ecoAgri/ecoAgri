import { Grid } from '@mui/material'
import React from 'react'
import AdvertistmentLeftBar from '../../advertistments/AdvertistmentLeftBar'
import AdvertistmentRightBar from '../../advertistments/AdvertistmentRightBar'
import MainHeader from '../../layouts/MainHeader'
import classes from "../../ui/HideScrollBar.module.css";

function Dashboard() {
  return (
    <React.Fragment>
      <MainHeader value={0} />
      <Grid container sx={{ pt: "100px" }}>
        <Grid item xs={12} sx={{ mx: 2, pt: 2 }}>
          <div>
            <Grid container rowSpacing={4}>
              <Grid item xs={12} sm={6} sx={{ mb: 2, pr: "12px" }}>
                <AdvertistmentLeftBar />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.hideScrollBox}>
                <AdvertistmentRightBar />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Dashboard