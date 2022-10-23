import { Grid, Typography } from '@mui/material'
import React from 'react'
import CenteredBox from './CenteredBox'

function PageHeading(props) {
    return (
        <Grid item xs={12} sx={{ p: 2, px: 5, mb: 5, bgcolor: "#fff" }}>
            <CenteredBox align="center">
                <Typography variant="h4">
                    {props.heading}
                </Typography>
            </CenteredBox>
        </Grid>
    )
}

export default PageHeading