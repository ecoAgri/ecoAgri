import { Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import CenteredBox from '../../ui/CenteredBox'
import UpdatedButton from '../../ui/UpdatedButton'
import BankDetailField from '../sell/BankDetailField'
import UpdateProfileModal from './UpdateProfileModal'

const DUMMY_USER = [
    {
        fieldId: "user-1",
        fieldName: "First Name",
        userDetail: "Lahiru"
    },
    {
        fieldId: "user-2",
        fieldName: "Last Name",
        userDetail: "Perera"
    },
    {
        fieldId: "user-3",
        fieldName: "Phone Number",
        userDetail: "0000000000"
    },
    {
        fieldId: "user-4",
        fieldName: "Address",
        userDetail: "Lahiru"
    },
    {
        fieldId: "user-5",
        fieldName: "City",
        userDetail: "Lahiru"
    },
    {
        fieldId: "user-6",
        fieldName: "Town",
        userDetail: "Lahiru"
    },

]

function ProfileDetails() {
    const user = useSelector((state) => state.user.currentUser);
    console.log(user);
    let userData = [];
    if (user.userrole === "Moderator" || user.userrole === "Advertiser") {
        userData = [
            {
                fieldId: "user-2",
                fieldName: "User Name",
                userDetail: user.username
            },
            {
                fieldId: "user-3",
                fieldName: "Phone Number",
                userDetail: user.phone_number
            },
            {
                fieldId: "user-1",
                fieldName: "Email",
                userDetail: user.email
            },
            {
                fieldId: "user-4",
                fieldName: "Address",
                userDetail: user.address
            },
            {
                fieldId: "user-5",
                fieldName: "City",
                userDetail: user.city
            },
            {
                fieldId: "user-6",
                fieldName: "Town",
                userDetail: user.town
            },
        ]
    } else {
        userData = [
            {
                fieldId: "user-2",
                fieldName: "User Name",
                userDetail: user.username
            },
            {
                fieldId: "user-3",
                fieldName: "Phone Number",
                userDetail: user.phone_number
            },
            {
                fieldId: "user-4",
                fieldName: "Address",
                userDetail: user.address
            },
            {
                fieldId: "user-5",
                fieldName: "City",
                userDetail: user.city
            },
            {
                fieldId: "user-6",
                fieldName: "Town",
                userDetail: user.town
            },
        ]
    }

    return (
        <Box  sx={{ p: 5 }}>
            <Grid container spacing={3}>
                {userData.map((user) => (
                    <Grid key={user.fieldId} item xs={12}>
                        <BankDetailField
                            fieldName={user.fieldName}
                            userDetail={user.userDetail}
                        />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    {/* <CenteredBox align="right"> */}
                    <div style={{ marginRight: 100 }}>
                        <Grid container>
                            <Grid item xs={6}>
                                <CenteredBox align="left">
                                    <UpdatedButton
                                        title="Change Password"
                                    />
                                </CenteredBox>
                            </Grid>
                            <Grid item xs={6}>
                                <CenteredBox align="right">
                                    <UpdateProfileModal
                                        userDetails={{
                                            firstName: "Kumud",
                                            lastName: "Perera",
                                            address: "Galle",
                                            city: "Galle",
                                            town: "Galle",
                                        }}
                                    />
                                </CenteredBox>
                            </Grid>
                        </Grid>
                    </div>
                    {/* </CenteredBox> */}
                </Grid>
            </Grid>
        </Box>

    )
}

export default ProfileDetails