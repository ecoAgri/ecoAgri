import { Grid } from '@mui/material'
import React from 'react'
import CenteredBox from '../ui/CenteredBox'
import ArticalCard from './ArticalCard'

function ArticalsRightBar() {
  const data = [
    {
      id:1,

    }
  ]
  return (
    <div>
      <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 1 }}>
        <Grid item xs={12} sm={6} md={4}>
          <CenteredBox align="center">
            <ArticalCard title="This impressive paella is a perfect party"></ArticalCard>
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

export default ArticalsRightBar