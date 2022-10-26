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

export default function SalesHistoryTable() {
  const user = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.token);
  const orders = useSelector((state) => state.order.orders);
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
            col1: item.productName,
            col2: item.productCategory,
            col3: item.quantity,
            col4: item.totalPrice,
            col5: item.expireDate,
            col6: item.sellerName,
            col7: item.username,
          });
        });
        setRows(data);
      } else {
        console.log("Unsuccess");
      }
    };
    getOrderData();
  }, []);

  //   const rows = [
  //     {
  //       id: 1,
  //       col1: "Potato",
  //       col2: "Vegitable",
  //       col3: "20",
  //       col4: "1200",
  //       col5: "12-08-2022",
  //       col6: "Lahiru",
  //       col7: "Pasindu",
  //     },
  //     {
  //       id: 2,
  //       col1: "Potato",
  //       col2: "Vegitable",
  //       col3: "20",
  //       col4: "1200",
  //       col5: "12-08-2022",
  //       col6: "Lahiru",
  //       col7: "Pasindu",
  //     },
  //     {
  //       id: 3,
  //       col1: "Potato",
  //       col2: "Vegitable",
  //       col3: "20",
  //       col4: "1200",
  //       col5: "12-08-2022",
  //       col6: "Lahiru",
  //       col7: "Pasindu",
  //     },
  //   ];

  const columns = [
    {
      field: "col1",
      headerName: "Product",
      headerClassName: "header-class-name",
      width: 200,
    },
    {
      field: "col2",
      headerName: "Category",
      headerClassName: "header-class-name",
      width: 200,
    },
    {
      field: "col3",
      headerName: "Total Amount(kg)",
      headerClassName: "header-class-name",
      width: 200,
    },
    {
      field: "col4",
      headerName: "Total Cost(Rs)",
      headerClassName: "header-class-name",
      width: 200,
    },
    {
      field: "col5",
      headerName: "Date",
      headerClassName: "header-class-name",
      width: 200,
    },
    {
      field: "col6",
      headerName: "Seller",
      headerClassName: "header-class-name",
      width: 200,
    },
    {
      field: "col7",
      headerName: "Buyer",
      headerClassName: "header-class-name",
      width: 200,
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
