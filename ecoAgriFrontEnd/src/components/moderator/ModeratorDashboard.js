import { Grid } from '@mui/material'
import React from 'react'
import DashboardTabs from '../admin/dashboard/DashboardTabs'
import MainHeader from '../layouts/MainHeader'
import CheckCharityOrgnization from './CheckCharityOrgnization'
// import DashboardTabs from '../../admin/dashboard/DashboardTabs'
// import MainHeader from '../../layouts/MainHeader'

function ModeratorDashboard() {
    return (
        <React.Fragment>
            <MainHeader />
            <Grid container spacing={2} sx={{pt: "100px", px: 5}}>
                <Grid item md={9} sm={12}>
                    <DashboardTabs />
                </Grid>
                <Grid item md={3} sm={12}>
                    <CheckCharityOrgnization />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default ModeratorDashboard