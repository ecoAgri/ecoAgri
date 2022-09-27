import React from 'react'
import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system'
import CenteredBox from '../../ui/CenteredBox';
import classes from "../../ui/Form.module.css";
import useInput from "../../../hooks/use-input";

const style = {
  // position: 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  width: 400,
  height: 505,
  bgcolor: 'background.paper',
  overflow: "auto",
  border: "none",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

function AddBankForm() {

  const {
    value: accNumber,
    isValid: accNumberIsValid,
    hasError: accNumberHasError,
    error: accNumberError,
    valueChangeHandler: accNumberChangeHandler,
    inputBlurHandler: accNumberBlurHandler,
  } = useInput((value) => {
    if (value.trim() === "") {
      return { inputIsValid: false, error: "Can't be Empty !" };
    }
    // else if (hasNumber(value.trim())) {
    //   return { inputIsValid: false, error: "Can't contained numbers !" };
    // } else if (hasSpecialChars(value.trim())) {
    //   return { inputIsValid: false, error: "Can't contained special chars !" };
    // } 
    else {
      return { inputIsValid: true, error: "" };
    }
  })

  const {
    value: ahName,
    isValid: ahNameIsValid,
    hasError: ahNameHasError,
    error: ahNameError,
    valueChangeHandler: ahNameChangeHandler,
    inputBlurHandler: ahNameBlurHandler,
  } = useInput((value) => {
    if (value.trim() === "") {
      return { inputIsValid: false, error: "Can't be Empty !" };
    }
    // else if (hasNumber(value.trim())) {
    //   return { inputIsValid: false, error: "Can't contained numbers !" };
    // } else if (hasSpecialChars(value.trim())) {
    //   return { inputIsValid: false, error: "Can't contained special chars !" };
    // } 
    else {
      return { inputIsValid: true, error: "" };
    }
  })

  const {
    value: bank,
    isValid: bankIsValid,
    hasError: bankHasError,
    error: bankError,
    valueChangeHandler: bankChangeHandler,
    inputBlurHandler: bankBlurHandler,
  } = useInput((value) => {
    if (value === "") {
      return { inputIsValid: false, error: "Can't be Empty !" };
    }
    // else if (hasNumber(value.trim())) {
    //   return { inputIsValid: false, error: "Can't contained numbers !" };
    // } else if (hasSpecialChars(value.trim())) {
    //   return { inputIsValid: false, error: "Can't contained special chars !" };
    // } 
    else {
      return { inputIsValid: true, error: "" };
    }
  })

  const {
    value: branch,
    isValid: branchIsValid,
    hasError: branchHasError,
    error: branchError,
    valueChangeHandler: branchChangeHandler,
    inputBlurHandler: branchBlurHandler,
  } = useInput((value) => {
    if (value === "") {
      return { inputIsValid: false, error: "Can't be Empty !" };
    }
    // else if (hasNumber(value.trim())) {
    //   return { inputIsValid: false, error: "Can't contained numbers !" };
    // } else if (hasSpecialChars(value.trim())) {
    //   return { inputIsValid: false, error: "Can't contained special chars !" };
    // } 
    else {
      return { inputIsValid: true, error: "" };
    }
  })

  let formIsValid = false;
  if (accNumberIsValid && ahNameIsValid && branchIsValid && bankIsValid) {
    formIsValid = true;
  }
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!accNumberIsValid && !ahNameIsValid && !branchIsValid && !bankIsValid) {
      return;
    }

    //api call here
  }
  return (
    <div>
      <CenteredBox align="center">
        <Box sx={style}>
          <form onSubmit={onSubmitHandler}>
            <Grid container sx={{ mb: 3 }}>
              <Grid item xs={12}>
                <CenteredBox align="center">
                  <Typography variant="h5">Enter Bank Details</Typography>
                </CenteredBox>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Account Number"
                  type="number"
                  name="AccountNumber"
                  value={accNumber}
                  onChange={accNumberChangeHandler}
                  onBlur={accNumberBlurHandler}
                  error={accNumberHasError}
                  helperText={accNumberHasError ? accNumberError : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Account holder's name"
                  type="text"
                  name="ahName"
                  value={ahName}
                  onChange={ahNameChangeHandler}
                  onBlur={ahNameBlurHandler}
                  error={ahNameHasError}
                  helperText={ahNameHasError ? ahNameError : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required error={bankHasError}>
                  <InputLabel>Bank</InputLabel>
                  <Select
                    label="Bank"
                    value={bank}
                    onChange={bankChangeHandler}
                    onBlur={bankBlurHandler}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Sampath Bank</MenuItem>
                    <MenuItem value={2}>People's Bank</MenuItem>
                    <MenuItem value={3}>bank of Peradeniya</MenuItem>
                    <MenuItem value={4}>bank of Kelaniya</MenuItem>
                    <MenuItem value={5}>bank of Japura</MenuItem>
                    <MenuItem value={6}>bank of Ruhuna</MenuItem>
                  </Select>
                  <FormHelperText>{bankHasError ? bankError : ""}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required error={branchHasError}>
                  <InputLabel>Branch</InputLabel>
                  <Select
                    label="Branch"
                    value={branch}
                    onChange={branchChangeHandler}
                    onBlur={branchBlurHandler}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Moratuwa</MenuItem>
                    <MenuItem value={2}>Colombo</MenuItem>
                    <MenuItem value={3}>Peradeniya</MenuItem>
                    <MenuItem value={4}>Kelaniya</MenuItem>
                    <MenuItem value={5}>Japura</MenuItem>
                    <MenuItem value={6}>Ruhuna</MenuItem>
                  </Select>
                  <FormHelperText>{branchHasError ? branchError : ""}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12}>

              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={1}>
                <FormControlLabel sx={{ m: 0 }} control={<Checkbox sx={{ p: 0 }} defaultChecked />} />
              </Grid>
              <Grid item xs={11}>
                <p className={classes.text}>
                  I acknowledge that my bank account details is saved in my ecoAgri account for subsequent transations
                </p>
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 3 }}>
              <Grid item xs={12}>
                <Button fullWidth variant="contained" type="submit" style={{ textTransform: "none" }} disabled={!formIsValid}>Submit</Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </CenteredBox>
    </div>
  )
}

export default AddBankForm