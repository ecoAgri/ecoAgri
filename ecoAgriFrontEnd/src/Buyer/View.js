const CustomToolbar = ({ setFilterButtonEl }) => (
    <GridToolbarContainer>
      <GridToolbarFilterButton ref={setFilterButtonEl} />
    </GridToolbarContainer>
  );
  
  CustomToolbar.propTypes = {
    setFilterButtonEl: PropTypes.func.isRequired,
  };
  
  const ColorButton3 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[600],
    textTransform: "none",
    "&:hover": {
      backgroundColor: red[700],
    },
  }));
  
  const style = {
    boxShadow: 24,
    borderRadius: "0.5%",
    backgroundColor: "white",
    width: "1000px",
  };
  export default function ManageUserTable() {
    const rows = [
      {
        id: 1,
        col1: "Pasindu Lakmal",
        col2: "Farmer",
        col3: "Pasindu@gmail.com",
      },
      {
        id: 2,
        col1: "Supun Banuka",
        col2: "Buyer",
        col3: "pasindu.lakmal@gmail.com",
      },
      {
        id: 3,
        col1: "Piruna",
        col2: "Advertiser",
        col3: "pasindu.lakmal@gmail.com",
      },
      {
        id: 4,
        col1: "Lahiru",
        col2: "Charity",
        col3: "pasindu.lakmal@gmail.com",
      },
      {
        id: 5,
        col1: "Saman Kumara",
        col2: "Farmer",
        col3: "pasindu.lakmal@gmail.com",
      },
      {
        id: 6,
        col1: "Kusal Mendis",
        col2: "Buyer",
        col3: "pasindu.lakmal@gmail.com",
      },
    ];
  
    const columns = [
      {
        field: "col1",
        headerName: "User Name",
        headerClassName: "header-class-name",
        width: 150,
      },
      {
        field: "col2",
        headerName: "User Type",
        headerClassName: "header-class-name",
        width: 150,
      },
      {
        field: "col3",
        headerName: "Phone number",
        headerClassName: "header-class-name",
        width: 300,
      },
      {
        field: "col4",
        headerName: "Actions",
        headerClassName: "header-class-name",
        width: 400,
        align: "center",
        disableColumnMenu: true,
        sortable: false,
        renderCell: (params) => {
          // const onClick = (e) => {};
          // const thisRow: Record<string, GridCellValue> = {};
          // console.log(thisRow);
          const viewUserClickHandler = (e) => {
            console.log(params);
            console.log("hello on View");
          };
          const updateUserClickHandler = () => {
            console.log("hello on Update");
          };
          return (
            <Grid container spacing={0}>
              <Grid item xs={4}>
                <ViewUserModal onView={viewUserClickHandler} />
              </Grid>
              <Grid item xs={4}>
                <UpdateUserModal
                  userType={params.row.col2}
                  onUpdate={updateUserClickHandler}
                />
              </Grid>
              <Grid item xs={4}>
                <ColorButton3>Delete</ColorButton3>
              </Grid>
            </Grid>
          );
        },
      },
    ];
  
    const [filterButtonEl, setFilterButtonEl] = React.useState(null);
    return (
      <Box
        sx={{
          height: 600,
          width: 1000,
          align: "center",
        }}
      >
        <DataGrid
          disableSelectionOnClick
          components={{
            Toolbar: CustomToolbar,
          }}
          componentsProps={{
            panel: {
              anchorEl: filterButtonEl,
            },
            toolbar: {
              setFilterButtonEl,
            },
          }}
          rows={rows}
          columns={columns}
        />
      </Box>
    );
  }
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
  function BuyProductRight() {
      const [paymentType, setPaymentType] = useState('')
      const paymentTypeHandler = (payment_type) => {
          setPaymentType(payment_type);
      }
      return (
          <Box sx={{ bgcolor: "#fff", p: 3, pb: 5 }}>
              <Grid container>
                  <Grid item xs={12} sx={{ mb: 3 }}>
                      <Typography variant='h4'>Banana</Typography>
                  </Grid>
                  <Grid item xs={12}>
                      <div>
                          <Grid container spacing={2}>
                              <Grid item xs={12}>
                                  <BankDetailField
                                      fieldName="Seller"
                                      userDetail="Pasindu Lakmal"
                                  />
                              </Grid>
                              <Grid item xs={12}>
                                  <BankDetailField
                                      fieldName="Quantity"
                                      userDetail="10kg"
                                  />
                              </Grid>
                              <Grid item xs={12}>
                                  <BankDetailField
                                      fieldName="Unit Price"
                                      userDetail="100"
                                  />
                              </Grid>
                              <Grid item xs={12}>
                                  <BankDetailField
                                      fieldName="Price"
                                      userDetail="1000"
                                  />
                              </Grid>
                          </Grid>
                      </div>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 4 }}>
                      <div>
                          <Grid container spacing={4}>
                              <Grid item md={12} lg={6}>
                                  <TextField
                                      label="Amount"
                                      type="number"
                                  />
                              </Grid>
                              <Grid item md={12} lg={6}>
                                  <TextField
                                      label="Price"
                                      type="number"
                                      value={1000}
                                      readOnly
                                      disabled
                                  />
                              </Grid>
                              <Grid item xs={12}>
                                  <InputLabel>Select pick update: </InputLabel>
                                  <TextField
                                      type="date"
                                  />
                              </Grid>
                              <Grid item xs={8}>
                                  <Typography>
                                      Where you can buy this product ?
                                  </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                  <SellerDetailsContainer />
                              </Grid>
                              {/* <Grid item xs={6}>
                                  <FormControlLabel onClick={() => {paymentTypeHandler("cash")}} control={<Checkbox checked={paymentType === "cash"} />} label="Cash Payment" />
                              </Grid>
                              <Grid item xs={6}>
                                  <FormControlLabel onClick={() => {paymentTypeHandler("card")}} control={<Checkbox checked={paymentType === "card"} />} label="Credit/Debit Card" />
                              </Grid> */}
                              <Grid item xs={8}>
                                  <UpdatedButton variant="outlined" title="Contact Seller" />
                              </Grid>
                              <Grid item xs={4}>
                                  <UpdatedButton variant="contained" title="Send Request" />
                              </Grid>
                          </Grid>
                      </div>
                  </Grid>
              </Grid>
          </Box>
      )
  }
  function AddProductForm(props) {
      const style = {
          // position: 'absolute',
          // top: '50%',
          // left: '50%',
          // transform: 'translate(-50%, -50%)',
          width: props.width,
          // height: 505,
          bgcolor: 'background.paper',
          // overflow: "auto",
          border: "none",
          // boxShadow: 24,
          borderRadius: 5,
          p: props.padding,
      };
      // const [images, setImages] = useState([])
  
      // const setImagesHandler = (value) => {
      //   setImages(images);
      // }
      // const productImages = useSelector((state) => state.imageUpload.images);
      // console.log(productImages);
      let {
          value: productName,
          isValid: productNameIsValid,
          hasError: productNameHasError,
          error: productNameError,
          valueChangeHandler: productNameChangeHandler,
          inputBlurHandler: productNameBlurHandler,
      } = useInput((value) => {
          if (value.trim() === "") {
              return { inputIsValid: false, error: "Can't be Empty !" };
          }
          // else if (hasNumber(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained numbers !" };
          // } else if (hasSpecialChars(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained special chars !" };
          // } 
          else {
              return { inputIsValid: true, error: "" };
          }
      })
  
      let {
          value: productCategory,
          isValid: productCategoryIsValid,
          hasError: productCategoryHasError,
          error: productCategoryError,
          valueChangeHandler: productCategoryChangeHandler,
          inputBlurHandler: productCategoryBlurHandler,
      } = useInput((value) => {
          if (value === "") {
              return { inputIsValid: false, error: "Can't be Empty !" };
          }
          // else if (hasNumber(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained numbers !" };
          // } else if (hasSpecialChars(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained special chars !" };
          // } 
          else {
              return { inputIsValid: true, error: "" };
          }
      })
  
      let {
          value: weight,
          isValid: weightIsValid,
          hasError: weightHasError,
          error: weightError,
          valueChangeHandler: weightChangeHandler,
          inputBlurHandler: weightBlurHandler,
      } = useInput((value) => {
          if (value.trim() === "") {
              return { inputIsValid: false, error: "Can't be Empty !" };
          }
          // else if (hasNumber(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained numbers !" };
          // } else if (hasSpecialChars(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained special chars !" };
          // } 
          else {
              return { inputIsValid: true, error: "" };
          }
      })
  
      let {
          value: unitPrice,
          isValid: unitPriceIsValid,
          hasError: unitPriceHasError,
          error: unitPriceError,
          valueChangeHandler: unitPriceChangeHandler,
          inputBlurHandler: unitPriceBlurHandler,
      } = useInput((value) => {
          if (value.trim() === "") {
              return { inputIsValid: false, error: "Can't be Empty !" };
          }
          // else if (hasNumber(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained numbers !" };
          // } else if (hasSpecialChars(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained special chars !" };
          // } 
          else {
              return { inputIsValid: true, error: "" };
          }
      })
  
      let {
          value: manuDate,
          isValid: manuDateIsValid,
          hasError: manuDateHasError,
          error: manuDateError,
          valueChangeHandler: manuDateChangeHandler,
          inputBlurHandler: manuDateBlurHandler,
      } = useInput((value) => {
          if (value.trim() === "") {
              return { inputIsValid: false, error: "Can't be Empty !" };
          }
          // else if (hasNumber(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained numbers !" };
          // } else if (hasSpecialChars(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained special chars !" };
          // } 
          else {
              return { inputIsValid: true, error: "" };
          }
      })
  
      let {
          value: expireDate,
          isValid: expireDateIsValid,
          hasError: expireDateHasError,
          error: expireDateError,
          valueChangeHandler: expireDateChangeHandler,
          inputBlurHandler: expireDateBlurHandler,
      } = useInput((value) => {
          if (value.trim() === "") {
              return { inputIsValid: false, error: "Can't be Empty !" };
          }
          // else if (hasNumber(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained numbers !" };
          // } else if (hasSpecialChars(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained special chars !" };
          // } 
          else {
              return { inputIsValid: true, error: "" };
          }
      })
  
      let {
          value: fieldAddress,
          isValid: fieldAddressIsValid,
          hasError: fieldAddressHasError,
          error: fieldAddressError,
          valueChangeHandler: fieldAddressChangeHandler,
          inputBlurHandler: fieldAddressBlurHandler,
      } = useInput((value) => {
          if (value.trim() === "") {
              return { inputIsValid: false, error: "Can't be Empty !" };
          }
          // else if (hasNumber(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained numbers !" };
          // } else if (hasSpecialChars(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained special chars !" };
          // } 
          else {
              return { inputIsValid: true, error: "" };
          }
      })
  
  
      const [productImages, setProductImages] = useState([]);
      const [productImageUrls, setProductImageUrls] = useState([]);
      const [imageUploadingCount, setImageUploadingCount] = useState([]);
      console.log(productImages);
      const deleteImageHandler = () => {
          const images = productImages;
          setProductImages(images);
          console.log("deleted")
      }
  
      const [liveLocation, setLiveLocation] = useState(null);
      console.log(liveLocation);
      let formIsValid = false;
  
      if ((liveLocation !== null) && productNameIsValid && productCategoryIsValid && weightIsValid && unitPriceIsValid && manuDateIsValid && expireDateIsValid && fieldAddressIsValid && (productImages.length !== 0) && (props.productType === "sellProduct")) {
          formIsValid = true;
      } else if ((liveLocation !== null) && productNameIsValid && productCategoryIsValid && weightIsValid && manuDateIsValid && expireDateIsValid && fieldAddressIsValid && (productImages.length !== 0) && (props.productType === "donateProduct")) {
          formIsValid = true;
      }
  
      if (props.productName !== undefined) {
          productName = props.productName;
      }
      if (props.productCategory !== undefined) {
          productCategory = props.productCategory;
      }
      if (props.manuDate !== undefined) {
          manuDate = props.manuDate;
      }
      if (props.expireDate !== undefined) {
          expireDate = props.expireDate;
      }
      if (props.fieldAddress !== undefined) {
          fieldAddress = props.fieldAddress;
      }
      if (props.weight !== undefined) {
          weight = props.weight;
      }
  
      const onSubmitHandler = async (e) => {
          console.log(liveLocation);
  
          if (!formIsValid) {
              return;
          }
          e.preventDefault();
          let imagePath = [];
          let imageRef = [];
          let uploadTask = "";
          let imagUrls = [];
          console.log(productImages);
          let count = 0;
          for (var i = 0; i < productImages.length; i++) {
              imagePath.push(`images/products/${productImages[i].file.name + v4()}`);
              imageRef.push(ref(storage, imagePath[i]));
              uploadTask = uploadBytesResumable(imageRef[i], productImages[i].file);
              uploadTask.on('state_changed',
                  (snapshot) => {
                      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log("Uploading progress is " + progress);
                  },
                  (error) => {
                      Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: 'Something went wrong !',
                      })
                  },
                  () => {
                      console.log(uploadTask.snapshot);
                      getDownloadURL(uploadTask.snapshot.ref)
                          .then((downloadURL) => {
                              imagUrls.push(downloadURL);
                              setProductImageUrls(imagUrls)
                              console.log(imagUrls);
                          }
                          ).catch((error) => {
                              Swal.fire({
                                  icon: 'error',
                                  title: 'Oops...',
                                  text: 'Something went wrong !',
                              })
                          });
                  }
              )
              setImageUploadingCount(i + 1)
          }
  
          if (imageUploadingCount === productImages.length) {
              console.log(productImageUrls);
          }
  
          const data = {
              productName: productName,
              productCategory: productCategory,
              weight: weight,
              unitPrice: unitPrice,
              manuDate: manuDate,
              expireDate: expireDate,
              images: productImageUrls.map((image) => {
                  return image
              }),
              latitude: liveLocation.lat,
              longitude: liveLocation.lng,
          };
  
          // console.log(data);
          //api call here
      }
      return (
          <AddProductContext.Provider value={{
              productImages: productImages,
              liveLocation: liveLocation,
              setLiveLocation: setLiveLocation,
              setProductImages: setProductImages
          }}>
              <Box sx={style}>
                  <form onSubmit={onSubmitHandler} noValidate>
                      <Grid container sx={{ mb: 3 }}>
                          <Grid item xs={12}>
                              <CenteredBox align="center">
                                  <Typography variant="h5">Enter Product Details</Typography>
                              </CenteredBox>
                          </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                          <Grid item xs={12}>
                              <TextField
                                  fullWidth
                                  required
                                  label="Product Name"
                                  type="text"
                                  name="ProductName"
                                  value={productName}
                                  onChange={productNameChangeHandler}
                                  onBlur={productNameBlurHandler}
                                  error={productNameHasError}
                                  helperText={productNameHasError ? productNameError : ""}
                              />
                          </Grid>
                          <Grid item xs={12}>
                              <FormControl fullWidth required error={productCategoryHasError}>
                                  <InputLabel>Product Category</InputLabel>
                                  <Select
                                      label="Product Category"
                                      value={productCategory}
                                      onChange={productCategoryChangeHandler}
                                      onBlur={productCategoryBlurHandler}
                                  >
                                      <MenuItem value="">
                                          <em>None</em>
                                      </MenuItem>
                                      <MenuItem value={"Fruit"}>Fruit</MenuItem>
                                      <MenuItem value={"Vegetable"}>Vegetable</MenuItem>
                                  </Select>
                                  <FormHelperText>{productCategoryHasError ? productCategoryError : ""}</FormHelperText>
                              </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                              <FormControl variant="outlined" fullWidth required error={weightHasError}>
                                  <InputLabel htmlFor="outlined-adornment-password">Weight</InputLabel>
                                  <OutlinedInput
                                      type="number"
                                      value={weight}
                                      onChange={weightChangeHandler}
                                      onBlur={weightBlurHandler}
                                      endAdornment={
                                          <InputAdornment position="end">kg</InputAdornment>
                                      }
                                      label="Weight"
                                  />
                                  <FormHelperText>{weightHasError ? weightError : ""}</FormHelperText>
                              </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                              {props.productType === "sellProduct" &&
                                  <TextField
                                      fullWidth
                                      required
                                      label="Unit Price"
                                      type="number"
                                      name="unitPrice"
                                      value={unitPrice}
                                      onChange={unitPriceChangeHandler}
                                      onBlur={unitPriceBlurHandler}
                                      error={unitPriceHasError}
                                      helperText={unitPriceHasError ? unitPriceError : ""}
                                  />
                              }
                          </Grid>
                          <Grid item xs={6}>
                              <InputLabel htmlFor="outlined-adornment-password">Manufacture date*</InputLabel>
                              <FormControl variant="outlined" fullWidth required error={manuDateHasError}>
                                  <OutlinedInput
                                      type="date"
                                      value={manuDate}
                                      onChange={manuDateChangeHandler}
                                      onBlur={manuDateBlurHandler}
                                  // label="Manufacture date"
                                  />
                                  <FormHelperText>{manuDateHasError ? manuDateError : ""}</FormHelperText>
                              </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                              <InputLabel htmlFor="outlined-adornment-password">Expire Date*</InputLabel>
                              <FormControl variant="outlined" fullWidth required error={expireDateHasError}>
                                  <OutlinedInput
                                      type="date"
                                      value={expireDate}
                                      onChange={expireDateChangeHandler}
                                      onBlur={expireDateBlurHandler}
                                  // label="Manufacture date"
                                  />
                                  <FormHelperText>{expireDateHasError ? expireDateError : ""}</FormHelperText>
                              </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                  fullWidth
                                  required
                                  label="Field Address"
                                  type="text"
                                  name="fieldAddress"
                                  value={fieldAddress}
                                  onChange={fieldAddressChangeHandler}
                                  onBlur={fieldAddressBlurHandler}
                                  error={fieldAddressHasError}
                                  helperText={fieldAddressHasError ? fieldAddressError : ""}
                              />
                          </Grid>
                          <Grid item xs={12}>
                              <div>
                                  <Grid container spacing={2}>
                                      <Grid item xs={3}>
                                          <UploadProduct id={1} images={productImages} onDelete={deleteImageHandler} size={`${style.width / 4}px`} />
                                      </Grid>
                                      <Grid item xs={3}>
                                          <UploadProduct id={2} images={productImages} onDelete={deleteImageHandler} size={`${style.width / 4}px`} />
                                      </Grid>
                                      <Grid item xs={3}>
                                          <UploadProduct id={3} images={productImages} onDelete={deleteImageHandler} size={`${style.width / 4}px`} />
                                      </Grid>
                                      <Grid item xs={3}>
                                          <UploadProduct id={4} images={productImages} onDelete={deleteImageHandler} size={`${style.width / 4}px`} />
                                      </Grid>
                                  </Grid>
                              </div>
                          </Grid>
                          <Grid item xs={12}>
                              <SetLocationModal onSetLiveLocation={setLiveLocation} />
                          </Grid>
                          <Grid item xs={12}>
                              <FormControlLabel
                                  control={<Checkbox defaultChecked />}
                                  label={
                                      <p className={classes.text}>
                                          Make sure you have set your product location
                    </p>
                                  }
                              />
                          </Grid>
                          <Grid item xs={12}>
                              <Button
                                  fullWidth
                                  variant="contained"
                                  type="submit"
                                  style={{ textTransform: "none" }}
                                  disabled={!formIsValid}
                              >
                                  Submit
                </Button>
                          </Grid>
  
                      </Grid>
                  </form>
              </Box>
          </AddProductContext.Provider>
      )
  }
  
  const ColorButton1 = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText(green[600]),
      textTransform: "none",
      backgroundColor: green[600],
      "&:hover": {
          backgroundColor: green[700],
      },
  }));
  
  const ColorButton2 = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText(red[600]),
      backgroundColor: red[600],
      textTransform: "none",
      "&:hover": {
          backgroundColor: red[700],
      },
  }))
  
  //Filter panel
  const CustomToolbar = ({ setFilterButtonEl }) => (
      <GridToolbarContainer>
          <GridToolbarFilterButton ref={setFilterButtonEl} />
      </GridToolbarContainer>
  );
  
  CustomToolbar.propTypes = {
      setFilterButtonEl: PropTypes.func.isRequired,
  };
  
  export default function PendingRequestTable() {
      const rows = [
          {
              id: 1, col1: 'Hello', col2: 'World', col3: 'Hello', col4: 'World', col5: 'World'
          },
          {
              id: 2, col1: 'Hello', col2: 'World', col3: 'Hello', col4: 'World', col5: 'World'
          },
      ];
  
      const columns = [
          { field: 'col1', headerName: 'Product', width: 150 },
          { field: 'col2', headerName: 'Category', width: 150 },
          { field: 'col3', headerName: 'Total Amount', width: 150 },
          { field: 'col4', headerName: 'Date', width: 150 },
          { field: 'col5', headerName: 'Organization', width: 150 },
          {
              field: 'col6', headerName: 'Actions', width: 150, align: 'center',
              disableColumnMenu: true,
              sortable: false,
              renderCell: (params) => {
                  const onClick = (e) => {
  
                  };
  
                  return (
                      <>
                          <ColorButton1 style={{ marginRight: 3 }}>Accept</ColorButton1>
                          <ColorButton2>Cancel</ColorButton2>
                      </>);
              }
          },
      ];
  
      const [filterButtonEl, setFilterButtonEl] = React.useState(null);
      return (
          <Box
              sx={{
                  height: 400,
                  // width: "100%",
                  bgcolor: "#FFF"
              }}
          >
              <DataGrid
                  disableSelectionOnClick
                  components={{
                      Toolbar: CustomToolbar,
                  }}
                  componentsProps={{
                      panel: {
                          anchorEl: filterButtonEl,
                      },
                      toolbar: {
                          setFilterButtonEl,
                      },
                  }}
                  rows={rows}
                  columns={columns}
              />
          </Box>
      );
  }
  function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
          <div
              className={className}
              style={{ ...style, display: "block", background: "#007A31", borderRadius: 20 }}
              onClick={onClick}
          />
      );
  }
  
  function SamplePrevArrow(props) {
      const { className, style, onClick } = props;
      return (
          <div
              className={className}
              style={{ ...style, display: "block", background: "#007A31", borderRadius: 20 }}
              onClick={onClick}
          />
      );
  }
  
  function LandingPageCarousel() {
  
      var settings = {
          dots: true,
          infinite: false,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 0,
          responsive: [
              {
                  breakpoint: 1024,
                  settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      infinite: true,
                      dots: true
                  }
              },
              {
                  breakpoint: 600,
                  settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      initialSlide: 2
                  }
              },
              {
                  breakpoint: 480,
                  settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                  }
              }
          ],
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />
      };
  
      return (
          <Box sx={{ mb: 8 }}>
              <div>
                  <Slider {...settings}>
                      {itemData.map((item) => (
                          <Box key={item.key} sx={{ px: 1 }}>
                              <ProdcutCard item={item} />
                          </Box>
                      ))}
                  </Slider>
              </div>
          </Box>
      );
  }
  
  const itemData = [
      {
          key: "buy-product-1",
          id: "1",
          author: <Grid container>
              <Grid item xs={6}>
                  <Typography variant="body2">
                      Rs. 300
                  </Typography>
              </Grid>
              <Grid item xs={2}>
                  <CenteredBox align="right">
                      <Typography variant="body2">
                          2kg
                      </Typography>
                  </CenteredBox>
              </Grid>
          </Grid>,
          title: 'Mango',
          img: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
  
      },
      {
          img: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80',
          title: 'Banana',
          key: "buy-product-2",
          id: "2",
          author: <Grid container>
              <Grid item xs={6}>
                  <Typography variant="body2">
                      Rs. 300
                  </Typography>
              </Grid>
              <Grid item xs={2}>
                  <CenteredBox align="right">
                      <Typography variant="body2">
                          2kg
                      </Typography>
                  </CenteredBox>
              </Grid>
          </Grid>,
      },
      {
          img: 'https://images.unsplash.com/photo-1550828520-4cb496926fc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80',
          title: 'Pine Apple',
          key: "buy-product-3",
          id: "3",
          author: <Grid container>
              <Grid item xs={6}>
                  <Typography variant="body2">
                      Rs. 300
                  </Typography>
              </Grid>
              <Grid item xs={2}>
                  <CenteredBox align="right">
                      <Typography variant="body2">
                          2kg
                      </Typography>
                  </CenteredBox>
              </Grid>
          </Grid>,
      },
      {
          img: 'https://images.unsplash.com/photo-1449339854873-750e6913301b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          title: 'Avacado',
          key: "buy-product-4",
          id: "4",
          author: <Grid container>
              <Grid item xs={6}>
                  <Typography variant="body2">
                      Rs. 300
                  </Typography>
              </Grid>
              <Grid item xs={2}>
                  <CenteredBox align="right">
                      <Typography variant="body2">
                          2kg
                      </Typography>
                  </CenteredBox>
              </Grid>
          </Grid>,
      },
      {
          img: 'https://images.unsplash.com/photo-1449339854873-750e6913301b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          title: 'Avacado',
          key: "buy-product-5",
          id: "5",
          author: <Grid container>
              <Grid item xs={6}>
                  <Typography variant="body2">
                      Rs. 300
                  </Typography>
              </Grid>
              <Grid item xs={2}>
                  <CenteredBox align="right">
                      <Typography variant="body2">
                          2kg
                      </Typography>
                  </CenteredBox>
              </Grid>
          </Grid>,
      },
      {
          img: 'https://images.unsplash.com/photo-1449339854873-750e6913301b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          title: 'Avacado',
          key: "buy-product-6",
          id: "6",
          author: <Grid container>
              <Grid item xs={6}>
                  <Typography variant="body2">
                      Rs. 300
                  </Typography>
              </Grid>
              <Grid item xs={2}>
                  <CenteredBox align="right">
                      <Typography variant="body2">
                          2kg
                      </Typography>
                  </CenteredBox>
              </Grid>
          </Grid>,
      },
  ];

  const CustomToolbar = ({ setFilterButtonEl }) => (
    <GridToolbarContainer>
      <GridToolbarFilterButton ref={setFilterButtonEl} />
    </GridToolbarContainer>
  );
  
  CustomToolbar.propTypes = {
    setFilterButtonEl: PropTypes.func.isRequired,
  };
  
  const ColorButton3 = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[600]),
    backgroundColor: red[600],
    textTransform: "none",
    "&:hover": {
      backgroundColor: red[700],
    },
  }));
  
  const style = {
    boxShadow: 24,
    borderRadius: "0.5%",
    backgroundColor: "white",
    width: "1000px",
  };
  export default function ManageUserTable() {
    const rows = [
      {
        id: 1,
        col1: "Pasindu Lakmal",
        col2: "Farmer",
        col3: "Pasindu@gmail.com",
      },
      {
        id: 2,
        col1: "Supun Banuka",
        col2: "Buyer",
        col3: "pasindu.lakmal@gmail.com",
      },
      {
        id: 3,
        col1: "Piruna",
        col2: "Advertiser",
        col3: "pasindu.lakmal@gmail.com",
      },
      {
        id: 4,
        col1: "Lahiru",
        col2: "Charity",
        col3: "pasindu.lakmal@gmail.com",
      },
      {
        id: 5,
        col1: "Saman Kumara",
        col2: "Farmer",
        col3: "pasindu.lakmal@gmail.com",
      },
      {
        id: 6,
        col1: "Kusal Mendis",
        col2: "Buyer",
        col3: "pasindu.lakmal@gmail.com",
      },
    ];
  
    const columns = [
      {
        field: "col1",
        headerName: "User Name",
        headerClassName: "header-class-name",
        width: 150,
      },
      {
        field: "col2",
        headerName: "User Type",
        headerClassName: "header-class-name",
        width: 150,
      },
      {
        field: "col3",
        headerName: "Phone number",
        headerClassName: "header-class-name",
        width: 300,
      },
      {
        field: "col4",
        headerName: "Actions",
        headerClassName: "header-class-name",
        width: 400,
        align: "center",
        disableColumnMenu: true,
        sortable: false,
        renderCell: (params) => {
          // const onClick = (e) => {};
          // const thisRow: Record<string, GridCellValue> = {};
          // console.log(thisRow);
          const viewUserClickHandler = (e) => {
            console.log(params);
            console.log("hello on View");
          };
          const updateUserClickHandler = () => {
            console.log("hello on Update");
          };
          return (
            <Grid container spacing={0}>
              <Grid item xs={4}>
                <ViewUserModal onView={viewUserClickHandler} />
              </Grid>
              <Grid item xs={4}>
                <UpdateUserModal
                  userType={params.row.col2}
                  onUpdate={updateUserClickHandler}
                />
              </Grid>
              <Grid item xs={4}>
                <ColorButton3>Delete</ColorButton3>
              </Grid>
            </Grid>
          );
        },
      },
    ];
  
    const [filterButtonEl, setFilterButtonEl] = React.useState(null);
    return (
      <Box
        sx={{
          height: 600,
          width: 1000,
          align: "center",
        }}
      >
        <DataGrid
          disableSelectionOnClick
          components={{
            Toolbar: CustomToolbar,
          }}
          componentsProps={{
            panel: {
              anchorEl: filterButtonEl,
            },
            toolbar: {
              setFilterButtonEl,
            },
          }}
          rows={rows}
          columns={columns}
        />
      </Box>
    );
  }
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
  function BuyProductRight() {
      const [paymentType, setPaymentType] = useState('')
      const paymentTypeHandler = (payment_type) => {
          setPaymentType(payment_type);
      }
      return (
          <Box sx={{ bgcolor: "#fff", p: 3, pb: 5 }}>
              <Grid container>
                  <Grid item xs={12} sx={{ mb: 3 }}>
                      <Typography variant='h4'>Banana</Typography>
                  </Grid>
                  <Grid item xs={12}>
                      <div>
                          <Grid container spacing={2}>
                              <Grid item xs={12}>
                                  <BankDetailField
                                      fieldName="Seller"
                                      userDetail="Pasindu Lakmal"
                                  />
                              </Grid>
                              <Grid item xs={12}>
                                  <BankDetailField
                                      fieldName="Quantity"
                                      userDetail="10kg"
                                  />
                              </Grid>
                              <Grid item xs={12}>
                                  <BankDetailField
                                      fieldName="Unit Price"
                                      userDetail="100"
                                  />
                              </Grid>
                              <Grid item xs={12}>
                                  <BankDetailField
                                      fieldName="Price"
                                      userDetail="1000"
                                  />
                              </Grid>
                          </Grid>
                      </div>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: 4 }}>
                      <div>
                          <Grid container spacing={4}>
                              <Grid item md={12} lg={6}>
                                  <TextField
                                      label="Amount"
                                      type="number"
                                  />
                              </Grid>
                              <Grid item md={12} lg={6}>
                                  <TextField
                                      label="Price"
                                      type="number"
                                      value={1000}
                                      readOnly
                                      disabled
                                  />
                              </Grid>
                              <Grid item xs={12}>
                                  <InputLabel>Select pick update: </InputLabel>
                                  <TextField
                                      type="date"
                                  />
                              </Grid>
                              <Grid item xs={8}>
                                  <Typography>
                                      Where you can buy this product ?
                                  </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                  <SellerDetailsContainer />
                              </Grid>
                              {/* <Grid item xs={6}>
                                  <FormControlLabel onClick={() => {paymentTypeHandler("cash")}} control={<Checkbox checked={paymentType === "cash"} />} label="Cash Payment" />
                              </Grid>
                              <Grid item xs={6}>
                                  <FormControlLabel onClick={() => {paymentTypeHandler("card")}} control={<Checkbox checked={paymentType === "card"} />} label="Credit/Debit Card" />
                              </Grid> */}
                              <Grid item xs={8}>
                                  <UpdatedButton variant="outlined" title="Contact Seller" />
                              </Grid>
                              <Grid item xs={4}>
                                  <UpdatedButton variant="contained" title="Send Request" />
                              </Grid>
                          </Grid>
                      </div>
                  </Grid>
              </Grid>
          </Box>
      )
  }
  function AddProductForm(props) {
      const style = {
          // position: 'absolute',
          // top: '50%',
          // left: '50%',
          // transform: 'translate(-50%, -50%)',
          width: props.width,
          // height: 505,
          bgcolor: 'background.paper',
          // overflow: "auto",
          border: "none",
          // boxShadow: 24,
          borderRadius: 5,
          p: props.padding,
      };
      // const [images, setImages] = useState([])
  
      // const setImagesHandler = (value) => {
      //   setImages(images);
      // }
      // const productImages = useSelector((state) => state.imageUpload.images);
      // console.log(productImages);
      let {
          value: productName,
          isValid: productNameIsValid,
          hasError: productNameHasError,
          error: productNameError,
          valueChangeHandler: productNameChangeHandler,
          inputBlurHandler: productNameBlurHandler,
      } = useInput((value) => {
          if (value.trim() === "") {
              return { inputIsValid: false, error: "Can't be Empty !" };
          }
          // else if (hasNumber(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained numbers !" };
          // } else if (hasSpecialChars(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained special chars !" };
          // } 
          else {
              return { inputIsValid: true, error: "" };
          }
      })
  
      let {
          value: productCategory,
          isValid: productCategoryIsValid,
          hasError: productCategoryHasError,
          error: productCategoryError,
          valueChangeHandler: productCategoryChangeHandler,
          inputBlurHandler: productCategoryBlurHandler,
      } = useInput((value) => {
          if (value === "") {
              return { inputIsValid: false, error: "Can't be Empty !" };
          }
          // else if (hasNumber(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained numbers !" };
          // } else if (hasSpecialChars(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained special chars !" };
          // } 
          else {
              return { inputIsValid: true, error: "" };
          }
      })
  
      let {
          value: weight,
          isValid: weightIsValid,
          hasError: weightHasError,
          error: weightError,
          valueChangeHandler: weightChangeHandler,
          inputBlurHandler: weightBlurHandler,
      } = useInput((value) => {
          if (value.trim() === "") {
              return { inputIsValid: false, error: "Can't be Empty !" };
          }
          // else if (hasNumber(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained numbers !" };
          // } else if (hasSpecialChars(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained special chars !" };
          // } 
          else {
              return { inputIsValid: true, error: "" };
          }
      })
  
      let {
          value: unitPrice,
          isValid: unitPriceIsValid,
          hasError: unitPriceHasError,
          error: unitPriceError,
          valueChangeHandler: unitPriceChangeHandler,
          inputBlurHandler: unitPriceBlurHandler,
      } = useInput((value) => {
          if (value.trim() === "") {
              return { inputIsValid: false, error: "Can't be Empty !" };
          }
          // else if (hasNumber(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained numbers !" };
          // } else if (hasSpecialChars(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained special chars !" };
          // } 
          else {
              return { inputIsValid: true, error: "" };
          }
      })
  
      let {
          value: manuDate,
          isValid: manuDateIsValid,
          hasError: manuDateHasError,
          error: manuDateError,
          valueChangeHandler: manuDateChangeHandler,
          inputBlurHandler: manuDateBlurHandler,
      } = useInput((value) => {
          if (value.trim() === "") {
              return { inputIsValid: false, error: "Can't be Empty !" };
          }
          // else if (hasNumber(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained numbers !" };
          // } else if (hasSpecialChars(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained special chars !" };
          // } 
          else {
              return { inputIsValid: true, error: "" };
          }
      })
  
      let {
          value: expireDate,
          isValid: expireDateIsValid,
          hasError: expireDateHasError,
          error: expireDateError,
          valueChangeHandler: expireDateChangeHandler,
          inputBlurHandler: expireDateBlurHandler,
      } = useInput((value) => {
          if (value.trim() === "") {
              return { inputIsValid: false, error: "Can't be Empty !" };
          }
          // else if (hasNumber(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained numbers !" };
          // } else if (hasSpecialChars(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained special chars !" };
          // } 
          else {
              return { inputIsValid: true, error: "" };
          }
      })
  
      let {
          value: fieldAddress,
          isValid: fieldAddressIsValid,
          hasError: fieldAddressHasError,
          error: fieldAddressError,
          valueChangeHandler: fieldAddressChangeHandler,
          inputBlurHandler: fieldAddressBlurHandler,
      } = useInput((value) => {
          if (value.trim() === "") {
              return { inputIsValid: false, error: "Can't be Empty !" };
          }
          // else if (hasNumber(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained numbers !" };
          // } else if (hasSpecialChars(value.trim())) {
          //   return { inputIsValid: false, error: "Can't contained special chars !" };
          // } 
          else {
              return { inputIsValid: true, error: "" };
          }
      })
  
  
      const [productImages, setProductImages] = useState([]);
      const [productImageUrls, setProductImageUrls] = useState([]);
      const [imageUploadingCount, setImageUploadingCount] = useState([]);
      console.log(productImages);
      const deleteImageHandler = () => {
          const images = productImages;
          setProductImages(images);
          console.log("deleted")
      }
  
      const [liveLocation, setLiveLocation] = useState(null);
      console.log(liveLocation);
      let formIsValid = false;
  
      if ((liveLocation !== null) && productNameIsValid && productCategoryIsValid && weightIsValid && unitPriceIsValid && manuDateIsValid && expireDateIsValid && fieldAddressIsValid && (productImages.length !== 0) && (props.productType === "sellProduct")) {
          formIsValid = true;
      } else if ((liveLocation !== null) && productNameIsValid && productCategoryIsValid && weightIsValid && manuDateIsValid && expireDateIsValid && fieldAddressIsValid && (productImages.length !== 0) && (props.productType === "donateProduct")) {
          formIsValid = true;
      }
  
      if (props.productName !== undefined) {
          productName = props.productName;
      }
      if (props.productCategory !== undefined) {
          productCategory = props.productCategory;
      }
      if (props.manuDate !== undefined) {
          manuDate = props.manuDate;
      }
      if (props.expireDate !== undefined) {
          expireDate = props.expireDate;
      }
      if (props.fieldAddress !== undefined) {
          fieldAddress = props.fieldAddress;
      }
      if (props.weight !== undefined) {
          weight = props.weight;
      }
  
      const onSubmitHandler = async (e) => {
          console.log(liveLocation);
  
          if (!formIsValid) {
              return;
          }
          e.preventDefault();
          let imagePath = [];
          let imageRef = [];
          let uploadTask = "";
          let imagUrls = [];
          console.log(productImages);
          let count = 0;
          for (var i = 0; i < productImages.length; i++) {
              imagePath.push(`images/products/${productImages[i].file.name + v4()}`);
              imageRef.push(ref(storage, imagePath[i]));
              uploadTask = uploadBytesResumable(imageRef[i], productImages[i].file);
              uploadTask.on('state_changed',
                  (snapshot) => {
                      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log("Uploading progress is " + progress);
                  },
                  (error) => {
                      Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: 'Something went wrong !',
                      })
                  },
                  () => {
                      console.log(uploadTask.snapshot);
                      getDownloadURL(uploadTask.snapshot.ref)
                          .then((downloadURL) => {
                              imagUrls.push(downloadURL);
                              setProductImageUrls(imagUrls)
                              console.log(imagUrls);
                          }
                          ).catch((error) => {
                              Swal.fire({
                                  icon: 'error',
                                  title: 'Oops...',
                                  text: 'Something went wrong !',
                              })
                          });
                  }
              )
              setImageUploadingCount(i + 1)
          }
  
          if (imageUploadingCount === productImages.length) {
              console.log(productImageUrls);
          }
  
          const data = {
              productName: productName,
              productCategory: productCategory,
              weight: weight,
              unitPrice: unitPrice,
              manuDate: manuDate,
              expireDate: expireDate,
              images: productImageUrls.map((image) => {
                  return image
              }),
              latitude: liveLocation.lat,
              longitude: liveLocation.lng,
          };
  
          // console.log(data);
          //api call here
      }
      return (
          <AddProductContext.Provider value={{
              productImages: productImages,
              liveLocation: liveLocation,
              setLiveLocation: setLiveLocation,
              setProductImages: setProductImages
          }}>
              <Box sx={style}>
                  <form onSubmit={onSubmitHandler} noValidate>
                      <Grid container sx={{ mb: 3 }}>
                          <Grid item xs={12}>
                              <CenteredBox align="center">
                                  <Typography variant="h5">Enter Product Details</Typography>
                              </CenteredBox>
                          </Grid>
                      </Grid>
                      <Grid container spacing={3}>
                          <Grid item xs={12}>
                              <TextField
                                  fullWidth
                                  required
                                  label="Product Name"
                                  type="text"
                                  name="ProductName"
                                  value={productName}
                                  onChange={productNameChangeHandler}
                                  onBlur={productNameBlurHandler}
                                  error={productNameHasError}
                                  helperText={productNameHasError ? productNameError : ""}
                              />
                          </Grid>
                          <Grid item xs={12}>
                              <FormControl fullWidth required error={productCategoryHasError}>
                                  <InputLabel>Product Category</InputLabel>
                                  <Select
                                      label="Product Category"
                                      value={productCategory}
                                      onChange={productCategoryChangeHandler}
                                      onBlur={productCategoryBlurHandler}
                                  >
                                      <MenuItem value="">
                                          <em>None</em>
                                      </MenuItem>
                                      <MenuItem value={"Fruit"}>Fruit</MenuItem>
                                      <MenuItem value={"Vegetable"}>Vegetable</MenuItem>
                                  </Select>
                                  <FormHelperText>{productCategoryHasError ? productCategoryError : ""}</FormHelperText>
                              </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                              <FormControl variant="outlined" fullWidth required error={weightHasError}>
                                  <InputLabel htmlFor="outlined-adornment-password">Weight</InputLabel>
                                  <OutlinedInput
                                      type="number"
                                      value={weight}
                                      onChange={weightChangeHandler}
                                      onBlur={weightBlurHandler}
                                      endAdornment={
                                          <InputAdornment position="end">kg</InputAdornment>
                                      }
                                      label="Weight"
                                  />
                                  <FormHelperText>{weightHasError ? weightError : ""}</FormHelperText>
                              </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                              {props.productType === "sellProduct" &&
                                  <TextField
                                      fullWidth
                                      required
                                      label="Unit Price"
                                      type="number"
                                      name="unitPrice"
                                      value={unitPrice}
                                      onChange={unitPriceChangeHandler}
                                      onBlur={unitPriceBlurHandler}
                                      error={unitPriceHasError}
                                      helperText={unitPriceHasError ? unitPriceError : ""}
                                  />
                              }
                          </Grid>
                          <Grid item xs={6}>
                              <InputLabel htmlFor="outlined-adornment-password">Manufacture date*</InputLabel>
                              <FormControl variant="outlined" fullWidth required error={manuDateHasError}>
                                  <OutlinedInput
                                      type="date"
                                      value={manuDate}
                                      onChange={manuDateChangeHandler}
                                      onBlur={manuDateBlurHandler}
                                  // label="Manufacture date"
                                  />
                                  <FormHelperText>{manuDateHasError ? manuDateError : ""}</FormHelperText>
                              </FormControl>
                          </Grid>
                          <Grid item xs={6}>
                              <InputLabel htmlFor="outlined-adornment-password">Expire Date*</InputLabel>
                              <FormControl variant="outlined" fullWidth required error={expireDateHasError}>
                                  <OutlinedInput
                                      type="date"
                                      value={expireDate}
                                      onChange={expireDateChangeHandler}
                                      onBlur={expireDateBlurHandler}
                                  // label="Manufacture date"
                                  />
                                  <FormHelperText>{expireDateHasError ? expireDateError : ""}</FormHelperText>
                              </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                  fullWidth
                                  required
                                  label="Field Address"
                                  type="text"
                                  name="fieldAddress"
                                  value={fieldAddress}
                                  onChange={fieldAddressChangeHandler}
                                  onBlur={fieldAddressBlurHandler}
                                  error={fieldAddressHasError}
                                  helperText={fieldAddressHasError ? fieldAddressError : ""}
                              />
                          </Grid>
                          <Grid item xs={12}>
                              <div>
                                  <Grid container spacing={2}>
                                      <Grid item xs={3}>
                                          <UploadProduct id={1} images={productImages} onDelete={deleteImageHandler} size={`${style.width / 4}px`} />
                                      </Grid>
                                      <Grid item xs={3}>
                                          <UploadProduct id={2} images={productImages} onDelete={deleteImageHandler} size={`${style.width / 4}px`} />
                                      </Grid>
                                      <Grid item xs={3}>
                                          <UploadProduct id={3} images={productImages} onDelete={deleteImageHandler} size={`${style.width / 4}px`} />
                                      </Grid>
                                      <Grid item xs={3}>
                                          <UploadProduct id={4} images={productImages} onDelete={deleteImageHandler} size={`${style.width / 4}px`} />
                                      </Grid>
                                  </Grid>
                              </div>
                          </Grid>
                          <Grid item xs={12}>
                              <SetLocationModal onSetLiveLocation={setLiveLocation} />
                          </Grid>
                          <Grid item xs={12}>
                              <FormControlLabel
                                  control={<Checkbox defaultChecked />}
                                  label={
                                      <p className={classes.text}>
                                          Make sure you have set your product location
                    </p>
                                  }
                              />
                          </Grid>
                          <Grid item xs={12}>
                              <Button
                                  fullWidth
                                  variant="contained"
                                  type="submit"
                                  style={{ textTransform: "none" }}
                                  disabled={!formIsValid}
                              >
                                  Submit
                </Button>
                          </Grid>
  
                      </Grid>
                  </form>
              </Box>
          </AddProductContext.Provider>
      )
  }
  
  const ColorButton1 = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText(green[600]),
      textTransform: "none",
      backgroundColor: green[600],
      "&:hover": {
          backgroundColor: green[700],
      },
  }));
  
  const ColorButton2 = styled(Button)(({ theme }) => ({
      color: theme.palette.getContrastText(red[600]),
      backgroundColor: red[600],
      textTransform: "none",
      "&:hover": {
          backgroundColor: red[700],
      },
  }))
  
  //Filter panel
  const CustomToolbar = ({ setFilterButtonEl }) => (
      <GridToolbarContainer>
          <GridToolbarFilterButton ref={setFilterButtonEl} />
      </GridToolbarContainer>
  );
  
  CustomToolbar.propTypes = {
      setFilterButtonEl: PropTypes.func.isRequired,
  };
  
  export default function PendingRequestTable() {
      const rows = [
          {
              id: 1, col1: 'Hello', col2: 'World', col3: 'Hello', col4: 'World', col5: 'World'
          },
          {
              id: 2, col1: 'Hello', col2: 'World', col3: 'Hello', col4: 'World', col5: 'World'
          },
      ];
  
      const columns = [
          { field: 'col1', headerName: 'Product', width: 150 },
          { field: 'col2', headerName: 'Category', width: 150 },
          { field: 'col3', headerName: 'Total Amount', width: 150 },
          { field: 'col4', headerName: 'Date', width: 150 },
          { field: 'col5', headerName: 'Organization', width: 150 },
          {
              field: 'col6', headerName: 'Actions', width: 150, align: 'center',
              disableColumnMenu: true,
              sortable: false,
              renderCell: (params) => {
                  const onClick = (e) => {
  
                  };
  
                  return (
                      <>
                          <ColorButton1 style={{ marginRight: 3 }}>Accept</ColorButton1>
                          <ColorButton2>Cancel</ColorButton2>
                      </>);
              }
          },
      ];
  
      const [filterButtonEl, setFilterButtonEl] = React.useState(null);
      return (
          <Box
              sx={{
                  height: 400,
                  // width: "100%",
                  bgcolor: "#FFF"
              }}
          >
              <DataGrid
                  disableSelectionOnClick
                  components={{
                      Toolbar: CustomToolbar,
                  }}
                  componentsProps={{
                      panel: {
                          anchorEl: filterButtonEl,
                      },
                      toolbar: {
                          setFilterButtonEl,
                      },
                  }}
                  rows={rows}
                  columns={columns}
              />
          </Box>
      );
  }
  function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
          <div
              className={className}
              style={{ ...style, display: "block", background: "#007A31", borderRadius: 20 }}
              onClick={onClick}
          />
      );
  }
  
  function SamplePrevArrow(props) {
      const { className, style, onClick } = props;
      return (
          <div
              className={className}
              style={{ ...style, display: "block", background: "#007A31", borderRadius: 20 }}
              onClick={onClick}
          />
      );
  }
  
  function LandingPageCarousel() {
  
      var settings = {
          dots: true,
          infinite: false,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 0,
          responsive: [
              {
                  breakpoint: 1024,
                  settings: {
                      slidesToShow: 3,
                      slidesToScroll: 3,
                      infinite: true,
                      dots: true
                  }
              },
              {
                  breakpoint: 600,
                  settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      initialSlide: 2
                  }
              },
              {
                  breakpoint: 480,
                  settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1
                  }
              }
          ],
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />
      };
  
      return (
          <Box sx={{ mb: 8 }}>
              <div>
                  <Slider {...settings}>
                      {itemData.map((item) => (
                          <Box key={item.key} sx={{ px: 1 }}>
                              <ProdcutCard item={item} />
                          </Box>
                      ))}
                  </Slider>
              </div>
          </Box>
      );
  }
  
  const itemData = [
      {
          key: "buy-product-1",
          id: "1",
          author: <Grid container>
              <Grid item xs={6}>
                  <Typography variant="body2">
                      Rs. 300
                  </Typography>
              </Grid>
              <Grid item xs={2}>
                  <CenteredBox align="right">
                      <Typography variant="body2">
                          2kg
                      </Typography>
                  </CenteredBox>
              </Grid>
          </Grid>,
          title: 'Mango',
          img: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80',
  
      },
      {
          img: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80',
          title: 'Banana',
          key: "buy-product-2",
          id: "2",
          author: <Grid container>
              <Grid item xs={6}>
                  <Typography variant="body2">
                      Rs. 300
                  </Typography>
              </Grid>
              <Grid item xs={2}>
                  <CenteredBox align="right">
                      <Typography variant="body2">
                          2kg
                      </Typography>
                  </CenteredBox>
              </Grid>
          </Grid>,
      },
      {
          img: 'https://images.unsplash.com/photo-1550828520-4cb496926fc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80',
          title: 'Pine Apple',
          key: "buy-product-3",
          id: "3",
          author: <Grid container>
              <Grid item xs={6}>
                  <Typography variant="body2">
                      Rs. 300
                  </Typography>
              </Grid>
              <Grid item xs={2}>
                  <CenteredBox align="right">
                      <Typography variant="body2">
                          2kg
                      </Typography>
                  </CenteredBox>
              </Grid>
          </Grid>,
      },
      {
          img: 'https://images.unsplash.com/photo-1449339854873-750e6913301b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          title: 'Avacado',
          key: "buy-product-4",
          id: "4",
          author: <Grid container>
              <Grid item xs={6}>
                  <Typography variant="body2">
                      Rs. 300
                  </Typography>
              </Grid>
              <Grid item xs={2}>
                  <CenteredBox align="right">
                      <Typography variant="body2">
                          2kg
                      </Typography>
                  </CenteredBox>
              </Grid>
          </Grid>,
      },
      {
          img: 'https://images.unsplash.com/photo-1449339854873-750e6913301b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          title: 'Avacado',
          key: "buy-product-5",
          id: "5",
          author: <Grid container>
              <Grid item xs={6}>
                  <Typography variant="body2">
                      Rs. 300
                  </Typography>
              </Grid>
              <Grid item xs={2}>
                  <CenteredBox align="right">
                      <Typography variant="body2">
                          2kg
                      </Typography>
                  </CenteredBox>
              </Grid>
          </Grid>,
      },
      {
          img: 'https://images.unsplash.com/photo-1449339854873-750e6913301b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          title: 'Avacado',
          key: "buy-product-6",
          id: "6",
          author: <Grid container>
              <Grid item xs={6}>
                  <Typography variant="body2">
                      Rs. 300
                  </Typography>
              </Grid>
              <Grid item xs={2}>
                  <CenteredBox align="right">
                      <Typography variant="body2">
                          2kg
                      </Typography>
                  </CenteredBox>
              </Grid>
          </Grid>,
      },
  ];