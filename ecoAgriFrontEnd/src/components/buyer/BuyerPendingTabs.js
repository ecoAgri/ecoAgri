import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SlideBarBox from "../ui/farmer/SlideBarBox";
import PendingRequestTable from "../farmer/dashboard/PendingRequestTable";
import PurchaseTable from "../farmer/dashboard/PurchaseTable";
import TableContainer from "../ui/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../store/orderApiCalls";

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

export default function BuyerPendingTabs() {
  const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  // const [sellerId, setSellerId] = React.useState(0);
  //   const orderPending = useSelector((state) =>
  //     state.order.orders.filter((x) => {if(x.status == "Pending"){
  //         setPendingNumber(pendingNumber+1);
  //     }})
  //   );
  const orderPending = useSelector((state) =>
    state.order.orders.filter((x) =>(x.status == "Pending" || (x.status == "Accept" && x.isAccept == false)) && x.userId == user.id)
  );
  const orderIsAccept = useSelector((state) =>
    state.order.orders.filter((x) => (x.status == "Accept" || x.status == "Completed") && x.isAccept && x.userId == user.id)
  );
  const [pendingNumber, setPendingNumber] = React.useState(orderPending.length);
  const [purchaseNumber, setPurchaseNumber] = React.useState(orderIsAccept.length);

  const token = useSelector((state) => state.user.token);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const getOrderData = async()=>{
        const orderStatus = await getOrders(dispatch, token);
        if(orderStatus){
            console.log("Success");
        }else {
            console.log("Unsuccess");
        }
    }
    getOrderData();
    
  }, []);

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
              <SlideBarBox number={orderPending.length} name="Pending Request" />
            }
            {...a11yProps(0)}
          />
          <Tab
            label={
              <SlideBarBox number={orderIsAccept.length} name="Purchased Products" />
            }
            {...a11yProps(1)}
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
          table={<PurchaseTable />}
          tableName="Purchased Products"
        />
      </TabPanel>
    </Box>
  );
}
