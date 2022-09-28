import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import classes from "../registraion/SignUpForm.module.css";
import CenteredBox from "../ui/CenteredBox";
import PasswordInputField from "../ui/PasswordInputField";

import { login } from "../../store/userApiCalls";
import { useDispatch, useSelector } from "react-redux";

function SignInForm() {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.user.currentUser);
  let userError = useSelector((state) => state.user.error);
  const dispatch = useDispatch();

  const loginPress = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    let userData = {
      phone_number: data.get("phoneNumber"),
      // password: data.get("password"),
      password: password,
    };
    console.log(userData);
    if (!userData.phone_number) {
      setEmailError(true);
      setErrorMessageEmail("Mobile number can't be empty!");
    } else if (!userData.password) {
      setPasswordError(true);
      setErrorMessagePassword("Password can't be empty!");
    } else {
      console.log(userData);
      await login(dispatch, userData);
      const TOKEN = JSON.parse(localStorage.getItem("accessToken"));
      console.log(TOKEN);
      // setLoginErrorSet(userError);
      // console.log(user);
      // console.log(userError);
      // if (userError) {
      //   setLoginCancelShow(true);
      //   // window.location.href = "http://localhost:3000/login";
      // } else {
      //   setLoginShow(true);
      // }
    }
  };
  return (
    <form onSubmit={loginPress}>
      <Grid container sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <CenteredBox align="center">
            <Typography>Welcome Back !</Typography>
          </CenteredBox>
        </Grid>
        <Grid item xs={12}>
          <CenteredBox align="center">
            <Typography>Please, Login</Typography>
          </CenteredBox>
        </Grid>
      </Grid>
      <Grid container sx={{ mb: 3 }} spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="standard"
            name="phoneNumber"
            id="phoneNumber"
            label="Mobile Number"
            autoFocus
            helperText={errorMessageEmail}
            required
            onChange={() => {
              setEmailError(false);
              setErrorMessageEmail("");
            }}
            error={emailError}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <PasswordInputField
            error={passwordError}
            label="Password"
            id="password"
            name="password"
            helperText={errorMessagePassword}
            required
            autoFocus
            onChange={(e) => {
              setPasswordError(false);
              setErrorMessagePassword("");
              setPassword(e.target.value);
            }}
          />
          <CenteredBox align="right">
            <p className={classes.text}>
              <a href="#">Forget Password?</a>
            </p>
          </CenteredBox>
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            style={{ textTransform: "none", borderRadius: 10 }}
          >
            {" "}
            Sign In{" "}
          </Button>
          <CenteredBox align="center">
            <p className={classes.text}>
              Don't have an account? <a href="#">sign up</a>
            </p>
          </CenteredBox>
        </Grid>
      </Grid>
    </form>
  );
}

export default SignInForm;
