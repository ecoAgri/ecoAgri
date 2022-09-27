import { Avatar, Grid, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import ProfileDetails from '../farmer/profile/ProfileDetails'
import ShowBankDetails from '../farmer/sell/ShowBankDetails'
import CenteredBox from '../ui/CenteredBox'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    // bgcolor: 'background.paper',
    // border: "none",
    // boxShadow: 24,
    // borderRadius: 5,
    // p: 4,
    // pr: 0,
}
function ProfileContent() {
    return (
        <div>
            <Grid container>
                <Grid>
                    <div>
                        <Grid container>
                            <Grid item sm={12} md={5}>
                                <CenteredBox align="center">
                                    <IconButton>
                                        <Avatar sx={{ width: 200, height: 200 }} />
                                    </IconButton>
                                </CenteredBox>
                            </Grid>
                            <Grid item sm={12} md={7}>
                                <ProfileDetails />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProfileContent