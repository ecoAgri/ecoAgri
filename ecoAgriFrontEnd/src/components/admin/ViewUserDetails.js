import { Grid } from '@mui/material'
import React from 'react'
import BankDetailField from '../farmer/sell/BankDetailField'

function ViewUserDetails(props) {
    console.log(props.data);
    return (
        <Grid container sx={{pr: 3}} spacing={3}>
            <Grid item xs={12}>
                <BankDetailField fieldName="User Name" userDetail={props.data.col1} />
            </Grid>
            <Grid item xs={12}>
                <BankDetailField fieldName="User Type" userDetail={props.data.col2} />
            </Grid>
            <Grid item xs={12}>
                <BankDetailField fieldName="Phone Number" userDetail={props.data.phoneNumber} />
            </Grid>
            <Grid item xs={12}>
                <BankDetailField fieldName="Email" userDetail={props.data.col3} />
            </Grid>
            <Grid item xs={12}>
                <BankDetailField fieldName="Address" userDetail={props.data.address} />
            </Grid>
            <Grid item xs={12}>
                <BankDetailField fieldName="City" userDetail={props.data.city} />
            </Grid>
            <Grid item xs={12}>
                <BankDetailField fieldName="Town" userDetail={props.data.town} />
            </Grid>
        </Grid>
    )
}

export default ViewUserDetails