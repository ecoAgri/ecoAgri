import React from 'react'

import { Grid, IconButton } from '@mui/material';
import CenteredBox from '../ui/CenteredBox';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
function GoForward(props) {
    return (
        <React.Fragment>
            {props.show &&
                <CenteredBox align="right">
                    <IconButton>
                        <ChevronRightIcon />
                    </IconButton>
                </CenteredBox>
            }
        </React.Fragment>
    )
}

export default GoForward