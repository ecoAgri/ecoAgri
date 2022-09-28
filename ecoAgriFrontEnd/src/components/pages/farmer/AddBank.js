import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import AddBankForm from '../../farmer/sell/AddBankForm'
import MainHeader from '../../layouts/MainHeader'
import SignUpForm from '../../registraion/SignUpForm'
import ShowBankDetails from '../../farmer/sell/ShowBankDetails'

function AddBank() {
    return (
        <React.Fragment>
            <MainHeader value={1}></MainHeader>
            <Grid container sx={{ pt: "100px" }}>
                <Grid item xs={6}>
                    <ShowBankDetails />
                </Grid>
                <Grid item xs={6}>
                    <AddBankForm />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default AddBank