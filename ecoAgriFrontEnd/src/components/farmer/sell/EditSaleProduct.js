import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
// import BuyProductForm from './BuyProductForm';
import CloseIcon from '@mui/icons-material/Close';
import CenteredBox from '../../ui/CenteredBox';
import AddProductForm from '../addProduct/AddProductForm';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 600,
    overflowY: "scroll",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
    pt: 0,
    pr: 0
};

export default function EditSaleProduct(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant='contained' color="error" style={{ textTransform: "none" }} sx={{ p: 0 }} onClick={handleOpen}>edit</Button>
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <CenteredBox align="right">
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </CenteredBox>
                    <Grid container sx={{ pr: 3 }} spacing={2}>
                        <Grid item xs={12}>
                            <CenteredBox align="center">
                                <Typography variant="h4">Update Product</Typography>
                            </CenteredBox>
                        </Grid>
                        <Grid item xs={12}>
                            <ImageListItem style={{ borderRadius: 10 }}>
                                <img
                                    src={`${props.img}?w=248&fit=crop&auto=format`}
                                    srcSet={`${props.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={props.title}
                                    loading="lazy"
                                    style={{ height: "230px" }}
                                />
                                <ImageListItemBar
                                    title={props.title}
                                    subtitle={props.author}
                                />
                            </ImageListItem>
                        </Grid>
                        <Grid item xs={12}>
                            <AddProductForm
                                productName="Mango"
                                productCategory={1}
                                manuDate="2022-09-20" 
                                expireDate="2022-09-25" 
                                fieldAddress="Galle"
                                weight={2}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
