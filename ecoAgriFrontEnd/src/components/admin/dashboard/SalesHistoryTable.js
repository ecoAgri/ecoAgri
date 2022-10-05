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

export default function SalesHistoryTable() {
    const rows = [
        {
            id: 1,
            col1: "Potato",
            col2: "Vegitable",
            col3: "20",
            col4: "1200",
            col5: "12-08-2022",
            col6: "Lahiru",
            col7: "Pasindu",
        },
        {
            id: 2,
            col1: "Potato",
            col2: "Vegitable",
            col3: "20",
            col4: "1200",
            col5: "12-08-2022",
            col6: "Lahiru",
            col7: "Pasindu",
        },
        {
            id: 3,
            col1: "Potato",
            col2: "Vegitable",
            col3: "20",
            col4: "1200",
            col5: "12-08-2022",
            col6: "Lahiru",
            col7: "Pasindu",
        },
    ];

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
