import * as React from "react";
import PropTypes from "prop-types";
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import styled from '@emotion/styled';
import { green, red } from '@mui/material/colors';

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
}))

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
            id: 1, col1: 'Hello', col2: 'World', col3: 'Hello', col4: 'World', col5: 'World'
        },
        {
            id: 2, col1: 'Hello', col2: 'World', col3: 'Hello', col4: 'World', col5: 'World'
        },
    ];

    const columns = [
        { field: 'col1', headerName: 'Product', width: 150 },
        { field: 'col2', headerName: 'Category', width: 150 },
        { field: 'col3', headerName: 'Total Amount', width: 150 },
        { field: 'col4', headerName: 'Date', width: 150 },
        { field: 'col5', headerName: 'Organization', width: 150 },
        {
            field: 'col6', headerName: 'Actions', width: 150, align: 'center',
            disableColumnMenu: true,
            sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {

                };

                return (
                    <>
                        <ColorButton1 style={{ marginRight: 3 }}>Accept</ColorButton1>
                        <ColorButton2>Cancel</ColorButton2>
                    </>);
            }
        },
    ];

    const [filterButtonEl, setFilterButtonEl] = React.useState(null);
    return (
        <Box
            sx={{
                height: 400,
                // width: "100%",
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
