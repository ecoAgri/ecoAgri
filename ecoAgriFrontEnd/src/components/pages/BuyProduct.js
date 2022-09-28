import { Grid } from '@mui/material'
import React from 'react'
import BuyProductLeft from '../buyProduct/BuyProductLeft'
import BuyProductRight from '../buyProduct/BuyProductRight'
import MainHeader from '../layouts/MainHeader'

function BuyProduct() {
    return (
        <React.Fragment>
            <MainHeader value={2} />
            <Grid container sx={{pt: "100px"}}>
                <Grid item xs={12} sm={6}>
                    <BuyProductLeft />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <BuyProductRight />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default BuyProduct