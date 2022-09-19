import React, { useState } from 'react'
import { Button, Checkbox, FilledInput, FormControl, FormControlLabel, FormHelperText, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system'
import CenteredBox from '../../ui/CenteredBox';
import classes from "../../ui/Form.module.css";
import useInput from "../../../hooks/use-input";
import { useSelector } from 'react-redux';
import UploadProduct from './UploadProduct';
import SetLocationModal from './SetLocationModal';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Swal from "sweetalert2";
import { storage } from '../../../Firebase';
import { v4 } from "uuid";
import { async } from '@firebase/util';

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
  const deleteImageHandler = () => {
    const images = productImages;
    setProductImages(images);
    console.log("deleted")
  }

  let formIsValid = false;

  if (productNameIsValid && productCategoryIsValid && weightIsValid && unitPriceIsValid && manuDateIsValid && expireDateIsValid && fieldAddressIsValid && (productImages.length !== 0) && (props.productType === "sellProduct")) {
    formIsValid = true;
  } else if (productNameIsValid && productCategoryIsValid && weightIsValid && manuDateIsValid && expireDateIsValid && fieldAddressIsValid && (productImages.length !== 0) && (props.productType === "donateProduct")) {
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
    console.log('hell')
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
    // const imagePath = `images/profile/${profileImageData.name + v4()}`
    // const uploadTask = uploadBytesResumable(imageRef, profileImageData);
    // if (!formIsValid) {
    //   return;
    // }
    // const data = {
    //   productName: productName,
    //   productCategory: productCategory,
    //   weight: weight,
    //   unitPrice: unitPrice,
    //   manuDate: manuDate,
    //   expireDate: expireDate,
    //   images: productImageUrls.map((image) => {
    //     return image
    //   })
    // };

    // console.log(data);
    //api call here
  }
  return (
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
                  <UploadProduct images={productImages} onDelete={deleteImageHandler} onImageChange={setProductImages} size={`${style.width / 4}px`} />
                </Grid>
                <Grid item xs={3}>
                  <UploadProduct images={productImages} onDelete={deleteImageHandler} onImageChange={setProductImages} size={`${style.width / 4}px`} />
                </Grid>
                <Grid item xs={3}>
                  <UploadProduct images={productImages} onDelete={deleteImageHandler} onImageChange={setProductImages} size={`${style.width / 4}px`} />
                </Grid>
                <Grid item xs={3}>
                  <UploadProduct images={productImages} onDelete={deleteImageHandler} onImageChange={setProductImages} size={`${style.width / 4}px`} />
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12}>
            <SetLocationModal />
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
            // disabled={!formIsValid}
            >
              Submit
            </Button>
          </Grid>

        </Grid>
      </form>
    </Box>

  )
}

export default AddProductForm