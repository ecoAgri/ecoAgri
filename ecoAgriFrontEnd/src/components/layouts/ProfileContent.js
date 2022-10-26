import { Avatar, Grid, IconButton } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import ProfileDetails from '../farmer/profile/ProfileDetails'
import ShowBankDetails from '../farmer/sell/ShowBankDetails'
import CenteredBox from '../ui/CenteredBox'
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";


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
    let user = useSelector((state) => state.user.currentUser);
    // useEffect(()=>{
    //     const userGetData = ()=>{

    //     }
    // });

    return (
        <div>
            <Grid container spacing={5}>
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
    )
}

export default ProfileContent