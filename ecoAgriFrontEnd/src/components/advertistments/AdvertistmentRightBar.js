import { Grid } from '@mui/material'
import React from 'react'
import CenteredBox from '../ui/CenteredBox'
import AdvertistmentCard from './AdvertistmentCard'

function AdvertistmentRightBar() {
  return (
    <div>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 1 }}>
        <Grid item xs={12} sm={6}>
            <AdvertistmentCard />
        </Grid>
        <Grid item xs={12} sm={6}>
            <AdvertistmentCard />
        </Grid>
        <Grid item xs={12} sm={6}>
            <AdvertistmentCard />
        </Grid>
        <Grid item xs={12} sm={6}>
            <AdvertistmentCard />
        </Grid>
        <Grid item xs={12} sm={6}>
            <AdvertistmentCard />
        </Grid>
        <Grid item xs={12} sm={6}>
            <AdvertistmentCard />
        </Grid>
      </Grid>
    </div>
  )
}

export default AdvertistmentRightBar