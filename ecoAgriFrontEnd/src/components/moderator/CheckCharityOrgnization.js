import { Button, Grid, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import CenteredBox from '../ui/CenteredBox'
import CharityField from './CharityField'

function CheckCharityOrgnization() {
    return (
        <Box sx={{bgColor: "#fff"}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <CenteredBox align="center">
                        <Typography variant="h5"> Check Charity Organization</Typography>
                    </CenteredBox>
                </Grid>
                <Grid item xs={12}>
                    <CharityField charityName="Western Union Organization" link={"https://images.template.net/wp-content/uploads/2019/08/Independent-Examiner-Charity-Report-Template.jpg?width=390"} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default CheckCharityOrgnization