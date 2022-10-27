import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import CenteredBox from "../../ui/CenteredBox";
import classes from "../../ui/Form.module.css";
import useInput from "../../../hooks/use-input";
import UploadProduct from "./UploadProduct";
import SetLocationModal from "./SetLocationModal";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Swal from "sweetalert2";
import { storage } from "../../../Firebase";
import { v4 } from "uuid";
import { async } from "@firebase/util";
import AddProductContext from "../../../context/AddProduct-context";
import { addProduct, updateProduct } from "../../../store/productApiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import PlaceSelector from "../../registraion/PlaceSelector";
import DistrictService from "../../../services/DistrictService";

function AddProductForm(props) {
  const navigate = useNavigate();
  const style = {
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    width: props.width,
    // height: 505,
    bgcolor: "background.paper",
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
    setValue: productSetValue,
    isValid: productNameIsValid,
    hasError: productNameHasError,
    error: productNameError,
    valueChangeHandler: productNameChangeHandler,
    inputBlurHandler: productNameBlurHandler,
    reset: productNameResetHandler,
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
  });

  let {
    value: productCategory,
    setValue: productCategorySetValue,
    isValid: productCategoryIsValid,
    hasError: productCategoryHasError,
    error: productCategoryError,
    valueChangeHandler: productCategoryChangeHandler,
    inputBlurHandler: productCategoryBlurHandler,
    reset: productCategoryResetHandler,
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
  });

  let {
    value: weight,
    setValue: weightSetValue,
    isValid: weightIsValid,
    hasError: weightHasError,
    error: weightError,
    valueChangeHandler: weightChangeHandler,
    inputBlurHandler: weightBlurHandler,
    reset: weightResetHandler,
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
  });

  let {
    value: unitPrice,
    setValue: unitPriceSetValue,
    isValid: unitPriceIsValid,
    hasError: unitPriceHasError,
    error: unitPriceError,
    valueChangeHandler: unitPriceChangeHandler,
    inputBlurHandler: unitPriceBlurHandler,
    reset: unitPriceResetHandler,
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
  });

  let {
    value: manuDate,
    setValue: manuDateSetValue,
    isValid: manuDateIsValid,
    hasError: manuDateHasError,
    error: manuDateError,
    valueChangeHandler: manuDateChangeHandler,
    inputBlurHandler: manuDateBlurHandler,
    reset: manuDateResetHandler,
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
  });

  let {
    value: expireDate,
    setValue: expireDateSetValue,
    isValid: expireDateIsValid,
    hasError: expireDateHasError,
    error: expireDateError,
    valueChangeHandler: expireDateChangeHandler,
    inputBlurHandler: expireDateBlurHandler,
    reset: expireDateResetHandler,
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
  });

  let {
    value: fieldAddress,
    setValue: fieldAddressSetValue,
    isValid: fieldAddressIsValid,
    hasError: fieldAddressHasError,
    error: fieldAddressError,
    valueChangeHandler: fieldAddressChangeHandler,
    inputBlurHandler: fieldAddressBlurHandler,
    reset: fieldAddressResetHandler,
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
  });

  const {
    value: town,
    setValue: townSetValue,
    isValid: townIsValid,
    hasError: townHasError,
    error: townError,
    valueChangeHandler: townChangeHandler,
    inputBlurHandler: townBlurHandler,
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
  });

  const {
    value: city,
    setValue: citySetValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    error: cityError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
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
  });
  const resetForm = () => {
    productNameResetHandler();
    productCategoryResetHandler();
    weightResetHandler();
    unitPriceResetHandler();
    manuDateResetHandler();
    expireDateResetHandler();
    fieldAddressResetHandler();
  };

  const [productImages, setProductImages] = useState([]);
  const [productImageUrls, setProductImageUrls] = useState([]);
  const [imageUploadingCount, setImageUploadingCount] = useState([]);

  const user = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  console.log(productImages);
  const deleteImageHandler = () => {
    const images = productImages;
    setProductImages(images);
    console.log("deleted");
  };

  const [liveLocation, setLiveLocation] = useState(null);
  const [checked, setChecked] = useState(false);
  const locationSetHandler = (event) => {
    setChecked(event.target.checked);
  };
  console.log(liveLocation);
  let formIsValid = false;

  if (
    liveLocation !== null &&
    productNameIsValid &&
    productCategoryIsValid &&
    weightIsValid &&
    unitPriceIsValid &&
    manuDateIsValid &&
    expireDateIsValid &&
    fieldAddressIsValid &&
    cityIsValid &&
    townIsValid &&
    productImages.length !== 0 &&
    props.productType === "sellProduct" &&
    checked
  ) {
    formIsValid = true;
  } else if (
    liveLocation !== null &&
    productNameIsValid &&
    productCategoryIsValid &&
    weightIsValid &&
    manuDateIsValid &&
    expireDateIsValid &&
    fieldAddressIsValid &&
    cityIsValid &&
    townIsValid &&
    productImages.length !== 0 &&
    props.productType === "donateProduct" &&
    checked
  ) {
    formIsValid = true;
  }
  useEffect(() => {
    if (props.productName !== undefined) {
      productSetValue(props.productName);
    }
    if (props.productCategory !== undefined) {
      productCategorySetValue(props.productCategory);
    }
    if (props.manuDate !== undefined) {
      manuDateSetValue(props.manuDate);
    }
    if (props.expireDate !== undefined) {
      expireDateSetValue(props.expireDate);
    }
    if (props.fieldAddress !== undefined) {
      fieldAddressSetValue(props.fieldAddress);
    }
    // console.log(props.weight)
    if (props.weight !== undefined) {
      weightSetValue(props.weight);
    }
    if (props.city !== undefined) {
      citySetValue(props.city);
    }
    if (props.town !== undefined) {
      townSetValue(props.town);
    }
    if (props.unitPrice !== undefined) {
      unitPriceSetValue(props.unitPrice);
    }
  }, []);

  console.log(productImages);
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
    const data = {
      productName: productName,
      productCategory: productCategory,
      weight: weight,
      unitPrice: props.productType === "sellProduct" ? unitPrice : 0,
      fieldAddress: fieldAddress,
      manuDate: manuDate,
      expireDate: expireDate,
      status: "Pending",
      isAccept: true,
      location: town,
      district: city,
      latitude: liveLocation.lat,
      longitude: liveLocation.lng,
      isDonate: props.productType === "sellProduct" ? false : true,
      priceUOM: "Rs.",
      sellerId: user.id,
      sellerName: user.username,
      sellerContact: user.phone_number,
      weightUOM: "Kg",
      image1: productImages.length >= 1 ? productImages[0].url : null,
      image2: productImages.length >= 2 ? productImages[1].url : null,
      image3: productImages.length >= 3 ? productImages[2].url : null,
      image4: productImages.length >= 4 ? productImages[3].url : null,

      // images: productImageUrls.map((image) => {
      //   return image
      // })
    };
    if (props.formType != "update") {
      const productDataSave = addProduct(data, dispatch, token);
      if (productDataSave) {
        resetForm();
        Swal.fire({
          icon: "success",
          title: "Product Save Successful!",
          showConfirmButton: true,
        }).then(() => {
          navigate("/sell");
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "Product Save Unsuccess!",
          showConfirmButton: true,
        });
      }
    } else {
      // id, product, dispatch, token
      const productDataUpdate = updateProduct(props.id, data, dispatch, token);
      if (productDataUpdate) {
        resetForm();
        // Swal.fire({
        //   icon: "success",
        //   title: "Product Update Successful!",
        //   showConfirmButton: true,
        // }).then(() => {
        //   navigate("/sell");
        // });
      } else {
        Swal.fire({
          icon: "error",
          text: "Product Update Unsuccess!",
          showConfirmButton: true,
        });
      }
    }
  };
  const districtPlaces = [];
  let cityPlaces = [];
  DistrictService.map((place) => districtPlaces.push(place.district));
  // console.log()
  DistrictService.map((place) => {
    if (city === place.district) {
      cityPlaces = place.cities;
    }
  });
  return (
    <AddProductContext.Provider
      value={{
        productImages: productImages,
        liveLocation: liveLocation,
        setLiveLocation: setLiveLocation,
        setProductImages: setProductImages,
      }}
    >
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
                  <MenuItem value={"Fruits"}>Fruit</MenuItem>
                  <MenuItem value={"Vegetable"}>Vegetable</MenuItem>
                </Select>
                <FormHelperText>
                  {productCategoryHasError ? productCategoryError : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl
                variant="outlined"
                fullWidth
                required
                error={weightHasError}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Weight
                </InputLabel>
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
                <FormHelperText>
                  {weightHasError ? weightError : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              {props.productType === "sellProduct" && (
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
              )}
            </Grid>
            <Grid item xs={6}>
              <InputLabel htmlFor="outlined-adornment-password">
                Manufacture date*
              </InputLabel>
              <FormControl
                variant="outlined"
                fullWidth
                required
                error={manuDateHasError}
              >
                <OutlinedInput
                  type="date"
                  value={manuDate}
                  onChange={manuDateChangeHandler}
                  onBlur={manuDateBlurHandler}
                  // label="Manufacture date"
                />
                <FormHelperText>
                  {manuDateHasError ? manuDateError : ""}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <InputLabel htmlFor="outlined-adornment-password">
                Expire Date*
              </InputLabel>
              <FormControl
                variant="outlined"
                fullWidth
                required
                error={expireDateHasError}
              >
                <OutlinedInput
                  type="date"
                  value={expireDate}
                  onChange={expireDateChangeHandler}
                  onBlur={expireDateBlurHandler}
                  // label="Manufacture date"
                />
                <FormHelperText>
                  {expireDateHasError ? expireDateError : ""}
                </FormHelperText>
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
            <Grid item xs={6}>
              <PlaceSelector
                label="District"
                value={city}
                onChange={cityChangeHandler}
                onBlur={cityBlurHandler}
                cities={districtPlaces}
                hasError={cityHasError}
                error={cityError}
              />
            </Grid>
            <Grid item xs={6}>
              <PlaceSelector
                label="City"
                value={town}
                onChange={townChangeHandler}
                onBlur={townBlurHandler}
                cities={cityPlaces}
                disabled={city === ""}
                hasError={townHasError}
                error={townError}
              />
            </Grid>
            <Grid item xs={12}>
              <div>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <UploadProduct
                      id={1}
                      images={productImages}
                      onDelete={deleteImageHandler}
                      size={`${style.width / 4}px`}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <UploadProduct
                      id={2}
                      images={productImages}
                      onDelete={deleteImageHandler}
                      size={`${style.width / 4}px`}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <UploadProduct
                      id={3}
                      images={productImages}
                      onDelete={deleteImageHandler}
                      size={`${style.width / 4}px`}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <UploadProduct
                      id={4}
                      images={productImages}
                      onDelete={deleteImageHandler}
                      size={`${style.width / 4}px`}
                    />
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12}>
              <SetLocationModal onSetLiveLocation={setLiveLocation} />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox checked={checked} onChange={locationSetHandler} />
                }
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
  );
}

export default AddProductForm;
