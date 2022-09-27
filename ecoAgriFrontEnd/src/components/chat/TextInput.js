import React, { useState } from "react";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Box, createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#007A31",
        },
    },
    typography: {
        fontFamily: "Poppins",
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
    },
});

function TextInput(props) {

    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        // alert(`The name you entered was: ${message}`)
        { props.setMsg((obj) => ({ ...obj, id: props.id, text: message })) }
    }

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit}>
                <Box
                    sx={{
                        display: "flex",
                    }}>
                    <TextField
                        // variant="filled"
                        placeholder="type here"
                        fullWidth
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        <SendRoundedIcon />
                    </Button>
                </Box>
            </form>
        </ThemeProvider>
    );
}

export default TextInput;