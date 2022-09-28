import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import MainHeader from '../../layouts/MainHeader'
import SignUpForm from '../../registraion/SignUpForm'
import ShowBankDetails from '../../farmer/sell/ShowBankDetails'
import AddProductForm from '../../farmer/addProduct/AddProductForm'
import UploadProduct from '../../farmer/addProduct/UploadProduct'
import CenteredBox from '../../ui/CenteredBox'

function AddSaleProduct() {
    return (
        <React.Fragment>
            <MainHeader value={1}></MainHeader>
            <Grid container sx={{ pt: "100px" }}>
                <Grid item xs={12} sx={{ p: 5, mx: 10, mb: 5, bgcolor: "#fff" }}>
                    <CenteredBox align="center">
                        <Typography variant="h3">
                            Sale Your Product
                        </Typography>
                    </CenteredBox>
                </Grid>
                <Grid item xs={12} sx={{ mx: 10, bgcolor: "#fff" }}>
                    <CenteredBox align="center">
                        <AddProductForm productType="sellProduct" />
                    </CenteredBox>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default AddSaleProduct