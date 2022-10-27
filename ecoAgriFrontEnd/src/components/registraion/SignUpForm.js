import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userTypeSelectorButtonActions } from "../../store/userType-selector-slice";
import CenteredBox from "../ui/CenteredBox";
import GoBackIcon from "../ui/GoBackIcon";
import GoForward from "../ui/GoForward";
import ImageUploader from "../ui/imageUploader/ImageUploader";
import PasswordInputField from "../ui/PasswordInputField";
import classes from "./SignUpForm.module.css";
import { register } from "../../store/userApiCalls";
import { useNavigate } from "react-router";
import useInput from "../../hooks/use-input";
import FileUploader from "../ui/fileUploader/FileUploader";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";
import Swal from "sweetalert2";
import { storage } from "../../Firebase";
import BackDrop from "../ui/BackDrop";
import DistrictService from "../../services/DistrictService";
import PlaceSelector from "./PlaceSelector";
function SignUpForm(props) {
  // https://raw.githubusercontent.com/Group22UCSC/thekolaya/main/vendors/images/default_profile/profile.jpg
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [isDataUploading, setIsDataUploading] = useState(false);
  const [registrationResult, setRegistrationResult] = useState(0);
  const setCharityFile = (value) => {
    setFile(value)
  }
  const selectedSignupButton = useSelector(
    (state) => state.userTypeSelectorButton.selectedSignupButton
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const backButtonClicked = () => {
    dispatch(
      userTypeSelectorButtonActions.setBeforeClickBackButton(props.userType)
    );
    dispatch(userTypeSelectorButtonActions.setSelectedSignupButton(""));
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  //Helpers to validate Fname and Lname
  const hasNumber = (string) => {
    return /\d/.test(string);
  }

  const hasSpecialChars = (string) => {
    let pattern = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (string.match(pattern)) {
      return true;
    } else {
      return false;
    }
  }
  //-------------------

  //First Name Validate
  const {
    value: fname,
    isValid: fnameIsValid,
    hasError: fnameHasError,
    error: fnameError,
    valueChangeHandler: fnameChangeHandler,
    inputBlurHandler: fnameBlurHandler,
  } = useInput((value) => {
    if (value.trim() === "") {
      return { inputIsValid: false, error: "Can't be Empty !" };
    } else if (hasNumber(value.trim())) {
      return { inputIsValid: false, error: "Can't contained numbers !" };
    } else if (hasSpecialChars(value.trim())) {
      return { inputIsValid: false, error: "Can't contained special chars !" };
    } else {
      return { inputIsValid: true, error: "" };
    }
  })

  //Last Name Validate
  const {
    value: lname,
    isValid: lnameIsValid,
    hasError: lnameHasError,
    error: lnameError,
    valueChangeHandler: lnameChangeHandler,
    inputBlurHandler: lnameBlurHandler,
  } = useInput((value) => {
    if (value.trim() === "") {
      return { inputIsValid: false, error: "Can't be Empty !" };
    } else if (hasNumber(value.trim())) {
      return { inputIsValid: false, error: "Can't contained numbers !" };
    } else if (hasSpecialChars(value.trim())) {
      return { inputIsValid: false, error: "Can't contained special chars !" };
    } else {
      return { inputIsValid: true, error: "" };
    }
  })

  //Validate The mobile
  function phonenumber(inputtxt) {
    var phoneno = /^\d*(?:\.\d{1,2})?$/;
    if (inputtxt.match(phoneno)) {
      return true;
    } else {
      return false;
    }
  }
  const {
    value: phone_number,
    isValid: phone_numberIsValid,
    hasError: phone_numberHasError,
    error: phone_numberError,
    valueChangeHandler: phone_numberChangeHandler,
    inputBlurHandler: phone_numberBlurHandler,
  } = useInput((value) => {
    if (value.trim() === "") {
      return { inputIsValid: false, error: "Can't be Empty !" };
    } else if (value.trim().length > 10) {
      return { inputIsValid: false, error: "More than 10 charcters" };
    } else if (!phonenumber(value.trim())) {
      return { inputIsValid: false, error: "Phone number can't include characters" };
    } else {
      return { inputIsValid: true, error: "" };
    }
  })

  const {
    value: address,
    isValid: addressIsValid,
    hasError: addressHasError,
    error: addressError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
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

  //Helper For Email validataion
  const emailValidation = (email) => {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(pattern)) {
      return true;
    } else {
      return false;
    }
  }
  //Email Validation
  const [emailResponse, setEmailResponse] = useState("");
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    error: emailError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => {

    if (value.trim() === "") {
      return { inputIsValid: false, error: "Can't be Empty !" };
    } else if (emailValidation(value.trim())) {
      return { inputIsValid: false, error: "Email is not completed !" };
    } else {
      return { inputIsValid: true, error: "" };
    }
  })

  const {
    value: registerNo,
    isValid: registerNoIsValid,
    hasError: registerNoHasError,
    error: registerNoError,
    valueChangeHandler: registerNoChangeHandler,
    inputBlurHandler: registerNoBlurHandler,
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
    value: town,
    isValid: townIsValid,
    hasError: townHasError,
    error: townError,
    valueChangeHandler: townChangeHandler,
    inputBlurHandler: townBlurHandler,
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
    value: city,
    isValid: cityIsValid,
    hasError: cityHasError,
    error: cityError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
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

  //Helper for the password
  function CheckPassword(string) {
    let pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10000}$/;
    if (!string.match(pattern)) {
      return true;
    } else {
      return false;
    }
  }
  //Password Validation
  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    error: passwordError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => {
    if (value.trim() === "") {
      return { inputIsValid: false, error: "Can't be Empty !" };
    } else if (value.trim().length <= 8) {
      return { inputIsValid: false, error: "Password is short !" };
    } else if (CheckPassword(value.trim())) {
      return { inputIsValid: false, error: "Password is not strong !" };
    } else {
      return { inputIsValid: true, error: "" };
    }
  })

  //Confirm Password Validation
  const {
    value: confirmPassword,
    isValid: confirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    error: confirmPasswordError,
    valueChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
  } = useInput((value) => {
    if (value.trim() === "") {
      return { inputIsValid: false, error: "Can't be Empty !" };
    } else if (password !== value.trim()) {
      return { inputIsValid: false, error: "Password not match !" };
    } else {
      return { inputIsValid: true, error: "" };
    }
  })


  const [checked, setChecked] = useState(false);
  const signUpAgreeHandler = (event) => {
    setChecked(event.target.checked);
  };

  let formIsValid = false;
  if (props.from === "create_user") {
    if (props.userType === "Farmer") {
      if (fnameIsValid && lnameIsValid && phone_numberIsValid && addressIsValid && cityIsValid && townIsValid && passwordIsValid && confirmPasswordIsValid) {
        formIsValid = true;
      }
    } else if (props.userType === "Buyer") {
      if (fnameIsValid && lnameIsValid && phone_numberIsValid && passwordIsValid && confirmPasswordIsValid) {
        formIsValid = true;
      }
    } else if (props.userType === "Charity") {
      if (fnameIsValid && lnameIsValid && registerNoIsValid && phone_numberIsValid && addressIsValid && cityIsValid && townIsValid && passwordIsValid && confirmPasswordIsValid) {
        formIsValid = true;
      }
    } else if (props.userType === "Advertiser" || props.userType === "AgriExpert") {
      if (fnameIsValid && lnameIsValid && emailIsValid && phone_numberIsValid && addressIsValid && cityIsValid && townIsValid && passwordIsValid && confirmPasswordIsValid) {
        formIsValid = true;
      }
    }
  } else {
    if (props.userType === "Farmer") {
      if (fnameIsValid && lnameIsValid && phone_numberIsValid && addressIsValid && cityIsValid && townIsValid && passwordIsValid && confirmPasswordIsValid && checked) {
        formIsValid = true;
      }
    } else if (props.userType === "Buyer") {
      if (fnameIsValid && lnameIsValid && phone_numberIsValid && passwordIsValid && confirmPasswordIsValid && checked) {
        formIsValid = true;
      }
    } else if (props.userType === "Charity") {
      if (fnameIsValid && lnameIsValid && registerNoIsValid && phone_numberIsValid && addressIsValid && cityIsValid && townIsValid && passwordIsValid && confirmPasswordIsValid && checked) {
        formIsValid = true;
      }
    } else if (props.userType === "Advertiser" || props.userType === "AgriExpert") {
      if (fnameIsValid && lnameIsValid && emailIsValid && phone_numberIsValid && addressIsValid && cityIsValid && townIsValid && passwordIsValid && confirmPasswordIsValid && checked) {
        formIsValid = true;
      }
    }
  }



  const clickRegister = async (e) => {
    e.preventDefault();
    setIsDataUploading(true);
    if (!formIsValid) {
      return;
    }
    let data = {
      username: `${fname} ${lname}`,
      phone_number: phone_number,
      address: address,
      email: email,
      city: city,
      town: town,
      registerNo: registerNo,
      userrole: props.userType,
      password: password,
      confPassword: confirmPassword,
    };

    if (props.userType === "Charity") {
      data = {
        ...data,
        registerNo: "",
        img: file,
        isAccept: false,
      };
      const status = register(data);
      if (status) {
        Swal.fire(
          'Registration Success!',
          'You clicked the button!',
          'success'
        ).then(() => {
          // window.location.href = "/login";
          navigate("/login");
        })
      }
      setIsDataUploading(false);
    } else {
      data = {
        ...data,
        registerNo: "",
        img: "",
        isAccept: false,
      };
      // setRegistrationResult(register(data))
      const status = register(data);
      if (status) {
        if (props.from === undefined) {
          Swal.fire(
            'Registration Success!',
            'You clicked the button!',
            'success'
          ).then(() => {
            // window.location.href = "/login";
            navigate("/login");
          })
        } else if (props.from === "create_user") {
          Swal.fire(
            'Registration Success!',
            'You clicked the button!',
            'success'
          ).then(() => {
            navigate("/admin/manage-users");
          })
        }

      }


      setIsDataUploading(false);
    }
  };
  // if (registrationResult) {
  //   Swal.fire(
  //     'Registration Success!',
  //     'You clicked the button!',
  //     'success'
  //   ).then(() => {
  //     navigate("/login");
  //   })
  // }
  const districtPlaces = []
  let cityPlaces = []
  DistrictService.map((place) => (
    districtPlaces.push(place.district)
  ))
  // console.log()
  DistrictService.map((place) => {
    if (city === place.district) {
      cityPlaces = place.cities
    }
  })
  return (
    <div>
      {/* <BackDrop dataUploading={isDataUploading} /> */}
      <form onSubmit={clickRegister}>
        <div onClick={backButtonClicked}>
          <GoBackIcon show={selectedSignupButton !== ""} />
        </div>
        <Grid container sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <CenteredBox align="center">
              {props.from === undefined &&
                <Typography variant="h5">Sign up as {props.userType}</Typography>
              }
              {props.from === "create_user" &&
                <Typography variant="h5">Create {props.userType}</Typography>
              }
            </CenteredBox>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              variant="standard"
              label="First Name"
              name="fname"
              id="fname"
              type="text"
              // onChange={handleChange}
              value={fname}
              onChange={fnameChangeHandler}
              onBlur={fnameBlurHandler}
              error={fnameHasError}
              helperText={fnameHasError ? fnameError : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              variant="standard"
              label="Last Name"
              name="lname"
              id="lname"
              type="text"
              // onChange={handleChange}
              value={lname}
              onChange={lnameChangeHandler}
              onBlur={lnameBlurHandler}
              error={lnameHasError}
              helperText={lnameHasError ? lnameError : ""}
            />
          </Grid>

        </Grid>
        <Grid container sx={{ mb: 3 }} spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              variant="standard"
              fullWidth
              label="Phone number"
              name="phone_number"
              id="phone_number"
              type="text"
              value={phone_number}
              onChange={phone_numberChangeHandler}
              onBlur={phone_numberBlurHandler}
              error={phone_numberHasError}
              helperText={phone_numberHasError ? phone_numberError : ""}
            />
          </Grid>
          {props.userType !== "Buyer" && (
            <Grid item xs={12}>
              <TextField
                required
                variant="standard"
                fullWidth
                label="Address"
                name="address"
                id="address"
                type="text"
                value={address}
                onChange={addressChangeHandler}
                onBlur={addressBlurHandler}
                error={addressHasError}
                helperText={addressHasError ? addressError : ""}
              />
            </Grid>
          )}
          {(props.userType === "Advertiser" || props.userType === "AgriExpert") && (
            <Grid item xs={12}>
              <TextField
                required
                variant="standard"
                fullWidth
                label="Email"
                name="email"
                id="email"
                type="email"
                value={email}
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                error={emailHasError}
                helperText={emailHasError ? emailError : ""}
              />
            </Grid>
          )}
        </Grid>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <PlaceSelector
              label="District"
              value={city}
              onChange={cityChangeHandler}
              onBlur={cityBlurHandler}
              cities={districtPlaces}
              hasError={cityHasError}
              error={cityError}
            />
            {/* <TextField
              required
              variant="standard"
              label="District"
              value={city}
              onChange={cityChangeHandler}
              onBlur={cityBlurHandler}
              error={cityHasError}
              helperText={cityHasError ? cityError : ""}
              fullWidth
            /> */}
          </Grid>
          <Grid item xs={6}>
            <PlaceSelector
              label="City"
              value={town}
              onChange={townChangeHandler}
              onBlur={townBlurHandler}
              cities={cityPlaces}
              disabled={city === ""}
              hasError={townHasError}
              error={townError}
            />
            {/* <TextField
              required
              variant="standard"
              label="Town"
              value={town}
              onChange={townChangeHandler}
              onBlur={townBlurHandler}
              error={townHasError}
              helperText={townHasError ? townError : ""}
              fullWidth
            /> */}
          </Grid>
        </Grid>
        <Grid container sx={{ mb: 3 }} spacing={3}>
          {props.userType === "Charity" && (
            <Grid item xs={12}>
              <TextField
                label="Registration No."
                required
                variant="standard"
                fullWidth
                type="text"
                value={registerNo}
                onChange={registerNoChangeHandler}
                onBlur={registerNoBlurHandler}
                error={registerNoHasError}
                helperText={registerNoHasError ? registerNoError : ""}
              />
            </Grid>
          )}
          {props.userType === "Charity" && (
            <Grid item xs={12}>
              <FileUploader
                required
                label="Registration proof"
                type="file"
                id="file"
                name="file"
                path="/signup/charityProof"
                onChange={setCharityFile}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <PasswordInputField
              label="Password"
              id="standard-adornment-sign-up-password"
              name="password"
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              error={passwordHasError}
              helperText={passwordHasError ? passwordError : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <PasswordInputField
              label="Confirm Password"
              name="confirm_password"
              id="standard-adornment-sign-up-confirm-password"
              value={confirmPassword}
              onChange={confirmPasswordChangeHandler}
              onBlur={confirmPasswordBlurHandler}
              error={confirmPasswordHasError}
              helperText={confirmPasswordHasError ? confirmPasswordError : ""}
            />
          </Grid>
          {props.from === undefined &&
            <React.Fragment>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={signUpAgreeHandler}
                    />}
                  label={
                    <p className={classes.text}>
                      By signing up, I agree to the{" "}
                      <a href="#">Terms of Services</a> and{" "}
                      <a href="#">Privacy Policy</a>
                    </p>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  style={{ textTransform: "none", borderRadius: 10 }}
                  disabled={!formIsValid}
                >
                  Sign Up
                </Button>
                <CenteredBox align="center">
                  <p className={classes.text}>
                    Already have an account? <a style={{ cursor: "pointer" }} onClick={() => { navigate("/login") }}>sign in</a>
                  </p>
                </CenteredBox>
              </Grid>
            </React.Fragment>
          }
          {props.from === "create_user" &&
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                style={{ textTransform: "none", borderRadius: 10 }}
                disabled={!formIsValid}
              >
                Submit
              </Button>
            </Grid>
          }
        </Grid>
      </form>
    </div>
  );
}

export default SignUpForm;
