import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import MainHeader from '../../layouts/MainHeader'
import SignUpForm from '../../registraion/SignUpForm'
import ShowBankDetails from '../../farmer/sell/ShowBankDetails'
import AddProductForm from '../../farmer/addProduct/AddProductForm'
import UploadProduct from '../../farmer/addProduct/UploadProduct'

function AddProduct() {
    return (
        <React.Fragment>
            <MainHeader value={1}></MainHeader>
            <Grid container sx={{ pt: "100px" }}>
                <Grid item xs={6}>
                    <UploadProduct />
                </Grid>
                <Grid item xs={6}>
                    <AddProductForm />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default AddProduct