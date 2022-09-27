import { Grid, IconButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import CenteredBox from '../../ui/CenteredBox';
import BankDetailField from './BankDetailField'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearIcon from '@mui/icons-material/Clear';

const style = {
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    // width: 600,
    bgcolor: 'background.paper',
    border: "none",
    boxShadow: 5,
    borderRadius: 2,
    // p: 4,
    pl: 4,
    pb: 4
};
function BankDetail(props) {
    return (
        <Box sx={style}>
            <CenteredBox align="right">
                <IconButton color="error">
                    <DeleteForeverIcon fontSize="medium" />
                </IconButton>
            </CenteredBox>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <BankDetailField
                        fieldName="Account number"
                        userDetail={props.accountNumber}
                    />
                </Grid>
                <Grid item xs={12}>
                    <BankDetailField
                        fieldName="Account holder's name"
                        userDetail={props.holderName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <BankDetailField
                        fieldName="Bank"
                        userDetail={props.bankName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <BankDetailField
                        fieldName="Branch"
                        userDetail={props.branchName}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default BankDetail