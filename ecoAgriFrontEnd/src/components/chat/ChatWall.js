import React, { useEffect, useRef, useState } from "react";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { Box, createTheme, Grid, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, ThemeProvider } from "@mui/material";
import { MessageLeft, MessageRight } from "./Message";
import TextInput from "./TextInput";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { storage, db } from "../../Firebase";
import { collection, getDocs, query, where, orderBy, Timestamp, serverTimestamp } from "firebase/firestore";
import { useSelector } from 'react-redux';
import { async } from "@firebase/util";
import LinearIndeterminate from "../ui/LinearIndeterminate";
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

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
    const receiverId = props.selectContactdetails.value1;
    console.log(userId, receiverId);

    const scroll = useRef()
    const [messages, setMessages] = useState([])
    const [msgSending, setMsgSending] = useState(-1);
    const setMessageSend = () => {
        if (msgSending === -1)
            setMsgSending(0);
        else
            setMsgSending(-1);
    }
    const getMessages = async () => {
        setIsLoading(true);
        // const q = query(collection(db, "messages"), where("id", "==", `${userId}-${receiverId}`), orderBy('timestamp'));
        // console.log(`${userId}-${receiverId}`)
        const q = query(collection(db, "messages"), orderBy('timestamp'));
        const receiveMessages = []
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            if (doc.data().id === `${userId}-${receiverId}` || doc.data().id === `${receiverId}-${userId}`) {
                receiveMessages.push({
                    mId: doc.id,
                    ...doc.data(),
                });
            }
        });
        setMessages(receiveMessages);
        setIsLoading(false);
    }
    useEffect(() => {
        getMessages();
    }, [msgSending])

    const convertTimestamp = (timestamp) => {
        let date = timestamp.toDate();
        let mm = date.getMonth();
        let dd = date.getDate();
        let yyyy = date.getFullYear();

        date = mm + '-' + dd + '-' + yyyy;
        return date;
    }
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
                {isLoading && <LinearIndeterminate />}
                <Box
                    sx={{
                        overflow: "hidden",
                        overflowY: "auto",
                        height: "400px",
                    }}
                >
                    {messages.map((message) => {
                        if (message.receiverId === userId) {
                            // console.log(convertTimestamp(message.timestamp))
                            // console.log(message.timestamp)
                            return (
                                <MessageLeft
                                    key={message.mId}
                                    message={message.text}
                                    timestamp={convertTimestamp(message.timestamp)}
                                // displayName={displayName}
                                />
                            );
                        } else if (message.senderId === userId) {
                            return (
                                <MessageRight
                                    key={message.mId}
                                    message={message.text}
                                    timestamp={convertTimestamp(message.timestamp)}
                                // displayName={displayName}
                                />
                            );
                        }
                    })}

                </Box>
                {/* {active == "true" && <TextInput id={id} scroll={scroll}></TextInput>} */}
                <TextInput setMessageSend={setMessageSend} receiverId={receiverId} scroll={scroll}></TextInput>
            </Box>
        </ThemeProvider>
    );
}

export default ChatWall;
