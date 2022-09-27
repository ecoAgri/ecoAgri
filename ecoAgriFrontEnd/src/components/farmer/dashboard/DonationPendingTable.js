import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
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
                <ColorButton1 style={{marginRight: 3}}>Accept</ColorButton1>
                <ColorButton2>Cancel</ColorButton2>
            </>);
        }
    },
];

export default function DonationPendingTable() {
    return (
        <div style={{ height: 300, width: '910px' }}>
            <DataGrid rows={rows} columns={columns} />
        </div>
    );
}
