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

const messages = [
    {
        id: 1,
        personName: 'Pasindu Lakmal',
        lastMessage: "I want to get details about your product",
        person: '/static/images/avatar/5.jpg',
    },
    {
        id: 2,
        personName: 'Piruna',
        lastMessage: `I want to know something about how to grow`,
        person: '/static/images/avatar/1.jpg',
    },
    {
        id: 3,
        personName: 'Supun Bhanuka',
        lastMessage: 'I want to get details about your product',
        person: '/static/images/avatar/2.jpg',
    },
    {
        id: 4,
        personName: 'Lahiru',
        lastMessage: 'Can I get a donation please',
        person: '/static/images/avatar/3.jpg',
    },
    {
        id: 5,
        personName: "Saman Perera",
        lastMessage: 'Can I get a donation please',
        person: '/static/images/avatar/4.jpg',
    },
    {
        id: 6,
        personName: 'Dilshan Ratnayake',
        lastMessage: `I want to get details about your product`,
        person: '/static/images/avatar/5.jpg',
    },
];

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
export default function ChatList(props) {
    
    const [active, setActive] = React.useState(-1);
    const selectItem = (id, name) => {
        setActive(id)
        { props.setSelectContactdetails((obj) => ({ ...obj, value1: id, value2: name })) }
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Paper square sx={{ pb: '50px', height: "400px", overflowY: "auto" }}>
                <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
                    Inbox
                </Typography>
                <List sx={{ mb: 2 }}>
                    {messages.map(({ id, personName, lastMessage, person }) => (
                        <React.Fragment key={id}>
                            <ListItem button onClick={props.onClick}>
                                <ListItemAvatar>
                                    <Avatar alt="Profile Picture" src={person} />
                                </ListItemAvatar>
                                <ListItemText primary={personName} secondary={lastMessage} />
                            </ListItem>
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer">
                        <MenuIcon />
                    </IconButton>
                    <StyledFab color="secondary" aria-label="add">
                        <AddIcon />
                    </StyledFab>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color="inherit">
                        <SearchIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <MoreIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}
