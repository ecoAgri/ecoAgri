import { Grid } from '@mui/material';
import React from 'react'
import LandingPageArticalCard from './LandingPageArticalCard';

const DUMMY_ARTICALS = [
    {
        id: "landing-artical-1",
        image: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
        title: "This impressive paella is a perfect party",
        content: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",

    },
    {
        id: "landing-artical-2",
        image: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
        title: "This impressive paella is a perfect party",
        content: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    },
    {
        id: "landing-artical-3",
        image: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
        title: "This impressive paella is a perfect party",
        content: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    },
    {
        id: "landing-artical-4",
        image: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
        title: "This impressive paella is a perfect party",
        content: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    },
]
function LandingPageArticals() {
    return (
        <Grid container sx={{ mt: 10 }} rowSpacing={4} columnSpacing={{ xs: 1, sm: 1 }}>
            {DUMMY_ARTICALS.map((artical) => (
                <Grid key={artical.id} item xs={12} sm={6} md={4} lg={3}>
                    <LandingPageArticalCard
                        image={artical.image}
                        title={artical.title}
                        content={artical.content}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default LandingPageArticals