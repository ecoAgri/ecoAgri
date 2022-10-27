import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userTypeSelectorButtonActions } from "../../store/userType-selector-slice";
import CenteredBox from "../ui/CenteredBox";
import PasswordInputField from "../ui/PasswordInputField";
import { register } from "../../store/userApiCalls";
import { useNavigate } from "react-router";
import useInput from "../../hooks/use-input";
import FileUploader from "../ui/fileUploader/FileUploader";
import { updateUser } from "../../store/userApiCalls";
import Swal from 'sweetalert2'
function UpdateUserForm(props) {
    console.log(props.userType);
    console.log(props.data);
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const setCharityFile = (value) => {
        setFile(value)
    }
    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setFname(props.data.col1)
        setPhoneNumber(props.data.phoneNumber);
        setAddress(props.data.address);
        setEmail(props.data.col3);
        setTown(props.data.town);
        setCity(props.data.city);
    },[])

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
        setValue: setFname,
        isValid: fnameIsValid,
        hasError: fnameHasError,
        error: fnameError,
        valueChangeHandler: fnameChangeHandler,
        inputBlurHandler: fnameBlurHandler,
    } = useInput((value) => {
        if (hasNumber(value.trim())) {
            return { inputIsValid: false, error: "Can't contained numbers !" };
        } else if (hasSpecialChars(value.trim())) {
            return { inputIsValid: false, error: "Can't contained special chars !" };
        } else {
            return { inputIsValid: true, error: "" };
        }
    })

    //Last Name Validate
    // const {
    //     value: lname,
    //     setValue: setLname,
    //     isValid: lnameIsValid,
    //     hasError: lnameHasError,
    //     error: lnameError,
    //     valueChangeHandler: lnameChangeHandler,
    //     inputBlurHandler: lnameBlurHandler,
    // } = useInput((value) => {
    //     if (hasNumber(value.trim())) {
    //         return { inputIsValid: false, error: "Can't contained numbers !" };
    //     } else if (hasSpecialChars(value.trim())) {
    //         return { inputIsValid: false, error: "Can't contained special chars !" };
    //     } else {
    //         return { inputIsValid: true, error: "" };
    //     }
    // })

    const {
        value: phone_number,
        setValue: setPhoneNumber,
        isValid: phone_numberIsValid,
        hasError: phone_numberHasError,
        error: phone_numberError,
        valueChangeHandler: phone_numberChangeHandler,
        inputBlurHandler: phone_numberBlurHandler,
    } = useInput((value) => {
        return { inputIsValid: true, error: "" };
    })

    const {
        value: address,
        setValue: setAddress,
        isValid: addressIsValid,
        hasError: addressHasError,
        error: addressError,
        valueChangeHandler: addressChangeHandler,
        inputBlurHandler: addressBlurHandler,
    } = useInput((value) => {
        return { inputIsValid: true, error: "" };
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
        setValue:setEmail,
        isValid: emailIsValid,
        hasError: emailHasError,
        error: emailError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput((value) => {
        if (emailValidation(value.trim())) {
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
        return { inputIsValid: true, error: "" };
    })

    const {
        value: town,
        setValue:setTown,
        isValid: townIsValid,
        hasError: townHasError,
        error: townError,
        valueChangeHandler: townChangeHandler,
        inputBlurHandler: townBlurHandler,
    } = useInput((value) => {
        return { inputIsValid: true, error: "" };
    })

    const {
        value: city,
        setValue:setCity,
        isValid: cityIsValid,
        hasError: cityHasError,
        error: cityError,
        valueChangeHandler: cityChangeHandler,
        inputBlurHandler: cityBlurHandler,
    } = useInput((value) => {
        return { inputIsValid: true, error: "" };
    })

    //Helper for the password
    function CheckPassword(string) {
        let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
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
        if (value.trim().length <= 8) {
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
        if (password !== value.trim()) {
            return { inputIsValid: false, error: "Password not match !" };
        } else {
            return { inputIsValid: true, error: "" };
        }
    })

    let formIsValid = false;
    if (props.userType === "Farmer") {
        if (fnameIsValid  && phone_numberIsValid && addressIsValid && cityIsValid && townIsValid) {
            formIsValid = true;
        }
    } else if (props.userType === "Buyer") {
        if (fnameIsValid && phone_numberIsValid ) {
            formIsValid = true;
        }
    } else if (props.userType === "Charity") {
        if (fnameIsValid  && registerNoIsValid && phone_numberIsValid && addressIsValid && cityIsValid && townIsValid ) {
            formIsValid = true;
        }
    } else if (props.userType === "Advertiser") {
        if (fnameIsValid  && emailIsValid && phone_numberIsValid && addressIsValid && cityIsValid && townIsValid) {
            formIsValid = true;
        }
    }


    const clickRegister = async (e) => {
        e.preventDefault();
        if (!formIsValid) {
            return;
        }
        let data = {
            username: fname,
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
        console.log(data);

        if (props.userType !== "Charity") {
            data = {
                ...data,
                registerNo: "",
                img: "",
            };
        } else {
            //image upload part
        }
        const result = await updateUser(props.data.id ,data ,dispatch,token);
        if (result) {
            //navigate("/login");
            props.onClose();
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
              )
              props.updateTrigger(props.data.id);
              window.location.reload(false);
        }
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={clickRegister}>
                <Grid container sx={{ mb: 3 }}>
                    <Grid item xs={12}>
                        <CenteredBox align="center">
                            <Typography variant="h5">Update {props.userType}</Typography>
                        </CenteredBox>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6}>
                        
                        <TextField

                            fullWidth
                            variant="standard"
                            label="Name"
                            name="fname"
                            id="fname"
                            type="text"
                            // defaultValue={props.data.col1}
                            value={fname}
                            onChange={fnameChangeHandler}
                            onBlur={fnameBlurHandler}
                            error={fnameHasError}
                           helperText={fnameHasError ? fnameError : ""}
                        />
                    </Grid>
                    {/* <Grid item xs={6}>
                        <TextField

                            fullWidth
                            variant="standard"
                            label="Last Name"
                            name="lname"
                            id="lname"
                            type="text"
                            defaultValue="Yohan"
                            value={lname}
                            onChange={lnameChangeHandler}
                            onBlur={lnameBlurHandler}
                            error={lnameHasError}
                            helperText={lnameHasError ? lnameError : ""}
                        />
                    </Grid> */}
                </Grid>
                <Grid container sx={{ mb: 3 }} spacing={3}>
                    <Grid item xs={12}>
                        <TextField

                            variant="standard"
                            fullWidth
                            label="Phone number"
                            name="phone_number"
                            id="phone_number"
                            type="number"
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
                    {props.userType === "Advertiser" && (
                        <Grid item xs={12}>
                            <TextField

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
                        <TextField

                            variant="standard"
                            label="City"
                            value={city}
                            onChange={cityChangeHandler}
                            onBlur={cityBlurHandler}
                            error={cityHasError}
                            helperText={cityHasError ? cityError : ""}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField

                            variant="standard"
                            label="Town"
                            value={town}
                            onChange={townChangeHandler}
                            onBlur={townBlurHandler}
                            error={townHasError}
                            helperText={townHasError ? townError : ""}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Grid container sx={{ mb: 3 }} spacing={3}>
                    {props.userType === "Charity" && (
                        <Grid item xs={12}>
                            <TextField
                                label="Registration No."

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

                                label="Registration proof"
                                type="file"
                                id="file"
                                name="file"
                                onChange={setCharityFile}
                            />
                        </Grid>
                    )}
                    {/* <Grid item xs={12}>
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
                    </Grid> */}
                    {/* <Grid item xs={12}>
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
                    </Grid> */}

                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            style={{ textTransform: "none", borderRadius: 10 }}
                            disabled={!formIsValid}
                        >
                            Update
                        </Button>

                    </Grid>
                </Grid>
            </form>
        </div>
    );
}

export default UpdateUserForm;
