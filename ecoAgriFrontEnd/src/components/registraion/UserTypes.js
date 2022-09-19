import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button, Grid, Typography } from '@mui/material'
import CenteredBox from '../ui/CenteredBox'
import { useDispatch } from 'react-redux'
import { userTypeSelectorButtonActions } from '../../store/userType-selector-slice'

function UserTypes(props) {

    const dispatch = useDispatch();
    const typeSelectorHandler = () => {
        dispatch(userTypeSelectorButtonActions.setSelectedSignupButton(props.userType));
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <CenteredBox align="center">
                        <Button variant="outlined" onClick={typeSelectorHandler}><Avatar sx={{ height: 100, width: 100 }} src={props.image} /></Button>
                    </CenteredBox>
                </Grid>
                <Grid item xs={12}>
                    <CenteredBox align="center">
                        <Typography color="primary" variant="h6">{props.userType}</Typography>
                    </CenteredBox>
                </Grid>
            </Grid>
        </div>
    )
}

UserTypes.propTypes = {
    icon: PropTypes.element,
}

export default UserTypes
