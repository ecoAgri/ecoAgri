import * as React from "react";
import PropTypes from "prop-types";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  gridClasses,
} from "@mui/x-data-grid";
// import styled from "@emotion/styled";
import { green, red, blue } from "@mui/material/colors";
import CenteredBox from "../ui/CenteredBox";
import { Box, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
// import Popup from "./Popup";
import { useRef } from "react";
import UpdateUserModal from "./UpdateUserModal";
import ViewUserModal from "./ViewUserModal";
import { GridApi } from "@mui/x-data-grid";
import { getUsers } from "../../store/userApiCalls";
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

const ColorButton3 = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[600]),
  backgroundColor: red[600],
  textTransform: "none",
  "&:hover": {
    backgroundColor: red[700],
  },
}));

const style = {
  boxShadow: 24,
  borderRadius: "0.5%",
  backgroundColor: "white",
  width: "1000px",
};
export default function ManageUserTable() {
  const [rows, setRows] = React.useState([]);
  const otherUsers = useSelector((state) => state.user.otherUsers);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const getAllUsers = async () => {
      const getUsersStatus = await getUsers(dispatch, token);
      if (getUsersStatus) {
        console.log("Success");
        let data = [];
        otherUsers.map((item) => {
          data.push({
            id: item.id,
            phoneNumber: item.phone_number,
            address: item.address,
            city: item.city,
            town: item.town,
            col1: item.username,
            col2: item.userrole,
            col3: item.email,
          });
        });
        setRows(data);
      } else {
        console.log("Unsuccess");
      }
    };
    getAllUsers();
  }, []);
  //   const rows = [
  //     {
  //       id: 1,
  //       col1: "Pasindu Lakmal",
  //       col2: "Farmer",
  //       col3: "Pasindu@gmail.com",
  //     },
  //     {
  //       id: 2,
  //       col1: "Supun Banuka",
  //       col2: "Buyer",
  //       col3: "pasindu.lakmal@gmail.com",
  //     },
  //     {
  //       id: 3,
  //       col1: "Piruna",
  //       col2: "Advertiser",
  //       col3: "pasindu.lakmal@gmail.com",
  //     },
  //     {
  //       id: 4,
  //       col1: "Lahiru",
  //       col2: "Charity",
  //       col3: "pasindu.lakmal@gmail.com",
  //     },
  //     {
  //       id: 5,
  //       col1: "Saman Kumara",
  //       col2: "Farmer",
  //       col3: "pasindu.lakmal@gmail.com",
  //     },
  //     {
  //       id: 6,
  //       col1: "Kusal Mendis",
  //       col2: "Buyer",
  //       col3: "pasindu.lakmal@gmail.com",
  //     },
  //   ];

  const columns = [
    {
      field: "col1",
      headerName: "User Name",
      headerClassName: "header-class-name",
      width: 150,
    },
    {
      field: "col2",
      headerName: "User Type",
      headerClassName: "header-class-name",
      width: 150,
    },
    {
      field: "col3",
      headerName: "Phone number",
      headerClassName: "header-class-name",
      width: 300,
    },
    {
      field: "col4",
      headerName: "Actions",
      headerClassName: "header-class-name",
      width: 400,
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        // const onClick = (e) => {};
        // const thisRow: Record<string, GridCellValue> = {};
        // console.log(thisRow);
        const viewUserClickHandler = (e) => {
          console.log(params);
          console.log("hello on View");
        };
        const updateUserClickHandler = () => {
          console.log("hello on Update");
        };
        return (
          <Grid container spacing={0}>
            <Grid item xs={4}>
              <ViewUserModal onView={viewUserClickHandler} data={params.row} />
            </Grid>
            <Grid item xs={4}>
              <UpdateUserModal
                userType={params.row.col2}
                onUpdate={updateUserClickHandler}
                data={params.row}
              />
            </Grid>
            <Grid item xs={4}>
              <ColorButton3>Delete</ColorButton3>
            </Grid>
          </Grid>
        );
      },
    },
  ];

  const [filterButtonEl, setFilterButtonEl] = React.useState(null);
  return (
    <Box
      sx={{
        height: 600,
        width: 1000,
        align: "center",
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
