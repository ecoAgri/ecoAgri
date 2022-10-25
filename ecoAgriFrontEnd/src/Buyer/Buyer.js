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
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function ArticalCard() {
    const [expanded, setExpanded] = React.useState(false);
    const user = useSelector((state) => state.user.currentUser);
    const userType = user.userrole;
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const articalConfirmHandler = (type) => {
        Swal.fire({
            title: `Are you want to ${type} the artical?`,
            text: "You won't be able to revert this!",
            icon: type === "reject" ? 'error' : 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, ${type} it!`
        }).then((result) => {
            if (result.isConfirmed) {
                //Confirmation backend call here
                Swal.fire(
                    `${type}!`,
                    `Artical has been ${type}.`,
                    'success'
                )
            }
        })
    }

    return (
        <Card sx={{ width: "100%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
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
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    <b>This impressive paella is a perfect party</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid container>
                    <Grid item xs={4}>
                        <CardModal onConfirm={articalConfirmHandler} />
                    </Grid>
                    {userType === "Moderator" &&
                        <Grid item xs={8}>
                            <CenteredBox align="right">
                                <Button variant="contained" sx={{ mr: 1 }} onClick={() => { articalConfirmHandler("accept") }}>Accept</Button>
                                <Button variant="outlined" color="error" onClick={() => { articalConfirmHandler("reject") }}>Reject</Button>
                            </CenteredBox>
                        </Grid>
                    }
                </Grid>
            </CardActions>
        </Card>
    );
}