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
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { storage, db } from "../../Firebase";
import Test from './Test';
import ContactList from './ContactList';
import { useSelector } from 'react-redux';
import BackDrop from '../ui/BackDrop';
import ContainerLoading from '../ui/ContainerLoading';
import LinearIndeterminate from '../ui/LinearIndeterminate';
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
    const [conversationList, setConversationList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const selectItem = (id, name) => {
        setActive(id)
        props.onClick();
        { props.setSelectContactdetails((obj) => ({ ...obj, value1: id, value2: name })) }
    }

    const [searchItem, setSearchItem] = React.useState('')
    const searchHandler = (e) => {
        setSearchItem(e.target.value)
    }

    const user = useSelector((state) => state.user.currentUser);
    const userId = user.id;
    console.log(user.userrole)
    const otherUsers = useSelector((state) => state.user.otherUsers.filter((x) => x.id != userId && (x.userrole == "Farmer" || x.userrole == "Buyer" || x.userrole == "AgriExpert")));

    const getMessages = async () => {
        setIsLoading(true)
        const q = query(collection(db, "messages"), orderBy('timestamp'));
        const persons = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.data().senderId === userId) {
                const personExist = persons.find((user) => user.id === doc.data().receiverId)
                if (!personExist) {
                    const user = otherUsers.filter((x) => x.id === doc.data().receiverId);
                    persons.push(user[0]);
                }
            } else if (doc.data().receiverId === userId) {
                const personExist = persons.find((user) => user.id === doc.data().senderId)
                if (!personExist) {
                    const user = otherUsers.filter((x) => x.id === doc.data().senderId);
                    persons.push(user[0]);
                }
            }
        });
        setConversationList(persons);
        setIsLoading(false)
    }
    React.useEffect(() => {
        getMessages();
    }, [])

    // if (isLoading) {
    //     return <p>Loading .....</p>
    // }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* <BackDrop dataUploading={true} /> */}
            <Paper square sx={{ pb: '50px', height: "400px", overflowY: "auto" }}>
                <Box>
                    <Autocomplete
                        onSelect={searchHandler}
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={conversationList.map((option) => option.username)}
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
                </Box>
                {isLoading && <LinearIndeterminate /> }
                <Box sx={{
                    overflow: "hidden",
                }}>
                    <List sx={{ mb: 2 }}>
                        {searchItem === "" && (
                            conversationList.map((user) => (
                                <React.Fragment key={user.id} >
                                    <ListItem
                                        button
                                        style={{ borderLeft: active == user.id ? '3px #3399FF solid' : '3px #FFFFFF solid' }}
                                        onClick={() => selectItem(user.id, user.username)}
                                    >
                                        <ListItemAvatar>
                                            <Avatar alt="Profile Picture" src={user.img} />
                                        </ListItemAvatar>
                                        <ListItemText primary={user.username} secondary={user.userrole} />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            )
                            ))}
                        {searchItem !== "" && (
                            conversationList.map((user) => {
                                return (
                                    searchItem === user.username &&
                                    <React.Fragment key={user.id} >
                                        <ListItem
                                            button
                                            style={{ borderLeft: active == user.id ? '3px #3399FF solid' : '3px #FFFFFF solid' }}
                                            onClick={() => selectItem(user.id, user.username)}
                                        >
                                            <ListItemAvatar>
                                                <Avatar alt="Profile Picture" src={user.img} />
                                            </ListItemAvatar>
                                            <ListItemText primary={user.username} secondary={user.userrole} />
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
