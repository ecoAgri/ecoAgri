import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import UserTypeSelector from '../registraion/UserTypeSelector';

import { useSelector } from "react-redux";
import SignUpForm from '../registraion/SignUpForm';
import classes from "./Registration.module.css";

export default function Registration() {
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
    width: (selectedSignupButton !== "") ? 420 : 625,
    height: (selectedSignupButton !== "") ? 650 : "auto",
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
    pr: 0,
  };

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ pr: 4, height: (selectedSignupButton !== "") ? 600 : "auto", overflow: "auto" }} className={classes.box}>
            {selectedSignupButton === "" &&
              <UserTypeSelector />
            }
            {selectedSignupButton !== "" &&
              <SignUpForm userType={selectedSignupButton} />
            }
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
