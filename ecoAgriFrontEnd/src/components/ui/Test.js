import { Box } from "@mui/system";
import React, { Component } from "react";
import Slider from "react-slick";

export default class AsNavFor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null
        };
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    images = [
        "https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80",
        "https://images.unsplash.com/photo-1550828520-4cb496926fc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80",
        "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
    ]
    render() {
        return (
            <div>
                <Box sx={{ width: "300px" }}>
                    <Slider
                        asNavFor={this.state.nav1}
                        ref={slider => (this.slider2 = slider)}
                        slidesToShow={3}
                        swipeToSlide={true}
                        focusOnSelect={true}
                    >
                        {this.images.map((image) => (
                            <Box sx={{ width: "100px", height: "100px" }}>
                                <div>
                                    <img src={image} />
                                </div>
                            </Box>
                        ))}
                    </Slider>
                </Box>
                <Box sx={{ mt: 3, width: "600px", height: "400px",}}>
                    <Slider
                        asNavFor={this.state.nav2}
                        ref={slider => (this.slider1 = slider)}
                    >
                        {this.images.map((image) => (
                            <div>
                                <img style={{ width: "100%" }} src={image} />
                            </div>
                        ))}
                    </Slider>
                </Box>

            </div>
        );
    }
}