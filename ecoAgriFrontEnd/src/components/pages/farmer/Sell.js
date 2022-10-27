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
import { useDispatch, useSelector } from "react-redux";

function Sell() {

  
  return (
    <React.Fragment>
      <MainHeader value={1} />
      <Grid container sx={{ pt: "100px", px: 5 }}>
        <Grid item xs={12} className={classes.hideScrollBox}>
          <ProductsSale productType="sell" />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Sell