import * as React from 'react';
import Paper from '@mui/material/Paper';
import ChatList from './ChatList';
import ChatWall from './ChatWall';

const steps = ['Select User Type', 'Sign Up'];

export default function Coverstaions(props) {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const [selectContactdetails, setSelectContactdetails] = React.useState({ value1: 0, value2: "" });

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <ChatList setSelectContactdetails={setSelectContactdetails} onClick={handleNext} />;
            case 1:
                return <ChatWall onBack={handleBack} selectContactdetails={selectContactdetails}  />;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <React.Fragment>
            <Paper variant="outlined">
                {getStepContent(activeStep)}
            </Paper>
        </React.Fragment>
    );
}

