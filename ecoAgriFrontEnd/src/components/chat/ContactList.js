import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import Contacts from './Contacts';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
];

export default function ContactList(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleToggle = () => {
        if (open) {
            // setOpen(false)
        } else {
            setOpen(true)
        }
    }

    return (
        <Box>
            <Backdrop open={open} onClick={handleClose} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<ChatBubbleIcon />}
                open={open}
                onClick={handleOpen}
            >
                {open && <Contacts onSelect={props.onSelect} setSelectContactdetails={props.setSelectContactdetails} onClose={handleClose} />}
            </SpeedDial>
        </Box>
    );
}
