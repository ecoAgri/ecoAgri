import * as React from "react";
import PropTypes from "prop-types";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";

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
    const rows = [
        {
            id: 1,
            col1: "Pasindu Lakmal",
            col2: "Potato",
            col3: "Vegitable",
            col4: "1300",
            col5: "12-08-2022",
        },
        {
            id: 2,
            col1: "Pasindu Lakmal",
            col2: "Potato",
            col3: "Vegitable",
            col4: "1300",
            col5: "12-08-2022",
        },
        {
            id: 3,
            col1: "Pasindu Lakmal",
            col2: "Potato",
            col3: "Vegitable",
            col4: "1300",
            col5: "12-08-2022",
        },
        {
            id: 4,
            col1: "Pasindu Lakmal",
            col2: "Potato",
            col3: "Vegitable",
            col4: "1300",
            col5: "12-08-2022",
        },
        {
            id: 5,
            col1: "Pasindu Lakmal",
            col2: "Potato",
            col3: "Vegitable",
            col4: "1300",
            col5: "12-08-2022",
        },
    ];

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
