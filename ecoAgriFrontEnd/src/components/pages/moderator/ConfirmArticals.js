import { Grid } from '@mui/material'
import React from 'react'
import ArticalsLeftBar from '../../articals/ArticalsLeftBar'
import ArticalsRightBar from '../../articals/ArticalsRightBar'
import MainHeader from '../../layouts/MainHeader'
import ArticalsNotFound from '../../moderator/ArticalsNotFound'
import ArticalsRequests from '../../moderator/ArticalsRequests'
import classes from "../../ui/HideScrollBar.module.css";

function ConfirmArticals() {
  return (
    <React.Fragment>
      <MainHeader />
      <Grid container sx={{ pt: "100px" }}>
        <Grid item xs={12} sx={{ mx: 2, pt: 2 }}>
          <div>
            <Grid container rowSpacing={4}>
              <Grid item xs={12} sm={3} sx={{ mb: 2, pr: "12px" }}>
                <ArticalsLeftBar />
              </Grid>
              <Grid item xs={12} sm={9} className={classes.hideScrollBox}>
                <ArticalsRequests />
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default ConfirmArticals