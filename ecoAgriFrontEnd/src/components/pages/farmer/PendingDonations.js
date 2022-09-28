import { Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useNavigate } from 'react-router'
import DonationPendingTable from '../../farmer/donate/DonationPendingTable'
import MainHeader from '../../layouts/MainHeader'
import CenteredBox from '../../ui/CenteredBox'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  // height: 505,
  bgcolor: 'background.paper',
  overflow: "auto",
  // border: "none",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};
function PendingDonations() {
  const navigate = useNavigate();
  const clickHanlder = () => {
    navigate("/donate");
  }
  return (
    <React.Fragment>
      <MainHeader value={2} />
      <Box sx={{ postion: "relative" }}>
        <Box sx={style}>
          <CenteredBox align="center">
            <Button onClick={clickHanlder} variant="contained" sx={{textTransform: "none", mb: 2}}>Donate</Button>
            <DonationPendingTable />
          </CenteredBox>
        </Box>
      </Box>

    </React.Fragment>
  )
}

export default PendingDonations