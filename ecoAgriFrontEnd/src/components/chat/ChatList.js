import * as React from 'react';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { alpha, Autocomplete, Divider, InputBase, TextField } from '@mui/material';
import Test from './Test';
import ContactList from './ContactList';
const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

const theme = createTheme({
    palette: {
        primary: {
            main: "#007A31",
        },
        secondary: {
            main: "#52b202"
        }
    },
    typography: {
        fontFamily: "Poppins",
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
    },
});


const messages = [
    {
        id: 1,
        label: 'Bhanuka Rajapaksha',
        secondary: "Are you ...",
        person: 'images/tutors/tutor-2.png',
    },
    {
        id: 2,
        label: 'Jonny perera',
        secondary: "Are you ...",
        person: 'images/tutors/tutor-3.png',
    },
    {
        id: 3,
        label: 'Melaka Pathirangama',
        secondary: 'Are you ...',
        person: 'images/tutors/tutor-1.png',
    },
    {
        id: 4,
        label: 'Lahiru wije',
        secondary: 'Are you ...',
        person: 'images/tutors/tutor-2.png',
    },
    {
        id: 5,
        label: 'Akila Perera',
        secondary: 'Are you ...',
        person: 'images/tutors/tutor-3.png',
    },
    {
        id: 6,
        label: 'Akila Perera',
        secondary: 'Are you ...',
        person: 'images/tutors/tutor-3.png',
    },
];

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    height: '45px',
    borderLeft: '2px #ffffff solid',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //     marginLeft: theme.spacing(1),
    //     width: 'auto',
    // },
}));


const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    height: '45px',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        // [theme.breakpoints.up('sm')]: {
        //     width: '14ch',
        //     '&:focus': {
        //         width: '25.4ch',
        //         backgroundColor: '#F4F4F4',
        //     },
        // },
    },
}));

export default function ChatList(props) {

    const [active, setActive] = React.useState(-1);
    const selectItem = (id, name) => {
        setActive(id)
        props.onClick();
        { props.setSelectContactdetails((obj) => ({ ...obj, value1: id, value2: name })) }
    }

    const [searchItem, setSearchItem] = React.useState('')
    const searchHandler = (e) => {
        setSearchItem(e.target.value)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Paper square sx={{ pb: '50px', height: "400px", overflowY: "auto" }}>
                <Box>
                    <Autocomplete
                        onSelect={searchHandler}
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={messages.map((option) => option.label)}
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
                    {/* <Search>
                        <SearchIconWrapper>
                            <SearchIcon sx={{ color: 'grey.400', }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search messages ..."
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={searchHandler}
                        />
                    </Search> */}
                </Box>
                <Box sx={{
                    overflow: "hidden",
                }}>
                    <List sx={{ mb: 2 }}>
                        {searchItem === "" && (
                            messages.map(({ id, label, secondary, person }) => (
                                <React.Fragment key={id} >
                                    <ListItem
                                        button
                                        style={{ borderLeft: active == id ? '3px #3399FF solid' : '3px #FFFFFF solid' }}
                                        onClick={() => selectItem(id, label)}
                                    >
                                        <ListItemAvatar>
                                            <Avatar alt="Profile Picture" src={person} />
                                        </ListItemAvatar>
                                        <ListItemText primary={label} secondary={secondary} />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            )
                            ))}
                        {searchItem !== "" && (
                            messages.map(({ id, label, secondary, person }) => {
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
                                            <ListItemText primary={label} secondary={secondary} />
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                )
                            }))}
                    </List>
                </Box>
            </Paper>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <ContactList onSelect={props.onClick} setSelectContactdetails={props.setSelectContactdetails} />
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}
