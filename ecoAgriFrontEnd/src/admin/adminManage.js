function UpdateUserForm(props) {
  console.log(props.userType);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const setCharityFile = (value) => {
    setFile(value);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Helpers to validate Fname and Lname
  const hasNumber = (string) => {
    return /\d/.test(string);
  };

  const hasSpecialChars = (string) => {
    let pattern = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (string.match(pattern)) {
      return true;
    } else {
      return false;
    }
  };
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
    if (hasNumber(value.trim())) {
      return { inputIsValid: false, error: "Can't contained numbers !" };
    } else if (hasSpecialChars(value.trim())) {
      return { inputIsValid: false, error: "Can't contained special chars !" };
    } else {
      return { inputIsValid: true, error: "" };
    }
  });

  //Last Name Validate
  const {
    value: lname,
    isValid: lnameIsValid,
    hasError: lnameHasError,
    error: lnameError,
    valueChangeHandler: lnameChangeHandler,
    inputBlurHandler: lnameBlurHandler,
  } = useInput((value) => {
    if (hasNumber(value.trim())) {
      return { inputIsValid: false, error: "Can't contained numbers !" };
    } else if (hasSpecialChars(value.trim())) {
      return { inputIsValid: false, error: "Can't contained special chars !" };
    } else {
      return { inputIsValid: true, error: "" };
    }
  });

  const {
    value: phone_number,
    isValid: phone_numberIsValid,
    hasError: phone_numberHasError,
    error: phone_numberError,
    valueChangeHandler: phone_numberChangeHandler,
    inputBlurHandler: phone_numberBlurHandler,
  } = useInput((value) => {
    return { inputIsValid: true, error: "" };
  });

  const {
    value: address,
    isValid: addressIsValid,
    hasError: addressHasError,
    error: addressError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
  } = useInput((value) => {
    return { inputIsValid: true, error: "" };
  });

  //Helper For Email validataion
  const emailValidation = (email) => {
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(pattern)) {
      return true;
    } else {
      return false;
    }
  };
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
    if (emailValidation(value.trim())) {
      return { inputIsValid: false, error: "Email is not completed !" };
    } else {
      return { inputIsValid: true, error: "" };
    }
  });

  const {
    value: registerNo,
    isValid: registerNoIsValid,
    hasError: registerNoHasError,
    error: registerNoError,
    valueChangeHandler: registerNoChangeHandler,
    inputBlurHandler: registerNoBlurHandler,
  } = useInput((value) => {
    return { inputIsValid: true, error: "" };
  });

  const {
    value: town,
    isValid: townIsValid,
    hasError: townHasError,
    error: townError,
    valueChangeHandler: townChangeHandler,
    inputBlurHandler: townBlurHandler,
  } = useInput((value) => {
    return { inputIsValid: true, error: "" };
  });

  const {
    value: city,
    isValid: cityIsValid,
    hasError: cityHasError,
    error: cityError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
  } = useInput((value) => {
    return { inputIsValid: true, error: "" };
  });

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
  });

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
  });

  let formIsValid = false;
  if (props.userType === "Farmer") {
    if (
      fnameIsValid &&
      lnameIsValid &&
      phone_numberIsValid &&
      addressIsValid &&
      cityIsValid &&
      townIsValid &&
      passwordIsValid &&
      confirmPasswordIsValid
    ) {
      formIsValid = true;
    }
  } else if (props.userType === "Buyer") {
    if (
      fnameIsValid &&
      lnameIsValid &&
      phone_numberIsValid &&
      passwordIsValid &&
      confirmPasswordIsValid
    ) {
      formIsValid = true;
    }
  } else if (props.userType === "Charity") {
    if (
      fnameIsValid &&
      lnameIsValid &&
      registerNoIsValid &&
      phone_numberIsValid &&
      addressIsValid &&
      cityIsValid &&
      townIsValid &&
      passwordIsValid &&
      confirmPasswordIsValid
    ) {
      formIsValid = true;
    }
  } else if (props.userType === "Advertiser") {
    if (
      fnameIsValid &&
      lnameIsValid &&
      emailIsValid &&
      phone_numberIsValid &&
      addressIsValid &&
      cityIsValid &&
      townIsValid &&
      passwordIsValid &&
      confirmPasswordIsValid
    ) {
      formIsValid = true;
    }
  }

  const clickRegister = async (e) => {
    e.preventDefault();
    if (!formIsValid) {
      return;
    }
    let data = {
      username: `${lname} ${fname}`,
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

    if (props.userType !== "Charity") {
      data = {
        ...data,
        registerNo: "",
        img: "",
      };
    } else {
      //image upload part
    }
    const result = await register(data);
    if (result) {
      navigate("/login");
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
              label="First Name"
              name="fname"
              id="fname"
              type="text"
              value={fname}
              onChange={fnameChangeHandler}
              onBlur={fnameBlurHandler}
              error={fnameHasError}
              helperText={fnameHasError ? fnameError : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="standard"
              label="Last Name"
              name="lname"
              id="lname"
              type="text"
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 600,
  overflowY: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
  pt: 0,
  pr: 0,
};

const ColorButton2 = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[600]),
  textTransform: "none",
  backgroundColor: green[600],
  "&:hover": {
    backgroundColor: green[700],
  },
}));
export default function UpdateUserModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    props.onUpdate();
  };
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <ColorButton2 onClick={handleOpen}>Update</ColorButton2>

      <Modal
        open={open}
        // onClose={handleClose}
      >
        <Box sx={style} className={classes.box}>
          <CenteredBox align="right">
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </CenteredBox>
          <Grid container sx={{ pr: 3 }}>
            <Grid item xs={12}>
              <UpdateUserForm userType={props.userType} />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
