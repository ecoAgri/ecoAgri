import { Box, Button, Grid, IconButton, Typography } from '@mui/material'
import React from 'react'
import CenteredBox from '../ui/CenteredBox';
import classes from '../ui/fileUploader/FileUploader.module.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const style = {
    bgcolor: 'background.paper',
};

const charityConfirmHandler = (type) => {
    Swal.fire({
        title: `Are you want to ${type} the registration?`,
        text: "You won't be able to revert this!",
        icon: type === "reject" ? 'error' : 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, ${type} it!`
    }).then((result) => {
        if (result.isConfirmed) {
            //Confirmation backend call here
            Swal.fire(
                `${type}!`,
                `Artical has been ${type}.`,
                'success'
            )
        }
    })
}
function CharityField(props) {
    const navigate = useNavigate();
    return (
        <Box sx={{ bgcolor: "#fff", p: 2 }}>
            <Grid container>
                <Grid item xs={12}>
                    <Grid sx={{ p: 2 }} container className={classes.li}>
                        <Grid item xs={11}>
                            <Typography>{props.charityName}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton onClick={() => {window.open(props.link, '_blank');}}>
                                <VisibilityIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained" onClick={() => {charityConfirmHandler("confirm")}}>Confirm Registration</Button>
                </Grid>
                <Grid item xs={6}>
                    <CenteredBox align="right">
                        <Button variant="outlined" color="error" onClick={() => {charityConfirmHandler("reject")}}>Reject Registration</Button>
                    </CenteredBox>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CharityField