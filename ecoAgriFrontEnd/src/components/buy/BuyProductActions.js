import { Box, Button, Grid } from '@mui/material'
import React from 'react'
import SearchBar from '../ui/Searchbar'
import SelectLoactionModal from './SelectLoactionModal'
function BuyProductActions() {
    return (
        <Box sx={{ p: 3 }}>
            <Grid container>
                <Grid item xs={6}>
                    <SelectLoactionModal />
                </Grid>
                <Grid item xs={6}>
                    <SearchBar placeholder="What are you looking for..." />
                </Grid>
            </Grid>
        </Box>
    )
}

export default BuyProductActions