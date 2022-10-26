import * as React from "react";
import PropTypes from "prop-types";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getOrders } from "../../../store/orderApiCalls";

//Filter panel
const CustomToolbar = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarFilterButton ref={setFilterButtonEl} />
  </GridToolbarContainer>
);

CustomToolbar.propTypes = {
  setFilterButtonEl: PropTypes.func.isRequired,
};

export default function DonationHistoryTable() {
  const user = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.token);
  const orders = useSelector((state) =>
    state.order.orders.filter((x) => x.isDonate)
  );
  const [rows, setRows] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getOrderData = async () => {
      const orderStatus = await getOrders(dispatch, token);
      if (orderStatus) {
        console.log("Success");
        console.log(orders);
        let data = [];
        orders.map((item) => {
          data.push({
            id: item.id,
            col1: item.username,
            col2: item.productName,
            col3: item.productCategory,
            col4: item.totalPrice,
            col5: item.expireDate,
          });
        });
        setRows(data);
      } else {
        console.log("Unsuccess");
      }
    };
    getOrderData();
  }, []);
  // const rows = [
  //     {
  //         id: 1,
  //         col1: "Pasindu Lakmal",
  //         col2: "Potato",
  //         col3: "Vegitable",
  //         col4: "1300",
  //         col5: "12-08-2022",
  //     },
  //     {
  //         id: 2,
  //         col1: "Pasindu Lakmal",
  //         col2: "Potato",
  //         col3: "Vegitable",
  //         col4: "1300",
  //         col5: "12-08-2022",
  //     },
  //     {
  //         id: 3,
  //         col1: "Pasindu Lakmal",
  //         col2: "Potato",
  //         col3: "Vegitable",
  //         col4: "1300",
  //         col5: "12-08-2022",
  //     },
  //     {
  //         id: 4,
  //         col1: "Pasindu Lakmal",
  //         col2: "Potato",
  //         col3: "Vegitable",
  //         col4: "1300",
  //         col5: "12-08-2022",
  //     },
  //     {
  //         id: 5,
  //         col1: "Pasindu Lakmal",
  //         col2: "Potato",
  //         col3: "Vegitable",
  //         col4: "1300",
  //         col5: "12-08-2022",
  //     },
  // ];

  const columns = [
    {
      field: "col1",
      headerName: "Organization Name",
      headerClassName: "header-class-name",
      width: 300,
    },
    {
      field: "col2",
      headerName: "Donator",
      headerClassName: "header-class-name",
      width: 300,
    },
    {
      field: "col3",
      headerName: "Product",
      headerClassName: "header-class-name",
      width: 300,
    },
    {
      field: "col4",
      headerName: "Total Amount",
      headerClassName: "header-class-name",
      width: 300,
    },
    {
      field: "col5",
      headerName: "Date",
      headerClassName: "header-class-name",
      width: 300,
    },
  ];

  const [filterButtonEl, setFilterButtonEl] = React.useState(null);
  return (
    <Box
      sx={{
        height: 600,
        width: "100%",
        // align: "center",
        bgcolor: "#FFF",
      }}
    >
      <DataGrid
        disableSelectionOnClick
        components={{
          Toolbar: CustomToolbar,
        }}
        componentsProps={{
          panel: {
            anchorEl: filterButtonEl,
          },
          toolbar: {
            setFilterButtonEl,
          },
        }}
        rows={rows}
        columns={columns}
      />
    </Box>
  );
}
