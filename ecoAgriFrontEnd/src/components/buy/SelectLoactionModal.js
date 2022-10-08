import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CardMedia, Grid, IconButton, TextField } from '@mui/material';
import CenteredBox from '../ui/CenteredBox';


import CollectionsIcon from "@mui/icons-material/Collections";
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DistrictSelector from './DistrictSelector';
import Locations from './Locations';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    pr: 0,
    pb: 2,
    pt: 0
};

export default function SelectLoactionModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Button
                startIcon={<LocationOnIcon />}
                onClick={handleOpen}
            >
                Select Location
            </Button>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <Grid container>
                            <Grid item xs={12}>
                                <CenteredBox align="right">
                                    <IconButton
                                        onClick={handleClose}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </CenteredBox>
                            </Grid>
                            <Grid item xs={12}>
                                <div style={{ height: "600px", overflowY: "auto" }}>
                                    <div style={{ marginRight: "30px" }}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <DistrictSelector />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Locations />
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            </Modal>
        </div >
    );
}
