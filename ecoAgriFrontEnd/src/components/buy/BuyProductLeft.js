import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { CardMedia } from '@mui/material';
import ProdcutIMage from './ProdcutIMage';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ pl: 2, pt: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const imageBoxStyle = {
    width: 750,
    height: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#effcf0",
    overflow: "hidden",
    boxShadow: 24
}

export default function BuyProductLeft(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ bgcolor: '#FFF', p: 3 }}>
            <Box>
                <Tabs value={value} onChange={handleChange}>
                    <Tab sx={{ p: 1, pl: 2 }}
                        label={
                            <ProdcutIMage
                                url={props.productDetail.image1}
                            />
                        }
                        {...a11yProps(0)}
                    />
                    <Tab sx={{ p: 1 }}
                        label={
                            <ProdcutIMage
                                url={props.productDetail.image2}
                            />
                        }
                        {...a11yProps(1)}
                    />
                    <Tab sx={{ p: 1 }}
                        label={
                            <ProdcutIMage
                                url={props.productDetail.image3}
                            />
                        }
                        {...a11yProps(2)}
                    />
                    <Tab sx={{ p: 1 }}
                        label={
                            <ProdcutIMage
                                url={props.productDetail.image3}
                            />
                        }
                        {...a11yProps(3)}
                    />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Box sx={imageBoxStyle}>
                    <img
                        src={props.productDetail.image1}
                        style={{ height: "100%" }}
                    />
                </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Box sx={imageBoxStyle}>
                    <img
                        src={props.productDetail.image2}
                        style={{ height: "100%" }}
                    />
                </Box>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Box sx={imageBoxStyle}>
                    <img
                        src={props.productDetail.image3}
                        style={{ height: "100%" }}
                    />
                </Box>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Box sx={imageBoxStyle}>
                    <img
                        src={props.productDetail.image3}
                        style={{ height: "100%" }}
                    />
                </Box>
            </TabPanel>
        </Box>
    );
}