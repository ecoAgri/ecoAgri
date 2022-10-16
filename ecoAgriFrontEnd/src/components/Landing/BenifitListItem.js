import React from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
function BenifitListItem(props) {
  return (
    <ListItem disablePadding>
      <ListItemButton style={{cursor: "default"}}>
        <ListItemIcon>
          <FiberManualRecordIcon />
        </ListItemIcon>
        <ListItemText primary={props.title} />
      </ListItemButton>
    </ListItem>
  )
}

export default BenifitListItem