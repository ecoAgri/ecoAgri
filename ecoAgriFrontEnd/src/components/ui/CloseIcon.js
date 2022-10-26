import { IconButton } from '@mui/material'
import React from 'react'
import CenteredBox from './CenteredBox'
import Close from '@mui/icons-material/Close';

function CloseIcon(props) {
    return (
        <CenteredBox align="right">
            <IconButton
                onClick={props.onClose}
                variant="contained"
            >
                <Close />
            </IconButton>
        </CenteredBox>
    )
}

export default CloseIcon