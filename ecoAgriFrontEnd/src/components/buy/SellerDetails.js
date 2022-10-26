import { Avatar, Divider, Grid, ListItem, ListItemAvatar, ListItemText, Rating } from '@mui/material'
import React from 'react'
import BankDetailField from '../farmer/sell/BankDetailField'

function SellerDetails(props) {
    console.log(props.productDetail);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ListItem disablePadding>
                    <ListItemAvatar>
                        <Avatar
                            sx={{ width: 56, height: 56, mr: 2 }}
                            src=""
                        />
                    </ListItemAvatar>
                    {/* <ListItemText primary={props.productDetail.sellerName} secondary={<Rating name="read-only" value={3} readOnly />} /> */}
                    <ListItemText primary={props.productDetail.sellerName} />
                </ListItem>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <BankDetailField
                                fieldName="Address"
                                userDetail={props.productDetail.fieldAddress}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <BankDetailField
                                fieldName="Town"
                                userDetail={props.productDetail.location}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <BankDetailField
                                fieldName="Contact Number"
                                userDetail={props.productDetail.sellerContact}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    )
}

export default SellerDetails