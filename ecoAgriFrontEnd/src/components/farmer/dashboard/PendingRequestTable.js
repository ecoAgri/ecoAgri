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
    const rows = [
        {
            id: 1,
            status: "cancelled",
            col1: "Potato",
            col2: "Vegitable",
            col3: "20",
            col4: "1200",
            col5: "12-08-2022",
            col6: "Lahiru",
            col7: "0712345678",
        },
        {
            id: 2,
            status: "accepted",
            col1: "Potato",
            col2: "Vegitable",
            col3: "20",
            col4: "1200",
            col5: "12-08-2022",
            col6: "Lahiru",
            col7: "0712345678",

        },
        {
            id: 3,
            status: "pending",
            col1: "Potato",
            col2: "Vegitable",
            col3: "20",
            col4: "1200",
            col5: "12-08-2022",
            col6: "Lahiru",
            col7: "0712345678",

        },
    ];

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
            // width: 150,
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
            // width: 200,
            headerAlign: 'center',
            align: 'center',
            disableColumnMenu: true,
            sortable: false,
            renderCell: (params) => {
                // const onClick = (e) => {};
                // const thisRow: Record<string, GridCellValue> = {};
                // console.log(thisRow);
                console.log(params);
                const viewUserClickHandler = (e) => {

                    console.log(params)
                    console.log("hello on View");
                }
                const updateUserClickHandler = () => {
                    console.log("hello on Update");
                }
                return (
                    <React.Fragment>
                        {params.row.status === "accepted" &&
                            <BuyingModal />
                        }
                        {params.row.status === "cancelled" &&
                            <Chip label="Cancelled" color="error" variant="outlined" />
                        }
                        {params.row.status === "pending" &&
                            <Chip label="Pending" color="warning" variant="outlined" />
                        }
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
                bgcolor: "#FFF"
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
