import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { Grid, IconButton, Typography } from '@mui/material';
// import Carousel from '../ui/Carousel/Carousel';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CenteredBox from '../ui/CenteredBox';
import CloseIcon from '../ui/CloseIcon';
import Coverstaions from './Coverstaions';
import Test from './Test';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    height: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    pr: 0,
    pl: 0,
    pt: 0
};

export default function ChatContainer(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const user = useSelector((state) => state.user.currentUser);
    const userType = user.userrole;

    return (
        <div>
            <IconButton
                onClick={handleOpen}
                variant="contained"
            >
                <ChatBubbleIcon />
            </IconButton>
            <Modal
                open={open}
            // onClose={handleClose}
            >
                <Box sx={style}>
                    <CloseIcon onClose={handleClose} />
                    {/* <Test id="chat-div-id" /> */}
                    <Coverstaions />
                </Box>
            </Modal>
        </div >
    );
}
