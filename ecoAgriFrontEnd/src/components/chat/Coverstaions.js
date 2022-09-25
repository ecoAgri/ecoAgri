// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import UserTypeSelector from '../registraion/UserTypeSelector';

// import { useSelector } from "react-redux";
// import SignUpForm from '../registraion/SignUpForm';
// import classes from "./Registration.module.css";

// export default function Registration() {
//   const [open, setOpen] = React.useState(true);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const selectedSignupButton = useSelector(
//     (state) => state.userTypeSelectorButton.selectedSignupButton
//   );

//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: (selectedSignupButton !== "") ? 420 : 625,
//     height: (selectedSignupButton !== "") ? 650 : "auto",
//     bgcolor: 'background.paper',
//     boxShadow: 24,
//     borderRadius: 5,
//     p: 4,
//     pr: 0,
//   };

//   return (
//     <div>
//       {/* <Button onClick={handleOpen}>Open modal</Button> */}
//       <Modal
//         open={open}
//         // onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Box sx={{ pr: 4, height: (selectedSignupButton !== "") ? 600 : "auto", overflow: "auto" }} className={classes.box}>
//             {selectedSignupButton === "" &&
//               <UserTypeSelector />
//             }
//             {selectedSignupButton !== "" &&
//               <SignUpForm userType={selectedSignupButton} />
//             }
//           </Box>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import UserTypeSelector from '../registraion/UserTypeSelector';
import SignUpForm from '../registraion/SignUpForm';
import LogoCom from '../Landing/LogoCom';


import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Grid, IconButton } from '@mui/material';
import LandingAppBar from '../Landing/LandingAppBar';
import ChatList from './ChatList';
function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                ecoAgri
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const steps = ['Select User Type', 'Sign Up'];

export default function Coverstaions(props) {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <ChatList setSelectContactdetails={props.setSelectContactdetails} onClick={handleNext} />;
            case 1:
                return <SignUpForm />;
            // case 2:
            //   return <Review />;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <Paper variant="outlined"
                sx={{
                    boxShadow: 24,
                    borderRadius: 2,
                }}>
                {activeStep !== 0 && (
                    <IconButton onClick={handleBack}>
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                )}
                {/* <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper> */}

                <React.Fragment>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                    </Box>
                </React.Fragment>
            </Paper>
        </React.Fragment>
    );
}

