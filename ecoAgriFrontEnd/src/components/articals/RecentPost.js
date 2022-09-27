import { Box, CardMedia, Grid, Typography } from '@mui/material'
import React from 'react'

function RecentPost() {
    return (
        <div>
            <Grid container>
                <Grid item xs={4}>
                    <CardMedia
                        sx={{ boxShadow: 3, borderRadius: 1 }}
                        component="img"
                        image="https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                    />

                </Grid>
                <Grid item xs={8}>
                    <Box sx={{ ml: "10px" }}>
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