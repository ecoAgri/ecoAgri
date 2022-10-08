import { Collapse, Divider, List, ListItemButton, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { propularAreaActions } from '../../store/popularAreaSelector-slice';

function PopularAreas(props) {
    const [places, setPlaces] = useState(props.places)
    const dispatch = useDispatch();

    const selectPlaceHandler = (place) => {
        dispatch(propularAreaActions.addArea(place))
    }

    return (
        places.map((place) => (
            <Collapse key={place} in={props.OnOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton onClick={() => {selectPlaceHandler(place)}} sx={{ pl: 4 }}>
                        <ListItemText secondary={place} />
                    </ListItemButton>
                </List>
            </Collapse>
        ))

    )
}

export default PopularAreas