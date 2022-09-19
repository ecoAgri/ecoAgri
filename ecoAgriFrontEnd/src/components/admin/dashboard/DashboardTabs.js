import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SlideBarBox from '../../ui/farmer/SlideBarBox';
import PurchaseHistoryTable from './PurchaseHistoryTable';
import SalesHistoryTable from './SalesHistoryTable';
import DonationHistoryTable from './DonationHistoryTable';
import DashBoardItem from './DashBoardItem';

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
                <Box sx={{ p: 3 }}>
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

export default function DashboardTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Sales History" {...a11yProps(0)} />
                    <Tab label="Purchase History" {...a11yProps(1)} />
                    <Tab label="Donation History" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <DashBoardItem table={<SalesHistoryTable />} tableName="Sales History" />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DashBoardItem table={<PurchaseHistoryTable />} tableName="Purchase History" />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <DashBoardItem table={<DonationHistoryTable />} tableName="Donation History" />
            </TabPanel>
        </Box>
    );
}
