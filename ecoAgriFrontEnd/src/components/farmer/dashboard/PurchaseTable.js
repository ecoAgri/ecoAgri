import * as React from "react";
import PropTypes from "prop-types";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Box, Button, Chip, Grid } from "@mui/material";
import CenteredBox from "../../ui/CenteredBox";

//Filter panel
const CustomToolbar = ({ setFilterButtonEl }) => (
    <GridToolbarContainer>
        <GridToolbarFilterButton ref={setFilterButtonEl} />
    </GridToolbarContainer>
);

CustomToolbar.propTypes = {
    setFilterButtonEl: PropTypes.func.isRequired,
};

export default function PurchaseTable() {
    const rows = [
        {
            id: 1, col1: 'Hello', col2: 'World', col3: 'Hello', col4: 'World', col5: 'World'
        },
        {
            id: 2, col1: 'Hello', col2: 'World', col3: 'Hello', col4: 'World', col5: 'World'
        },
    ];
    
    const columns = [
        { field: 'col1', headerName: 'Product', width: 180 },
        { field: 'col2', headerName: 'Category', width: 180 },
        { field: 'col3', headerName: 'Total Amount', width: 180 },
        { field: 'col4', headerName: 'Date', width: 180 },
        { field: 'col5', headerName: 'Organization', width: 180 },
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
