import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import Slider from "react-slick";
import ProdcutCard from '../buy/ProdcutCard';
import CenteredBox from '../ui/CenteredBox';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#007A31", borderRadius: 20 }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#007A31", borderRadius: 20 }}
            onClick={onClick}
        />
    );
}

function LandingPageCarousel() {

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <Box sx={{ mb: 8 }}>
            <div>
                <Slider {...settings}>
                    {itemData.map((item) => (
                        <Box key={item.key} sx={{ px: 1 }}>

                        </Box>
                    ))}
                </Slider>
            </div>
        </Box>
    );
}

const itemData = [
    {
        key: "buy-product-1",
        id: "1",
        author: <Grid container>
            <Grid item xs={6}>
                <Typography variant="body2">
                    Rs. 300
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <CenteredBox align="right">
                    <Typography variant="body2">
                        2kg
                    </Typography>
                </CenteredBox>
            </Grid>
        </Grid>,
        title: 'Mango',
        img: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',

    },
    {
        img: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80',
        title: 'Banana',
        key: "buy-product-2",
        id: "2",
        author: <Grid container>
            <Grid item xs={6}>
                <Typography variant="body2">
                    Rs. 300
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <CenteredBox align="right">
                    <Typography variant="body2">
                        2kg
                    </Typography>
                </CenteredBox>
            </Grid>
        </Grid>,
    },
    {
        img: 'https://images.unsplash.com/photo-1550828520-4cb496926fc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80',
        title: 'Pine Apple',
        key: "buy-product-3",
        id: "3",
        author: <Grid container>
            <Grid item xs={6}>
                <Typography variant="body2">
                    Rs. 300
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <CenteredBox align="right">
                    <Typography variant="body2">
                        2kg
                    </Typography>
                </CenteredBox>
            </Grid>
        </Grid>,
    },
    {
        img: 'https://images.unsplash.com/photo-1449339854873-750e6913301b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        title: 'Avacado',
        key: "buy-product-4",
        id: "4",
        author: <Grid container>
            <Grid item xs={6}>
                <Typography variant="body2">
                    Rs. 300
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <CenteredBox align="right">
                    <Typography variant="body2">
                        2kg
                    </Typography>
                </CenteredBox>
            </Grid>
        </Grid>,
    },
    {
        img: 'https://images.unsplash.com/photo-1449339854873-750e6913301b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        title: 'Avacado',
        key: "buy-product-5",
        id: "5",
        author: <Grid container>
            <Grid item xs={6}>
                <Typography variant="body2">
                    Rs. 300
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <CenteredBox align="right">
                    <Typography variant="body2">
                        2kg
                    </Typography>
                </CenteredBox>
            </Grid>
        </Grid>,
    },
    {
        img: 'https://images.unsplash.com/photo-1449339854873-750e6913301b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        title: 'Avacado',
        key: "buy-product-6",
        id: "6",
        author: <Grid container>
            <Grid item xs={6}>
                <Typography variant="body2">
                    Rs. 300
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <CenteredBox align="right">
                    <Typography variant="body2">
                        2kg
                    </Typography>
                </CenteredBox>
            </Grid>
        </Grid>,
    },
];
export default LandingPageCarousel