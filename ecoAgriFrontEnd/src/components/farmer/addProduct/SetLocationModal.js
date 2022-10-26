import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CardMedia, Grid, IconButton, TextField } from '@mui/material';
import CenteredBox from '../../ui/CenteredBox';


import CollectionsIcon from "@mui/icons-material/Collections";
import CloseIcon from '@mui/icons-material/Close';
import GoogleMapContainer from '../../googleMap/GoogleMapContainer';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 1,
  // p: 4,
  // pr: 0,
  // pb: 2,
  // pt: 0
};

export default function AddPostButton(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        style={{ textTransform: "none" }}
        onClick={handleOpen}
      >
        Set the Location
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
                <div style={{ height: "400px", overflowY: "auto" }}>
                  <div>
                    <GoogleMapContainer mapType="get_live_location" />
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
