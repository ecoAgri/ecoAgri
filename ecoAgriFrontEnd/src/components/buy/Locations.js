import { Chip, Grid, List, ListItem, ListSubheader } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { propularAreaActions } from '../../store/popularAreaSelector-slice';

function Locations() {
  const dispatch = useDispatch();
  const areas = useSelector((state) => state.popularArea.selectedAreas);
  const handleDelete = (area) => {
    dispatch(propularAreaActions.addArea(area))
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Selected Areas
              </ListSubheader>
            }
          >
            {areas.map((area) => (
              <ListItem key={area}>
                <Chip label={area} variant="contained" color="primary" onDelete={() => {handleDelete(area)}} />
              </ListItem>
            ))}

          </List>
        </Grid>
      </Grid>
    </div>
  )
}

export default Locations