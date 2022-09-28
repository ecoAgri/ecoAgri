import { Grid, Typography } from '@mui/material'
import React from 'react'
import MainHeader from '../layouts/MainHeader'
import ProfileContent from '../layouts/ProfileContent'
import CenteredBox from '../ui/CenteredBox'
import PageHeading from '../ui/PageHeading'

function Profile() {
    return (
        <React.Fragment>
            <MainHeader value={4} />
            <Grid container sx={{ pt: "100px" }}>
                <PageHeading
                    heading="Profile"
                />
                <Grid item xs={12} sx={{ py: 5, mx: 5, bgcolor: "#fff" }}>
                    <ProfileContent />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Profile