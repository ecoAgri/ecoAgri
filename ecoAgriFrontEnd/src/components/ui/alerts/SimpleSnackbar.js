import React, { useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Link } from "@mui/material";

export default function SimpleSnackbar(props) {
    const [open, setOpen] = useState(true);
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        setOpen(false);
    };

    const vertical = props.vertical;
    const horizontal = props.horizontal;
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
            sx={{width:"50%"}}
        >
            {/* <Stack sx={{ width: '100%' }} spacing={2}></Stack> */}
            <Alert onClose={handleClose} variant={props.variant} severity={props.alertType} sx={{ width: "100%" }}>
                {props.message}
            </Alert>
        </Snackbar>
    );
}
