import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CardMedia, Grid, IconButton, TextField } from '@mui/material';
import CenteredBox from '../ui/CenteredBox';


import CollectionsIcon from "@mui/icons-material/Collections";
import UseImageOneInput from '../../hooks/use-ImageOneInput';
import CloseIcon from '@mui/icons-material/Close';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 6,
    p: 4,
    pr: 0,
    pb: 2,
    pt: 0
};

export default function AddPostButton(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {
        handleUploadClick: handleUploadHandler,
        imagePreview: postImagePreview,
        fileInput: postImageInput,
        imageData: postImageData
    } = UseImageOneInput(() => { })

    console.log(postImagePreview)
    console.log(postImageData)
    return (
        <div>
            <Button fullWidth sx={{ p: 2 }} variant="outlined" onClick={handleOpen}>Add Post</Button>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div>
                        <Grid container>
                            <Grid item xs={12}>
                                <CenteredBox align="right">
                                    <IconButton
                                        onClick={handleClose}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </CenteredBox>
                            </Grid>
                            <Grid item xs={12}>
                                <div style={{ height: "400px", overflowY: "auto" }}>
                                    <div style={{ marginRight: "30px" }}>
                                        {/* <ProfileImage size="small" /> */}
                                        <TextField
                                            sx={{ my: 2 }}
                                            placeholder="Add title"
                                            variant="standard"
                                            multiline
                                            // onChange={contentChangeHandler}
                                            // onBlur={contentBlurHandler}
                                            // error={contentHasError}
                                            // helperText={contentHasError ? contentError : ""}
                                            // value={content}
                                            fullWidth
                                        />
                                        <TextField
                                            sx={{ my: 2 }}
                                            placeholder="Say something..."
                                            variant="standard"
                                            multiline
                                            // onChange={contentChangeHandler}
                                            // onBlur={contentBlurHandler}
                                            // error={contentHasError}
                                            // helperText={contentHasError ? contentError : ""}
                                            // value={content}
                                            fullWidth
                                        />

                                        <CardMedia
                                            component="img"
                                            image={
                                                postImagePreview !== null ?
                                                    postImagePreview :
                                                    ""}
                                        />
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <div style={{ marginRight: "30px" }}>
                                    <Grid container>
                                        <Grid item xs={9}>
                                            <CenteredBox align="left">
                                                <IconButton
                                                    onClick={() => postImageInput.current.click()}
                                                >
                                                    <CollectionsIcon />
                                                </IconButton>
                                                <input
                                                    accept="image/*"
                                                    ref={postImageInput}
                                                    multiple
                                                    type="file"
                                                    onChange={handleUploadHandler}
                                                    style={{ display: "none" }}
                                                />
                                            </CenteredBox>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <CenteredBox align="right">
                                                <Button
                                                    variant="contained"
                                                    style={{ borderRadius: 20, textTransform: "none" }}
                                                // onClick={postSubmitHandler}
                                                // disabled={!formIsValid}
                                                >
                                                    Add Post
                                                </Button>
                                            </CenteredBox>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            </Modal>
        </div >
    );
}
