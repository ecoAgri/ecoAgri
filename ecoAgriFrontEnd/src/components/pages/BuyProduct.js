import { Grid } from '@mui/material'
import React from 'react'
import BuyProductLeft from '../buy/BuyProductLeft'
import BuyProductRight from '../buy/BuyProductRight'
import MainHeader from '../layouts/MainHeader'

function BuyProduct() {
    return (
        <React.Fragment>
            <MainHeader value={2} />
            <Grid container sx={{ pt: "100px", px: 5 }} spacing={5}>
                <Grid item xs={12} sm={7}>
                    <BuyProductLeft />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <BuyProductRight />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default BuyProduct