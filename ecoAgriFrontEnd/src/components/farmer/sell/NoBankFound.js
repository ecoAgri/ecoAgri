import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 600,
    // height: 505,
    // p: 4,
};
function NoBankFound() {
    return (
        <Box sx={style}><Typography>Sorry No Bank Detail Found !</Typography></Box>
    )
}

export default NoBankFound