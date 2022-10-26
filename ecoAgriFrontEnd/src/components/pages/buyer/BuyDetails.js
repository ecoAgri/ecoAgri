import { Grid } from '@mui/material'
import React from 'react'
import PendingRequestTable from '../../farmer/dashboard/PendingRequestTable'
import MainHeader from '../../layouts/MainHeader'
import PageHeading from '../../ui/PageHeading'
import BuyerPendingTabs from '../../buyer/BuyerPendingTabs'

function BuyDetails() {
    return (
        <React.Fragment>
            <MainHeader value={0} />
            <Grid container spacing={2} sx={{ pt: "100px", px: 5 }}>
                <Grid item xs={12}>
                    <BuyerPendingTabs />
                </Grid>
            </Grid>
        </React.Fragment>

    )
}

export default BuyDetails