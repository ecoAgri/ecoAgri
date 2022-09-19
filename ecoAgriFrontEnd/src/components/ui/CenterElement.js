import { Box } from '@mui/system'
import React from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    // bgcolor: 'background.paper',
    // border: "none",
    // boxShadow: 24,
    // borderRadius: 5,
    // p: 4,
    // pr: 0,
}

function CenterElement(props) {
    return (
        <Box sx={{postion: "relative"}}>
            <Box sx={style}>
                {props.element}
            </Box>
        </Box>
    )
}

export default CenterElement