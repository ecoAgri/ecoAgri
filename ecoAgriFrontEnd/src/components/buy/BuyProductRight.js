import { Button, FormControl, FormControlLabel, Grid, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import React, { useState } from 'react'
import BankDetailField from '../farmer/sell/BankDetailField'
import UpdatedButton from '../ui/UpdatedButton';
import SellerDetailsContainer from './SellerDetailsContainer';

function BuyProductRight() {
    const [paymentType, setPaymentType] = useState('')
    const paymentTypeHandler = (payment_type) => {
        setPaymentType(payment_type);
    }
    return (
        <Box sx={{bgcolor: "#fff", p: 3, pb: 5}}>
            <Grid container>
                <Grid item xs={12} sx={{ mb: 3 }}>
                    <Typography variant='h4'>Banana</Typography>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <BankDetailField
                                    fieldName="Seller"
                                    userDetail="Pasindu Lakmal"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <BankDetailField
                                    fieldName="Quantity"
                                    userDetail="10kg"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <BankDetailField
                                    fieldName="Unit Price"
                                    userDetail="100"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <BankDetailField
                                    fieldName="Price"
                                    userDetail="1000"
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Grid item xs={12} sx={{ mt: 4 }}>
                    <div>
                        <Grid container spacing={4}>
                            <Grid item md={12} lg={6}>
                                <TextField
                                    label="Amount"
                                    type="number"
                                />
                            </Grid>
                            <Grid item md={12} lg={6}>
                                <TextField
                                    label="Price"
                                    type="number"
                                    value={1000}
                                    readOnly
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Select pick update: </InputLabel>
                                <TextField
                                    type="date"
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <Typography>
                                    Where you can buy this product ?
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <SellerDetailsContainer />
                            </Grid>
                            {/* <Grid item xs={6}>
                                <FormControlLabel onClick={() => {paymentTypeHandler("cash")}} control={<Checkbox checked={paymentType === "cash"} />} label="Cash Payment" />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControlLabel onClick={() => {paymentTypeHandler("card")}} control={<Checkbox checked={paymentType === "card"} />} label="Credit/Debit Card" />
                            </Grid> */}
                            <Grid item xs={8}>
                                <UpdatedButton variant="outlined" title="Contact Seller" />
                            </Grid>
                            <Grid item xs={4}>
                                <UpdatedButton variant="contained" title="Send Request" />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}

export default BuyProductRight