import { Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
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
    return (
        <>
            <Grid container spacing={3}>
                {DUMMY_USER.map((user) => (
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

        </>
    )
}

export default ProfileDetails