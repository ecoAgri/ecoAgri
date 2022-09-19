import { Avatar, Divider, Grid, ListItem, ListItemAvatar, ListItemText, Rating } from '@mui/material'
import React from 'react'
import BankDetailField from '../farmer/sell/BankDetailField'

function SellerDetails() {
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
                    <ListItemText primary="Pasindu Lakmal" secondary={<Rating name="read-only" value={3} readOnly />} />
                </ListItem>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <BankDetailField
                                fieldName="Address"
                                userDetail="48, Perera Mw, Galle"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <BankDetailField
                                fieldName="Town"
                                userDetail="Galle"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <BankDetailField
                                fieldName="Contact Number"
                                userDetail="0782346812"
                            />
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </Grid>
    )
}

export default SellerDetails