import { CardMedia, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import RecentPost from './RecentPost'

function RecentPosts() {
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6">Recent Posts</Typography>
                </Grid>
                <Grid item xs={12}>
                    <RecentPost />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default RecentPosts