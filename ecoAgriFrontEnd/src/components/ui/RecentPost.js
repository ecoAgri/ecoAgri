import { Box, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'

function RecentPost() {
    return (
        <div>
            <Grid container>
                <Grid item xs={4}>
                    <CardMedia
                        component="img"
                        image="https://firebasestorage.googleapis.com/v0/b/athpotha-720ab.appspot.com/o/images%2Fcover%2F275919192_1587990271576440_6279473193330590031_n.jpg23bedd91-36b1-4349-8443-3e3eb13c4068?alt=media&token=d9db2cb1-fcd9-4610-aea1-f01b4500ec4b"
                    />
                </Grid>
                <Grid item xs={8}>
                    <Box sx={{ ml: "3px" }}>
                        <Typography>
                            Are You Prepared for the strom season
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default RecentPost