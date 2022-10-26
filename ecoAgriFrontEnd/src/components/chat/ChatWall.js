import React, { useEffect, useRef, useState } from "react";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { Box, createTheme, Grid, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, ThemeProvider } from "@mui/material";
import { MessageLeft, MessageRight } from "./Message";
import TextInput from "./TextInput";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { storage, db } from "../../Firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { async } from "@firebase/util";
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

// const firestore = storage.
// const messages = [
//     {
//         mid: 1,
//         fid: 10, //from Id
//         tid: 1, // To Id
//         message: "Hello",
//         // timestamp: "MM/DD 00:00",
//         displayName: "Ashani",
//     },
//     {
//         mid: 2,
//         fid: 1,
//         tid: 10,
//         message: "Hello",
//         // timestamp: "MM/DD 00:00",
//         displayName: "Ashani",
//     },
//     {
//         mid: 3,
//         fid: 10,
//         tid: 1,
//         message: "Can you help me?",
//         // timestamp: "MM/DD 00:00",
//         displayName: "you",
//     },
//     {
//         mid: 4,
//         fid: 10,
//         tid: 1,
//         message: "Can you help me?",
//         // timestamp: "MM/DD 00:00",
//         displayName: "you",
//     },
//     {
//         mid: 5,
//         fid: 10,
//         tid: 1,
//         message: "Can you help me?",
//         // timestamp: "MM/DD 00:00",
//         displayName: "you",
//     },
//     {
//         mid: 6,
//         fid: 10,
//         tid: 1,
//         message: "I want to know more details about CS",
//         // timestamp: "MM/DD 00:00",
//         displayName: "you",
//     },
//     {
//         mid: 7,
//         fid: 2,
//         tid: 10,
//         message: "yeah, sure",
//         // timestamp: "MM/DD 00:00",
//         displayName: "Ashani",
//     },
//     {
//         mid: 8,
//         fid: 2,
//         tid: 10,
//         message: "Give us degree names or interested fields of you",
//         // timestamp: "MM/DD 00:00",
//         displayName: "Ashani",
//     },
//     {
//         mid: 9,
//         fid: 10,
//         tid: 2,
//         message: "ICT",
//         // timestamp: "MM/DD 00:00",
//         displayName: "you",
//     },
// ];

const theme = createTheme({
    palette: {
        primary: {
            main: "#007A31",
        },
    },
    typography: {
        fontFamily: "Poppins",
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
    },
});

function ChatWall(props) {
    const id = props.selectContactdetails.value1;
    const [active, setActive] = useState()
    const [msg, setMsg] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector((state) => state.user.currentUser);
    const userId = user.id;
    const receiverId = props.value1;

    // useEffect(() => {
    //     if (id == 0) {
    //         setActive("false")
    //     } else {
    //         setActive("true")
    //     }
    //     if (msg !== null) {

    //         const d = new Date();
    //         const date = `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`

    //         // console.log(date)

    //         const obj = {
    //             fid: 10,
    //             tid: msg.id,
    //             message: msg.text,
    //             timestamp: date,
    //             displayName: "You"
    //         }
    //         messages.push(obj)
    //         setMsg(null)
    //     }
    // })



    // const loginid = 10;
    // const check = 0;


    // const messagesRef = storage.collection('messages');
    // const query = messagesRef.orderBy('createdAt').limit(25);
    const scroll = useRef()
    const [messages, setMessages] = useState([])
    const getMessages = async () => {
        setIsLoading(true);
        const q = query(collection(db, "messages"), where("id", "==", `${userId}-${receiverId}`));
        const receiveMessages = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            receiveMessages.push({
                mId: doc.id,
                ...doc.data(),
            });
        });
        setMessages(receiveMessages);
        setIsLoading(false);
    }
    useEffect(() => {
        getMessages();
    }, [])
    if (isLoading) {
        return <p>Loading .....</p>
    }
    console.log(messages)
    return (
        <ThemeProvider theme={theme}>
            <Box>
                <Box
                    sx={{
                        height: "50px",
                        borderBottom: "1px solid",
                        borderColor: "grey.300",
                    }}
                >
                    <ListItem disablePadding>
                        <ListItemIcon>
                            {/* <IconButton> */}
                            <KeyboardArrowLeftIcon onClick={props.onBack} />
                            {/* </IconButton> */}
                        </ListItemIcon>
                        <ListItemText primary={props.selectContactdetails.value2} />
                    </ListItem>
                </Box>
                <Box
                    sx={{
                        overflow: "hidden",
                        overflowY: "auto",
                        height: "400px",
                    }}
                >
                    {messages.map((message) => {
                        if (message.receiverId === userId) {
                            return (
                                <MessageLeft
                                    key={message.mId}
                                    message={message.text}
                                // timestamp={timestamp}
                                // displayName={displayName}
                                />
                            );
                        } else if (message.senderId === userId) {
                            return (
                                <MessageRight
                                    key={message.mId}
                                    message={message.text}
                                // timestamp={timestamp}
                                // displayName={displayName}
                                />
                            );
                        }
                    })}

                </Box>
                {/* {active == "true" && <TextInput id={id} scroll={scroll}></TextInput>} */}
                <TextInput id={id} scroll={scroll}></TextInput>
            </Box>
        </ThemeProvider>
    );
}

export default ChatWall;
