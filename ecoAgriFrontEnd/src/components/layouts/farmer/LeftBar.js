import { Grid } from '@mui/material'
import React from 'react'
import SlideBarBox from '../../ui/farmer/SlideBarBox'

function LeftBar() {
    return (
        <Grid container spacing={3} sx={{mb: 2}}>
            <Grid item xs={3} sm={12}>
                <SlideBarBox link="/donate/pending" number="02" name="Pending" />
            </Grid>
            <Grid item xs={3} sm={12}>
                <SlideBarBox number="05" name="Sales"  />
            </Grid>
            <Grid item xs={3} sm={12}>
                <SlideBarBox number="08" name="Purchases" />
            </Grid>
            <Grid item xs={3} sm={12}>
                <SlideBarBox number="03" name="Donations" />
            </Grid>
        </Grid>
    )
}

export default LeftBar