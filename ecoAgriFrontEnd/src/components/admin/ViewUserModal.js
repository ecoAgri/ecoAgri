import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CenteredBox from '../ui/CenteredBox';
import styled from '@emotion/styled';
import { blue } from '@mui/material/colors';
import UpdateUserForm from './UpdateUserForm';
import BankDetailField from '../farmer/sell/BankDetailField';
import ViewUserDetails from './ViewUserDetails';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
    pt: 0,
    pr: 0
};


const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[600]),
    textTransform: "none",
    backgroundColor: blue[600],
    "&:hover": {
        backgroundColor: blue[700],
    },
}));
export default function ViewUserModal(props) {
   // console.log(props);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
        props.onView();
    };

    const handleClose = () => setOpen(false);

    return (
        <React.Fragment>
            <ColorButton onClick={handleOpen}>View User</ColorButton>
            <Modal
                open={open}
            // onClose={handleClose}
            >
                <Box sx={style}>
                    <CenteredBox align="right">
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </CenteredBox>
                    <Box sx={{ pr: 3 }}>
                        {/* There should add userType */}
                        <ViewUserDetails data={props.data} />
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}
