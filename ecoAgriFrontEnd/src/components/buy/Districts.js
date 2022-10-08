import { Divider, ListItemButton, ListItemText } from '@mui/material';
import React from 'react'
import PopularAreas from './PopularAreas';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

function Districts(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={props.districtName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Divider />
      <PopularAreas OnOpen={open} places={props.places} />
    </React.Fragment>
  )
}

export default Districts