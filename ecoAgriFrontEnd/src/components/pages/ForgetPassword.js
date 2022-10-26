import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import UserTypeSelector from '../registraion/UserTypeSelector';

import { useSelector } from "react-redux";
import SignUpForm from '../registraion/SignUpForm';
import classes from "./Registration.module.css";
import { Grid, TextField } from '@mui/material';
import UpdatedButton from '../ui/UpdatedButton';
import CenteredBox from '../ui/CenteredBox';

import "./OtpVerify.css";
export default function ForgetPassword() {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const selectedSignupButton = useSelector(
        (state) => state.userTypeSelectorButton.selectedSignupButton
    );

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };

    return (

        <Box sx={style}>
            <div class="container">
                <form>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h5" color="primary">
                                Verify The Mobile Number
                            </Typography>

                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Enter Your Registered Mobile Number To Check Your Registration
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="number"
                                label="Enter your mobile number"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CenteredBox align="center">
                                <UpdatedButton variant="contained" title={"Send OTP"} />
                            </CenteredBox>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Box>
    );
}
