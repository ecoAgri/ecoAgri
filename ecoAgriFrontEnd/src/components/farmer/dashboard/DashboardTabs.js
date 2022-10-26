import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SlideBarBox from "../../ui/farmer/SlideBarBox";
import DonationPendingTable from "./DonationPendingTable";
import SoldProductsTable from "./SoldProductsTable";
import PurchasePendingTable from "./PurchasePendingTable";
import PendingRequestTable from "./PendingRequestTable";
import PurchaseTable from "./PurchaseTable";
import TableContainer from "../../ui/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../store/orderApiCalls";
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
        <Box sx={{ p: 0 }}>
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DashboardTabs() {
  const [value, setValue] = React.useState(0);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.token);

  React.useEffect(() => {
    const getOrderData = async () => {
      const orderStatus = await getOrders(dispatch, token);
      if (orderStatus) {
        console.log("Success");
      } else {
        console.log("Unsuccess");
      }
    };
    getOrderData();
  }, []);
  const orderPending = useSelector((state) =>
    state.order.orders.filter(
      (x) =>
        (x.status == "Pending" ||
          (x.status == "Accept" && x.isAccept == false)) &&
        x.userId == user.id
    )
  );
  const orderSeller = useSelector((state) =>
    state.order.orders.filter((x) => x.sellerId == user.id)
  );
  const orderIsDonate = useSelector((state) =>
    state.order.orders.filter(
      (x) => x.isDonate == true && x.sellerId == user.id
    )
  );
  const orderSales = useSelector((state) =>
    state.order.orders.filter(
      (x) => x.status == "Completed" && x.sellerId == user.id
    )
  );
  const orderIsAccept = useSelector((state) =>
    state.order.orders.filter(
      (x) => x.status == "Accept" && x.isAccept && x.userId == user.id
    )
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={
              <SlideBarBox
                number={orderPending.length}
                name="Pending Request"
              />
            }
            {...a11yProps(0)}
          />
          <Tab
            label={
              <SlideBarBox
                number={orderSeller.length}
                name="Pending Purchase"
              />
            }
            {...a11yProps(1)}
          />
          <Tab
            label={
              <SlideBarBox
                number={orderIsDonate.length}
                name="Pending Donations"
              />
            }
            {...a11yProps(2)}
          />
          <Tab
            label={<SlideBarBox number={orderSales.length} name="Sales" />}
            {...a11yProps(3)}
          />
          <Tab
            label={
              <SlideBarBox
                number={orderIsAccept.length}
                name="Purchased Products"
              />
            }
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TableContainer
          table={<PendingRequestTable />}
          tableName="Pending Request"
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableContainer
          table={<PurchasePendingTable />}
          tableName="Pending Purchase"
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TableContainer
          table={<DonationPendingTable />}
          tableName="Pending Donations"
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TableContainer
          table={<SoldProductsTable />}
          tableName="Sold Products"
        />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <TableContainer
          table={<PurchaseTable />}
          tableName="Purchased Products"
        />
      </TabPanel>
    </Box>
  );
}
