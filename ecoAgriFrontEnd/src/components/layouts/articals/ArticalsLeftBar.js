import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import RecentPosts from '../../ui/RecentPosts'
import SearchBar from '../../ui/Searchbar'

const style = {
    boxShadow: 5,
    borderRadius: 2,
    p: 4
}

function ArticalsLeftBar() {
    return (
        <React.Fragment>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Box sx={style}>
                        <SearchBar />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={style}>
                        <RecentPosts />
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default ArticalsLeftBar