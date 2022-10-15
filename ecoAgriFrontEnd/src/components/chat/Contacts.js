import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Autocomplete, Grid, IconButton, ListItemButton, ListItemIcon, TextField } from '@mui/material';
import SearchBar from '../ui/Searchbar';
import CenteredBox from '../ui/CenteredBox';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CloseIcon from '../ui/CloseIcon';
const DUMMY_CONTACT = [
    {
        id: 60,
        label: 'Pasindu Lakmal',
        person: 'images/tutors/tutor-2.png',
    },
    {
        id: 62,
        label: 'Supun Banuka',
        person: 'images/tutors/tutor-3.png',
    },
    {
        id: 63,
        label: 'Mahinda Rajapaksha',
        person: 'images/tutors/tutor-1.png',
    },
    {
        id: 64,
        label: 'Mia Malkova',
        person: 'images/tutors/tutor-2.png',
    },
]

export default function Contacts(props) {
    const [active, setActive] = React.useState(-1);
    const selectItem = (id, name) => {
        setActive(id)
        props.onSelect();
        { props.setSelectContactdetails((obj) => ({ ...obj, value1: id, value2: name })) }
    }

    const [searchItem, setSearchItem] = React.useState('')
    const searchHandler = (e) => {
        setSearchItem(e.target.value)
    }
    return (
        <List sx={{ height: "300px", width: "300px", overflowY: "auto", bgcolor: "#FFF" }}>
            <Autocomplete
                onSelect={searchHandler}
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={DUMMY_CONTACT.map((option) => option.label)}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search users"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
            {searchItem === "" && DUMMY_CONTACT.map(({ id, label, person }) => (
                <React.Fragment key={id} >
                    <ListItem
                        button
                        style={{ borderLeft: active == id ? '3px #3399FF solid' : '3px #FFFFFF solid' }}
                        onClick={() => selectItem(id, label)}
                    >
                        <ListItemAvatar>
                            <Avatar alt="Profile Picture" src={person} />
                        </ListItemAvatar>
                        <ListItemText primary={<Typography sx={{ color: "#000" }}>{label}</Typography>} />
                    </ListItem>
                    <Divider />
                </React.Fragment>
            ))}
            {searchItem !== "" && (
                DUMMY_CONTACT.map(({ id, label, secondary, person }) => {
                    return (
                        searchItem === label &&
                        <React.Fragment key={id} >
                            <ListItem
                                button
                                style={{ borderLeft: active == id ? '3px #3399FF solid' : '3px #FFFFFF solid' }}
                                onClick={() => selectItem(id, label)}
                            >
                                <ListItemAvatar>
                                    <Avatar alt="Profile Picture" src={person} />
                                </ListItemAvatar>
                                <ListItemText primary={<Typography sx={{ color: "#000" }}>{label}</Typography>} />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    )
                }))}
        </List >
    );
}
