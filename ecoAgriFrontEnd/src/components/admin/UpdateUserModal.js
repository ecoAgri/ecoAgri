import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CenteredBox from '../ui/CenteredBox';
import styled from '@emotion/styled';
import { green } from '@mui/material/colors';
import UpdateUserForm from './UpdateUserForm';
import classes from "../ui/ScrollBar.module.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 600,
    overflowY: "scroll",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
    pt: 0,
    pr: 0
};


const ColorButton2 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[600]),
    textTransform: "none",
    backgroundColor: green[600],
    "&:hover": {
        backgroundColor: green[700],
    },
}));
export default function UpdateUserModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true)
        props.onUpdate();
    };
    const handleClose = () => setOpen(false);

    return (
        <React.Fragment>
            <ColorButton2 onClick={handleOpen}>Update</ColorButton2>

            <Modal
                open={open}
            // onClose={handleClose}
            >
                <Box sx={style} className={classes.box}>
                    <CenteredBox align="right">
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </CenteredBox>
                    <Grid container sx={{ pr: 3 }}>
                        <Grid item xs={12}>
                            <UpdateUserForm userType={props.userType} />
                        </Grid>
                    </Grid>

                </Box>
            </Modal>
        </React.Fragment>
    );
}
