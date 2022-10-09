import { Button, CardMedia, Typography } from '@mui/material'
import React from 'react'
import CenteredBox from '../ui/CenteredBox';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};
function TabLabel(props) {
    return (
        <Button sx={{ width: "120px", height: "120px", p: 2, position: 'relative', textTransform: "none" }}>
            <div style={style}>
                <CenteredBox align="center">
                    <CardMedia image='' />
                
                </CenteredBox>
            </div>
        </Button>
    )
}

export default TabLabel