import { Grid } from '@mui/material'
import React from 'react'
import BankDetailField from '../farmer/sell/BankDetailField'

function ViewUserDetails(props) {
    return (
        <Grid container sx={{pr: 3}} spacing={3}>
            <Grid item xs={12}>
                <BankDetailField fieldName="User Name" userDetail="Pasindu Lakmal" />
            </Grid>
            <Grid item xs={12}>
                <BankDetailField fieldName="User Type" userDetail="Farmer" />
            </Grid>
            <Grid item xs={12}>
                <BankDetailField fieldName="Phone Number" userDetail="1234567890" />
            </Grid>
            <Grid item xs={12}>
                <BankDetailField fieldName="Email" userDetail="pasindu.lakmal@gmail.com" />
            </Grid>
            <Grid item xs={12}>
                <BankDetailField fieldName="Address" userDetail="Galle" />
            </Grid>
            <Grid item xs={12}>
                <BankDetailField fieldName="City" userDetail="Galle" />
            </Grid>
            <Grid item xs={12}>
                <BankDetailField fieldName="Town" userDetail="Walhanduwa" />
            </Grid>
        </Grid>
    )
}

export default ViewUserDetails