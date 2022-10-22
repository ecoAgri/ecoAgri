import { Grid } from '@mui/material'
import React from 'react'
import MainHeader from '../../layouts/MainHeader'
import classes from '../../ui/HideScrollBar.module.css';
import ProductsSale from '../../farmer/sell/ProductsSale';

function Donate() {
  return (
    <React.Fragment>
      <MainHeader value={3} />
      <Grid container sx={{ pt: "100px", px: 5 }}>
        <Grid item xs={12} className={classes.hideScrollBox}>
          <ProductsSale productType="donate" />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default Donate