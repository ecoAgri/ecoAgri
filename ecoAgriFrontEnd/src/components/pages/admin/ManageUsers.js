import { Box, Grid } from '@mui/material'
import React from 'react'
import ManageUserTable from '../../admin/ManageUserTable'
import MainHeader from '../../layouts/MainHeader'
import CenteredBox from '../../ui/CenteredBox'
import PageHeading from '../../ui/PageHeading'

function ManageUsers() {
    return (
        <React.Fragment>
            <MainHeader />
            <Grid container sx={{ pt: "100px" }}>
                <PageHeading
                    heading="Manage Users"
                />
                <Grid item xs={12} sx={{ py: 5, mx: 5, bgcolor: "#fff" }}>
                    <CenteredBox align="center">
                        <ManageUserTable />
                    </CenteredBox>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default ManageUsers