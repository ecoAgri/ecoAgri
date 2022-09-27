import React from 'react'
import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system'
import CenteredBox from '../../ui/CenteredBox';
import classes from "../../ui/Form.module.css";
import BankDetail from './BankDetail';
import NoBankFound from './NoBankFound';

const style = {
  position: 'relative',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  width: 600,
  height: 505,
  bgcolor: 'background.paper',
  overflow: "auto",
  border: "none",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

const DUMMY_BANKS = [
  {
    id: "bank-1",
    accountNumber: "0000000000000",
    holderName: "Kumud Perera",
    bankName: "Sampath",
    branchName: "Matugama",
  },
  {
    id: "bank-2",
    accountNumber: "0000000000000",
    holderName: "Kumud Perera",
    bankName: "Sampath",
    branchName: "Matugama",
  },
  {
    id: "bank-3",
    accountNumber: "0000000000000",
    holderName: "Kumud Perera",
    bankName: "Sampath",
    branchName: "Matugama",
  }
]
function ShowBankDetails() {
  return (
    <div>
      <CenteredBox align="center">
        <Box sx={style}>
          <Grid container sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <CenteredBox align="center">
                <Typography variant="h5">Your Bank Acoounts</Typography>
              </CenteredBox>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            {DUMMY_BANKS.map((bank) => (
              <Grid item xs={12}>
                <BankDetail
                  accountNumber={bank.accountNumber}
                  holderName={bank.holderName}
                  bankName={bank.bankName}
                  branchName={bank.branchName}
                />
              </Grid>
            ))}
          </Grid>
          {/* <NoBankFound /> */}
        </Box>
      </CenteredBox>
    </div>
  )
}

export default ShowBankDetails