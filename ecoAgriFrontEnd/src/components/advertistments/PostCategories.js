import { Grid, Typography } from '@mui/material'
import React from 'react'

function PostCategories() {
  return (
    <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h6">Categories</Typography>
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        </React.Fragment>
  )
}

export default PostCategories