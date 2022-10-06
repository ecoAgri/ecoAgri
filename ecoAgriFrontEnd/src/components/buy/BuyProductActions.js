import { Box, Button, Grid } from '@mui/material'
import React from 'react'
import SearchBar from '../ui/Searchbar'
import SelectLoactionModal from './SelectLoactionModal'
function BuyProductActions() {
    return (
        <div>
            <Grid container sx={{ p: 3 }}>
                <Grid item xs={12} sm={12} md={6}>
                    <SelectLoactionModal />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <SearchBar placeholder="What are you looking for..." />
                </Grid>
            </Grid>
        </div>
    )
}

export default BuyProductActions