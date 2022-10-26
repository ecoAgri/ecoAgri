import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Divider, Grid } from '@mui/material';
import PopularAreas from './PopularAreas';
import Districts from './Districts';
import DistrictService from '../../services/DistrictService';

export default function DistrictSelector() {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    // console.log(DistrictService["Colombo"])
    DistrictService.map((district) => {

    })
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
                                Districts
                            </ListSubheader>
                        }
                    >
                        {DistrictService.map((place) => (
                            <Districts
                                districtName={place.district}
                                places={place.cities}
                            />
                        ))} 
                    </List>
                </Grid>
            </Grid>
        </div>

    );
}
