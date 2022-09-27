import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import RecentPosts from './RecentPosts'
import SearchBar from '../ui/Searchbar'
import PostCategories from './PostCategories'
import AddPostButton from './AddPostButton'

const style = {
    boxShadow: 5,
    borderRadius: 2,
    p: 2,
    bgcolor: "#fff"
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
                <Grid item xs={12}>
                    <Box sx={style}>
                        <AddPostButton />
                    </Box>
                </Grid>
                {/* <Grid item xs={12}>
                    <Box sx={style}>
                        <PostCategories />
                    </Box>
                </Grid> */}
            </Grid>
        </React.Fragment>
    )
}

export default ArticalsLeftBar