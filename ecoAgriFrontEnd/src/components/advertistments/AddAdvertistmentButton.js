import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CardMedia, Grid, IconButton, TextField, FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material';
import CenteredBox from '../ui/CenteredBox';


import CollectionsIcon from "@mui/icons-material/Collections";
import UseImageOneInput from '../../hooks/use-ImageOneInput';
import CloseIcon from '@mui/icons-material/Close';
import FileUploader from '../ui/fileUploader/FileUploader';
import useInput from '../../hooks/use-input';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 6,
    p: 4,
    pr: 0,
    pb: 2,
    pt: 0
};

export default function AddAdvertistmentButton(props) {
    const [file, setFile] = React.useState(null);
    const setAdvertistment = (value) => {
        setFile(value)
    }

    const {
        value: category,
        isValid: categoryIsValid,
        hasError: categoryHasError,
        error: categoryError,
        valueChangeHandler: categoryChangeHandler,
        inputBlurHandler: categoryBlurHandler,
        reset: categoryReset
    } = useInput((value) => {
        if (value === "") {
            return { inputIsValid: false, error: "Can't be Empty !" }
        } else {
            return { inputIsValid: true, error: "" }
        }
    })

    const {
        value: companyName,
        isValid: companyNameIsValid,
        hasError: companyNameHasError,
        error: companyNameError,
        valueChangeHandler: companyNameChangeHandler,
        inputBlurHandler: companyNameBlurHandler,
        reset: companyNameReset
    } = useInput((value) => {
        if (value.trim() === "") {
            return { inputIsValid: false, error: "Can't be Empty !" };
        } else {
            return { inputIsValid: true, error: "" };
        }
    })

    let formIsValid = false;
    if (companyNameIsValid && categoryIsValid && (file !== null)) {
        formIsValid = true;
    }
    const advertistmentHandler = () => {
        if (!formIsValid) {
            return
        }
        const data = {
            image: file,
            category: category,
            companyName: companyName
        }
        console.log(data);
        categoryReset();
        companyNameReset();
        setFile(null);
        // api call here
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <CenteredBox align="center">
                        <Typography variant='h4'> Add Advertistment</Typography>
                    </CenteredBox>
                </Grid>
                <Grid item xs={12}>
                    <div style={{ height: "600px", overflowY: "auto" }}>
                        <div style={{ marginRight: "30px" }}>
                            <TextField
                                sx={{ my: 2 }}
                                label="Company name"
                                type="text"
                                variant="standard"
                                onChange={companyNameChangeHandler}
                                onBlur={companyNameBlurHandler}
                                error={companyNameHasError}
                                helperText={companyNameHasError ? companyNameError : ""}
                                value={companyName}
                                required
                                fullWidth
                            />
                            <FormControl variant="standard"
                                sx={{ width: "100%", mb: 4 }} required
                                error={categoryHasError}
                            >
                                <InputLabel id="category">
                                    Advertistment Category
                                </InputLabel>
                                <Select
                                    label="Post Category"
                                    value={category}
                                    onChange={categoryChangeHandler}
                                    onBlur={categoryBlurHandler}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={1}>
                                        <em>Agriculture</em>
                                    </MenuItem>
                                    <MenuItem value={2}>
                                        <em>Farm Plans</em>
                                    </MenuItem>
                                    <MenuItem value={3}>
                                        <em>Natural Fruits</em>
                                    </MenuItem>
                                    <MenuItem value={4}>
                                        <em>Organic</em>
                                    </MenuItem>
                                </Select>
                                <FormHelperText>{categoryHasError ? categoryError : ""}</FormHelperText>
                            </FormControl>

                            <FileUploader
                                required
                                // label="Registration proof"
                                type="img"
                                id="file"
                                name="file"
                                path="/images/advertistments"
                                imageType="advertistment"
                                onChange={setAdvertistment}
                            />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sx={{ mt: 2 }}>
                    <div style={{ marginRight: "30px" }}>
                        <Grid container>
                            <Grid item xs={9}>

                            </Grid>
                            <Grid item xs={3}>
                                <CenteredBox align="right">
                                    <Button
                                        variant="contained"
                                        style={{ borderRadius: 20, textTransform: "none" }}
                                        onClick={advertistmentHandler}
                                        disabled={!formIsValid}
                                    >
                                        Add Post
                                    </Button>
                                </CenteredBox>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
