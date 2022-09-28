import { Grid } from '@mui/material'
import React from 'react'
import DashboardTabs from '../../farmer/dashboard/DashboardTabs'
import LeftBar from '../../layouts/farmer/LeftBar'
import RightBar from '../../layouts/farmer/RightBar'
import MainHeader from '../../layouts/MainHeader'
import classes from '../../ui/HideScrollBar.module.css';

function DashBoard() {
    return (
        <React.Fragment>
            <MainHeader value={0} />
            <Grid container spacing={2} sx={{pt: "100px", px: 5}}>
                <Grid item xs={12}>
                    <DashboardTabs />
                </Grid>
                {/* <Grid item xs={12} sm={2}>
                    <LeftBar></LeftBar>
                </Grid>
                <Grid item xs={12} sm={10} className={classes.hideScrollBox}>
                    <RightBar></RightBar>
                </Grid> */}
            </Grid>
        </React.Fragment>
    )
}

export default DashBoard