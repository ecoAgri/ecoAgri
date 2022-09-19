import { Button } from '@mui/material'
import React from 'react'

function UpdatedButton(props) {
    return (
        <Button variant={props.variant} style={{ textTransform: "none" }} onClick={props.onClick}>
            {props.title}
        </Button>
    )
}

export default UpdatedButton