import { Grid } from '@mui/material'
import React from 'react'
import DonationProducts from '../../farmer/donate/DonationProducts'
import MainHeader from '../../layouts/MainHeader'
import SlideBarBox from '../../ui/farmer/SlideBarBox'

function Donate() {
    return (
        <React.Fragment>
            <MainHeader value={3} />
            <Grid container sx={{ pt: "100px", px: 7 }} spacing={3}>
                <Grid item xs={12}>
                    <SlideBarBox link="/donate/pending" number="02" name="Pending" />
                </Grid>
                <Grid item xs={12}>
                    <DonationProducts />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Donate