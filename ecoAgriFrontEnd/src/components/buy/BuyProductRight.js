import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import React, { useState } from "react";
import BankDetailField from "../farmer/sell/BankDetailField";
import UpdatedButton from "../ui/UpdatedButton";
import SellerDetailsContainer from "./SellerDetailsContainer";
import { addOrder } from "../../store/orderApiCalls";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function BuyProductRight(props) {
  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState(0);
  const [pickDate, setPickDate] = useState("");
  const [price, setPrice] = useState(props.productDetail.unitPrice);
  let token = useSelector((state) => state.user.token);
  let userId = useSelector((state) => state.user.currentUser.id);
  let user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const paymentTypeHandler = (payment_type) => {
    setPaymentType(payment_type);
  };
  console.log(props);

  const createOrder = async () => {
    const data = {
      userId: userId,
      productId: props.productId,
      quantity: amount,
      unitPrice: props.productDetail.unitPrice,
      productName: props.productDetail.productName,
      productCategory: props.productDetail.productCategory,
      location: props.productDetail.location,
      priceUOM: props.productDetail.priceUOM,
      weightUOM: props.productDetail.weightUOM,
      sellerId: props.productDetail.sellerId,
      sellerName: props.productDetail.sellerName,
      username:user.username,
      sellerContact: props.productDetail.sellerContact,
      totalPrice:price,
      manuDate: "2022-05-14",
      expireDate: pickDate,
      fieldAddress: "789",
      status: "Pending",
      isAccept: false,
    };
    const afterPlaceOrder = await addOrder(data, dispatch, token);
    if (afterPlaceOrder) {
      Swal.fire({
        icon: "success",
        title: "Order Success!",
        showConfirmButton: true,
      });
    } else {
      Swal.fire({
        icon: "error",
        text: "Order Unsuccess!",
        showConfirmButton: true,
      });
    }
  };

  return (
    <Box sx={{ bgcolor: "#fff", p: 3, pb: 5 }}>
      <Grid container>
        <Grid item xs={12} sx={{ mb: 3 }}>
          <Typography variant="h4">
            {props.productDetail.productName}
          </Typography>
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
                  userDetail={props.productDetail.weight}
                  unit="kg"
                />
              </Grid>
              <Grid item xs={12}>
                <BankDetailField
                  fieldName="Unit Price"
                  userDetail={props.productDetail.unitPrice}
                  unit="Rs"
                />
              </Grid>
              <Grid item xs={12}>
                <BankDetailField
                  fieldName="Price"
                  userDetail={price}
                  unit="Rs"
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
        {/* <form onSubmit={createOrder}> */}
        <Grid item xs={12} sx={{ mt: 4 }}>
          <div>
            <Grid container spacing={4}>
              <Grid item md={12} lg={6}>
                <TextField
                  label="Amount"
                  type="number"
                  // value={amount}
                  onChange={(e) => {
                    console.log(e.target.value);
                    if (e.target.value > props.productDetail.weight) {
                      e.target.value = amount;
                      Swal.fire({
                        icon: "error",
                        text: "Maximum quantity level exceed!",
                        showConfirmButton: true,
                      });
                    } else {
                      setAmount(e.target.value);
                      setPrice(amount * props.productDetail.unitPrice);
                    }
                  }}
                />
              </Grid>
              <Grid item md={12} lg={6}>
                <TextField
                  required
                  label="Price"
                  type="number"
                  value={props.productDetail.unitPrice}
                  readOnly
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Select pick update: </InputLabel>
                <TextField
                  type="date"
                  onChange={(e) => {
                    console.log(e.target.value);
                    setPickDate(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={8}>
                <Typography>Where you can buy this product ?</Typography>
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
                <UpdatedButton
                  variant="contained"
                  title="Send Request"
                  onClick={createOrder}
                />
              </Grid>
            </Grid>
          </div>
        </Grid>
        {/* </form> */}
      </Grid>
    </Box>
  );
}

export default BuyProductRight;
