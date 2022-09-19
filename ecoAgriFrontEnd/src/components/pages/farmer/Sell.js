import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react'
import SalePageCard from '../../farmer/sell/SalePageCard';
import SalesCharts from '../../farmer/sell/SalesChart'
import MainHeader from '../../layouts/MainHeader'
import VisibilityIcon from '@mui/icons-material/Visibility';
import CenteredBox from '../../ui/CenteredBox';
import PageHeading from '../../ui/PageHeading';
import classes from '../../ui/HideScrollBar.module.css';
import ProductsSale from '../../farmer/sell/ProductsSale';

function Sell() {
  return (
    <React.Fragment>
      <MainHeader value={1} />
      <Grid container sx={{ pt: "100px", px: 5 }}>
        <Grid item xs={12} className={classes.hideScrollBox}>
          <ProductsSale />
        </Grid>
      </Grid>
      {/* <Grid container sx={{ pt: "100px" }} spacing={3}>
        <PageHeading heading="Sales Details" />
        <Grid item xs={12} sx={{ py: 5, mx: 5, bgcolor: "#fff" }}>
          <div>
            <Grid container>
              <Grid item sm={12} md={8}>
                <SalesCharts />
              </Grid>
              <Grid item sm={12} md={4}>
                <Box sx={{mr: 10}}>
                  <Grid container spacing={3}>
                    <Grid item sm={6} md={12}>
                      <SalePageCard bgColor="rgb(209, 233, 252)"
                        title="Orders"
                        total={38}
                        icon={<VisibilityIcon></VisibilityIcon>} />
                    </Grid>
                    <Grid item sm={6} md={12}>
                      <SalePageCard bgColor="rgb(209, 233, 252)"
                        title="Cancelled Requests"
                        total={10}
                        icon={<VisibilityIcon></VisibilityIcon>} />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </div>
        </Grid>

      </Grid> */}
    </React.Fragment>
  )
}

export default Sell