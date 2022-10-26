import * as React from "react";
import PropTypes from "prop-types";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Box, Button, Chip, Grid } from "@mui/material";
import CenteredBox from "../../ui/CenteredBox";
import BuyingModal from "./BuyingModal";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, addProduct } from "../../../store/productApiCalls";
import { getUsers } from "../../../store/userApiCalls";
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

export default function PendingRequestTable() {
  const dispatch = useDispatch();
  // const [sellerId, setSellerId] = React.useState(0);
  const user = useSelector((state) => state.user.currentUser);
  const orderPending = useSelector((state) =>
    state.order.orders.filter(
      (x) =>
        (x.status == "Pending" ||
          (x.status == "Accept" && x.isAccept == false)) &&
        x.userId == user.id
    )
  );
  //purchase completed the isAccept = 1
  //but if seller was accept buyer doesnt complete payment.. then status="Accept" and isAccept = 0
  const orderIsAccept = useSelector((state) =>
    state.order.orders.filter((x) => x.status == "Accept" && x.isAccept)
  );

  const token = useSelector((state) => state.user.token);
  const otherUsers = useSelector((state) => state.user.otherUsers);
  const [deleteTrigger, setDeleteTrigger] = React.useState("");
  const [rows, setRows] = React.useState([]);

  // React.useEffect(async () => {
  //   //orders
  //   await getProducts(dispatch, token);
  //   getUsers(dispatch, token);
  // }, [dispatch, deleteTrigger]);

  React.useEffect(() => {
    const getOrderData = async () => {
      // const orderStatus = await getOrders(dispatch, token);
      // if (orderStatus) {
        console.log(orderPending);
        console.log(orderIsAccept);
        let rowData = [];
        orderPending.map((item) => {
          rowData.push({
            id: item.id,
            productId:item.productId,
            status: item.status,
            col1: item.productName,
            col2: item.productCategory,
            col3: item.quantity,
            col4: item.totalPrice,
            col5: item.expireDate,
            col6: item.sellerName,
            col7: item.sellerContact,
          });
        });
        setRows(rowData);
      }
    // };
    getOrderData();
  }, [deleteTrigger]);

  // React.useEffect(()=>{
  //   const getProductData = async () => {
  //     const productStatus= await getProducts(dispatch, token);
  //   }
  //   getProductData();
  // },[deleteTrigger]);

  // const rows = [
  //   {
  //     id: 1,
  //     status: "cancelled",
  //     col1: "Potato",
  //     col2: "Vegitable",
  //     col3: "20",
  //     col4: "1200",
  //     col5: "12-08-2022",
  //     col6: "Lahiru",
  //     col7: "0712345678",
  //   },
  //   {
  //     id: 2,
  //     status: "accepted",
  //     col1: "Potato",
  //     col2: "Vegitable",
  //     col3: "20",
  //     col4: "1200",
  //     col5: "12-08-2022",
  //     col6: "Lahiru",
  //     col7: "0712345678",
  //   },
  //   {
  //     id: 3,
  //     status: "pending",
  //     col1: "Potato",
  //     col2: "Vegitable",
  //     col3: "20",
  //     col4: "1200",
  //     col5: "12-08-2022",
  //     col6: "Lahiru",
  //     col7: "0712345678",
  //   },
  // ];

  const buttonClick = async () => {
    alert("Yohan");
    const data = {
      productName: "Mango Banana Banana",
      productCategory: "Fruits",
      weight: 56.5,
      unitPrice: 50,
      manuDate: "2022-05-14",
      expireDate: "2022-12-15",
      fieldAddress: "789",
      status: "Accept",
      location: "Malabe",
      image1: "image",
      image2: "image",
      image3: "image",
      image4: "image",
    };
    console.log(token);
    // await addProduct(data,dispatch, token);
    // console.log(orders);
  };

  const columns = [
    {
      field: "col1",
      headerName: "Product",
      headerClassName: "header-class-name",
      // width: 150,
    },
    {
      field: "col2",
      headerName: "Category",
      headerClassName: "header-class-name",
      // width: 150,
    },
    {
      field: "col3",
      headerName: "Total Amount(kg)",
      headerClassName: "header-class-name",
      width: 150,
    },
    {
      field: "col4",
      headerName: "Total Cost(Rs)",
      headerClassName: "header-class-name",
      width: 150,
    },
    {
      field: "col5",
      headerName: "Date",
      headerClassName: "header-class-name",
      width: 150,
    },
    {
      field: "col6",
      headerName: "Seller",
      headerClassName: "header-class-name",
      width: 200,
    },
    {
      field: "col7",
      headerName: "Seller Contact",
      headerClassName: "header-class-name",
      width: 200,
    },
    {
      field: "col8",
      headerName: "Status",
      headerClassName: "header-class-name",
      width: 200,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        console.log(params.row.productId);
        const viewUserClickHandler = (e) => {
          console.log(params);
          console.log("hello on View");
        };
        const updateUserClickHandler = () => {
          console.log("hello on Update");
        };
        return (
          <React.Fragment>
            {params.row.status === "Accept" && (
              <BuyingModal amount={params.row.col4} quantity={params.row.col3} productId={params.row.productId} id={params.row.id} />
              // <Button onClick={buttonClick}>Add</Button>
            )}
            {params.row.status === "Cancel" && (
              <Chip label="Cancelled" color="error" variant="outlined" />
            )}
            {params.row.status === "Pending" && (
              <Chip label="Pending" color="warning" variant="outlined" />
            )}
          </React.Fragment>
        );
      },
    },
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
