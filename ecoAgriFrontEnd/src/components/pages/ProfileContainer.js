import { Grid, Typography } from '@mui/material'
import React from 'react'
import MainHeader from '../layouts/MainHeader'
import ProfileContent from '../layouts/ProfileContent'
import PageHeading from '../ui/PageHeading'

function ProfileContainer() {
    return (
        <Grid container sx={{ pt: "100px", px: 5 }}>
            <PageHeading
                heading="Profile"
            />
            <Grid item xs={12} sx={{ p: 5, bgcolor: "#fff" }}>
                <ProfileContent />
            </Grid>
        </Grid>
    )
}

export default ProfileContainer