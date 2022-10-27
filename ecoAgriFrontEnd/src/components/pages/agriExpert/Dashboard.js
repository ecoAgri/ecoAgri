import { Grid } from '@mui/material'
import React from 'react'
import DashboardTabs from '../../admin/dashboard/DashboardTabs'
import MainHeader from '../../layouts/MainHeader'

function Dashboard() {
    return (
        <React.Fragment>
            <MainHeader />
            <Grid container spacing={2} sx={{ pt: "100px", px: 5 }}>
                <Grid item xs={12}>
                    <DashboardTabs />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Dashboard