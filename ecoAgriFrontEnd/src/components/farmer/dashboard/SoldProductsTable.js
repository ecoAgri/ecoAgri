import * as React from "react";
import PropTypes from "prop-types";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Box, Button, Chip, Grid } from "@mui/material";
import CenteredBox from "../../ui/CenteredBox";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

//Filter panel
const CustomToolbar = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarFilterButton ref={setFilterButtonEl} />
  </GridToolbarContainer>
);

CustomToolbar.propTypes = {
  setFilterButtonEl: PropTypes.func.isRequired,
};

export default function SoldProductsTable() {
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState([]);
  const user = useSelector((state) => state.user.currentUser);
  const orderSales = useSelector((state) =>
    state.order.orders.filter(
      (x) => x.status == "Completed" && x.sellerId == user.id
    )
  );
  React.useEffect(() => {
    const getOrderData = async () => {
      let rowData = [];
      orderSales.map((item) => {
        rowData.push({
          id: item.id,
          status: item.status,
          col1: item.productName,
          col2: item.productCategory,
          col3: item.quantity,
          col4: item.totalPrice,
          col5: item.expireDate,
          col6: "Organization Name",
        });
      });
      setRows(rowData);
    };
    getOrderData();
  }, []);
  //   const rows = [
  //     {
  //       id: 1,
  //       col1: "Hello",
  //       col2: "World",
  //       col3: "Hello",
  //       col4: "World",
  //       col5: "World",
  //     },
  //     {
  //       id: 2,
  //       col1: "Hello",
  //       col2: "World",
  //       col3: "Hello",
  //       col4: "World",
  //       col5: "World",
  //     },
  //   ];

  const columns = [
    { field: "col1", headerName: "Product", width: 180 },
    { field: "col2", headerName: "Category", width: 180 },
    { field: "col3", headerName: "Total Amount(Kg)", width: 180 },
    { field: "col3", headerName: "Total Price(Rs.)", width: 180 },
    { field: "col4", headerName: "Date", width: 180 },
    { field: "col5", headerName: "Organization", width: 180 },
  ];

  const [filterButtonEl, setFilterButtonEl] = React.useState(null);
  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
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
