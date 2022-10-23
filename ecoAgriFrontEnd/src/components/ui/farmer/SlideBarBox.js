import { Button, Card, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router';
import CenteredBox from '../CenteredBox';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};
function SlideBarBox(props) {
    const navigate = useNavigate();
    const redirectHandler = () => {
        navigate(props.link)
    }
    return (
        <Button component="div" onClick={redirectHandler} variant="contained" sx={{ width: "120px", height: "120px", p: 2, position: 'relative', textTransform: "none" }}>
            <div style={style}>
                <CenteredBox align="center">
                    <Typography>{props.number}</Typography>
                </CenteredBox>
                <CenteredBox align="center">
                    <Typography>{props.name}</Typography>
                </CenteredBox>
            </div>
        </Button>
    )
}

export default SlideBarBox