import { Grid } from '@mui/material'
import React from 'react'
import CenteredBox from '../ui/CenteredBox'
import ArticalCard from '../articals/ArticalCard';

function ArticalsRequests() {
  return (
    <div>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 1 }}>
        <Grid item xs={12} sm={6} md={4}>
          <CenteredBox align="center">
            <ArticalCard></ArticalCard>
          </CenteredBox>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CenteredBox align="center">
            <ArticalCard></ArticalCard>
          </CenteredBox>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CenteredBox align="center">
            <ArticalCard></ArticalCard>
          </CenteredBox>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CenteredBox align="center">
            <ArticalCard></ArticalCard>
          </CenteredBox>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CenteredBox align="center">
            <ArticalCard></ArticalCard>
          </CenteredBox>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CenteredBox align="center">
            <ArticalCard></ArticalCard>
          </CenteredBox>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CenteredBox align="center">
            <ArticalCard></ArticalCard>
          </CenteredBox>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CenteredBox align="center">
            <ArticalCard></ArticalCard>
          </CenteredBox>
        </Grid>
      </Grid>
    </div>
  )
}

export default ArticalsRequests