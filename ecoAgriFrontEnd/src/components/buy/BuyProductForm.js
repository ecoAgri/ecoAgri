import { FormControl, FormControlLabel, Grid, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import React, { useState } from 'react'
import BankDetailField from '../farmer/sell/BankDetailField';
import UpdatedButton from '../ui/UpdatedButton';
import CenteredBox from '../ui/CenteredBox';

function BuyProductForm() {
    const [paymentType, setPaymentType] = useState('')
    const paymentTypeHandler = (payment_type) => {
        setPaymentType(payment_type);
    }
    return (
        <Box sx={{ mt: 3 }}>
            <Grid container>
                <Grid item xs={12}>
                    <BankDetailField
                        fieldName="Seller"
                        userDetail="Pasindu Lakmal"
                    />
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Amount"
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Price"
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel>Select pick update: </InputLabel>
                                <TextField
                                    type="date"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControlLabel onClick={() => { paymentTypeHandler("cash") }} control={<Checkbox checked={paymentType === "cash"} />} label="Cash Payment" />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControlLabel onClick={() => { paymentTypeHandler("card") }} control={<Checkbox checked={paymentType === "card"} />} label="Credit/Debit Card" />
                            </Grid>
                            <Grid item xs={6}>
                                <UpdatedButton variant="outlined" title="Contact Seller" />
                            </Grid>
                            <Grid item xs={6}>
                                <CenteredBox align="right">
                                    <UpdatedButton variant="contained" title="Send Request" />
                                </CenteredBox>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}

export default BuyProductForm