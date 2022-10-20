import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useParams } from 'react-router';
import SignUpForm from '../../registraion/SignUpForm';
import MainHeader from '../../layouts/MainHeader';
import UpdateUserForm from '../../admin/UpdateUserForm';
import CenteredBox from '../../ui/CenteredBox';
import PageHeading from '../../ui/PageHeading';
import { Grid } from '@mui/material';

export default function Registration() {
  const [open, setOpen] = React.useState(true);
  const { userType } = useParams();

  const style = {
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    width: 450,
    // height: 500,
    bgcolor: 'background.paper',
    // boxShadow: 24,
    // borderRadius: 5,
    p: 4,
    pr: 0,
  };

  return (
    <React.Fragment>
      <MainHeader />
      <Grid container sx={{ pt: "100px" }}>
        <PageHeading
          heading="Create User"
        />
        <Grid item xs={12} sx={{ py: 5, mx: 5, bgcolor: "#fff" }}>
          <CenteredBox align="center">
            <Box sx={style}>
              <Box>
                <SignUpForm userType={userType} from="create_user" />
              </Box>
            </Box>
          </CenteredBox>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
