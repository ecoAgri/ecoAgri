import { Button, Link } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import CenteredBox from '../ui/CenteredBox';
import UpdatedButton from '../ui/UpdatedButton';
import "./OtpVerify.css";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  // bgcolor: 'background.paper',
  // boxShadow: 24,
  // borderRadius: 5,
  // p: 4,
};
function OtpVerify() {
  const navigate = useNavigate();
  useEffect(() => {
    const inputFields = document.querySelectorAll("input.field");

    inputFields.forEach((field) => {
      field.addEventListener("input", handleInput);
    });

    function handleInput(e) {
      let inputField = e.target;
      if (inputField.value.length >= 1) {
        let nextField = inputField.nextElementSibling;
        return nextField && nextField.focus();
      }
    }
  }, [])

  return (
    <Box sx={style}>
      <div class="container">
        <h3 class="title">OTP Verification</h3>
        <p class="sub-title">
          Enter the OTP you received to
          <span class="phone-number"></span>
        </p>
        <form method="GET">
          <div class="wrapper">
            <input type="text" class="field 1" name="n-1" />
            <input type="text" class="field 2" name="n-2" />
            <input type="text" class="field 3" name="n-3" />
            <input type="text" class="field 4" name="n-4" />

          </div>
          <Box sx={{ mt: 2 }}>
            <CenteredBox align="center">
              <UpdatedButton variant="contained" title={"Verify"} />
            </CenteredBox>
          </Box>
        </form>

        <p class="sub-title bottom-sub">Didn't receive the code?</p>
        <a class="resend" onClick={() => {navigate("/")}}>Resend OTP </a>
      </div>
    </Box>
  )
}

export default OtpVerify;