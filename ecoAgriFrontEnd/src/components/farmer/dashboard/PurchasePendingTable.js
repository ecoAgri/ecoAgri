import * as React from "react";
import PropTypes from "prop-types";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import styled from "@emotion/styled";
import { green, red } from "@mui/material/colors";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateOrder } from "../../../store/orderApiCalls";

const ColorButton1 = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[600]),
  textTransform: "none",
  backgroundColor: green[600],
  "&:hover": {
    backgroundColor: green[700],
  },
}));

const ColorButton2 = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[600]),
  backgroundColor: red[600],
  textTransform: "none",
  "&:hover": {
    backgroundColor: red[700],
  },
}));

//Filter panel
const CustomToolbar = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarFilterButton ref={setFilterButtonEl} />
  </GridToolbarContainer>
);

CustomToolbar.propTypes = {
  setFilterButtonEl: PropTypes.func.isRequired,
};

export default function PendingRequestTable() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.token);
  const [trigger, setTrigger] = React.useState(true);
  const orderSeller = useSelector((state) =>
    state.order.orders.filter((x) => x.sellerId == user.id)
  );
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const getOrderData = async () => {
      const orderStatus = await getOrders(dispatch, token);
      console.log(orderSeller);

      let rowData = [];
      orderSeller.map((item) => {
        rowData.push({
          id: item.id,
          status: item.status,
          col1: item.productName,
          col2: item.productCategory,
          col3: item.quantity,
          col4: item.totalPrice,
          col5: item.expireDate,
        });
      });
      setRows(rowData);
    };
    getOrderData();
  }, [trigger]);

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
  const acceptPending = (id) => {
    alert(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let data = {
          status: "Accept",
          // "isAccept":true
        };
        const updateOrderStatus = await updateOrder(id, data, dispatch, token);
        // const orderStatus = await getOrders(dispatch, token);
        if (updateOrderStatus) {
          setTrigger(!trigger);
          Swal.fire("Updated!", "Order status has been changed.", "success");
        } else {
          Swal.fire("Can't Updated!", "Can't change the status", "error");
        }
      }
    });
  };
  const declinePending = (id) => {
    console.log(rows);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let data = {
          status: "Cancel",
          // "isAccept":true
        };
        const updateOrderStatus = await updateOrder(id, data, dispatch, token);
        // const orderStatus = await getOrders(dispatch, token);
        if (updateOrderStatus) {
          setTrigger(!trigger);
          Swal.fire("Updated!", "Order status has been changed.", "success");
        } else {
          Swal.fire("Can't Updated!", "Can't change the status", "error");
        }
      }
    });
  };

  const columns = [
    { field: "col1", headerName: "Product", width: 150 },
    { field: "col2", headerName: "Category", width: 150 },
    { field: "col3", headerName: "Total Amount(Kg)", width: 150 },
    { field: "col4", headerName: "Total Cost(Rs)", width: 150 },
    { field: "col5", headerName: "Date", width: 150 },
    // { field: "col6", headerName: "Organization", width: 150 },
    {
      field: "col6",
      headerName: "Actions",
      width: 150,
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {};

        return (
          <>
            {params.row.status == "Accept" ? (
              <ColorButton1 style={{ marginRight: 3 }}>
                Already Accept
              </ColorButton1>
            ) : (
              <>
                <ColorButton1
                  style={{ marginRight: 3 }}
                  onClick={() => {
                    acceptPending(params.row.id);
                  }}
                >
                  Accept
                </ColorButton1>
                <ColorButton2
                  onClick={() => {
                    declinePending(params.row.id);
                  }}
                >
                  Cancel
                </ColorButton2>
              </>
            )}
          </>
        );
      },
    },
  ];

  const [filterButtonEl, setFilterButtonEl] = React.useState(null);
  return (
    <Box
      sx={{
        height: 400,
        // width: "100%",
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
