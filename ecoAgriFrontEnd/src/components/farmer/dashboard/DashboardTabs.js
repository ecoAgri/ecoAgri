import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SlideBarBox from '../../ui/farmer/SlideBarBox';
import DashBoardItem from './DashBoardItem';
import DonationPendingTable from './DonationPendingTable';
import SoldProductsTable from './SoldProductsTable';
import PurchasePendingTable from './PurchasePendingTable';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function DashboardTabs() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, display: 'flex' }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                // aria-label="Vertical tabs example"
                id="dashboard-table"
                sx={{ borderRight: 1, borderColor: 'divider' }}
            >
                <Tab label={<SlideBarBox number="05" name="Sales" />} {...a11yProps(0)} />
                <Tab label={<SlideBarBox number="05" name="Pending Purchase" />} {...a11yProps(1)} />
                <Tab label={<SlideBarBox number="05" name="Pending Donations" />} {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <DashBoardItem table={<SoldProductsTable />} tableName="Sold Products" />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DashBoardItem table={<PurchasePendingTable />} tableName="Pending Purchase" />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <DashBoardItem table={<DonationPendingTable />} tableName="Pending Donations" />
            </TabPanel>
        </Box>
    );
}
