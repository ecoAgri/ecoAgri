import React from 'react'

import { Grid, IconButton } from '@mui/material';
import CenteredBox from '../ui/CenteredBox';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
function GoBackIcon(props) {
    return (
        <React.Fragment>
            {props.show &&
                <CenteredBox align="left">
                    <IconButton>
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                </CenteredBox>
            }
        </React.Fragment>
    )
}

export default GoBackIcon