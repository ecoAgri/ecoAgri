import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import classes from "../ui/ScrollBar.module.css";
import { CardMedia } from '@mui/material';
import Carousel from '../ui/Carousel';
import { useSelector } from 'react-redux';
import CenteredBox from '../ui/CenteredBox';
// import Carousel from '../ui/Carousel/Carousel';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    pr: 0
};

export default function CardModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const user = useSelector((state) => state.user.currentUser);
    const userType = user.userrole;
    return (
        <div>
            <Button onClick={handleOpen}>See More</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ height: 400, pr: 4, overflow: "auto" }} className={classes.box}>
                        <Carousel
                            images={
                                [
                                    {
                                        imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                                        label: "hello"
                                    },
                                    {
                                        imgPath: "https://images.unsplash.com/photo-1501263418469-bcf7b079b4c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
                                        label: "hello2"
                                    },
                                    {
                                        imgPath: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                                        label: "hello3"
                                    }
                                ]}
                        />
                        <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                            large plate and set aside, leaving chicken and chorizo in the pan. Add
                            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                            stirring often until thickened and fragrant, about 10 minutes. Add
                            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                        </Typography>
                    </Box>
                    {userType === "Moderator" &&
                        <Box sx={{ mt: 2, pr: 2 }}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => {
                                    handleClose()
                                    props.onConfirm("accept")
                                }}>
                                    Accept
                                </Button>
                                <Button variant="outlined" color="error" sx={{ mr: 1 }} onClick={() => {
                                    handleClose()
                                    props.onConfirm("reject")
                                }}>
                                    Reject
                                </Button>
                            </CenteredBox>
                        </Box>
                    }
                </Box>
            </Modal>
        </div >
    );
}
