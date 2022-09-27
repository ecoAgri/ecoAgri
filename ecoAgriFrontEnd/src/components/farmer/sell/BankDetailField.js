import { Grid, Typography } from '@mui/material'
import React from 'react'

function BankDetailField(props) {
    return (
        <div>
            <Grid container>
                <Grid item xs={6}><Typography>{props.fieldName}</Typography></Grid>
                <Grid item xs={1}><Typography>:</Typography></Grid>
                <Grid item xs={5}><Typography>{props.userDetail}</Typography></Grid>
            </Grid>
        </div>
    )
}

export default BankDetailField