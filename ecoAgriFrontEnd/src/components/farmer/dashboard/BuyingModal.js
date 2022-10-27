import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography } from "@mui/material";
import CenteredBox from "../../ui/CenteredBox";
import { useNavigate } from "react-router";
import { saveAmount, updateOrder } from "../../../store/orderApiCalls";
import Swal from "sweetalert2";
import { updateProduct } from "../../../store/productApiCalls";
// import Carousel from '../ui/Carousel/Carousel';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  pr: 0,
};

export default function BuyingModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.token);
  const selectOneProduct = useSelector((state) =>
    state.product.products.filter((x) => x.id == props.productId)
  );
  const userType = user.userrole;
  const dispatch = useDispatch();
  console.log(props);

  const cashPayment = async() =>{
    try {
      let response = await fetch(`http://localhost:5000/api/payment/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: props.amount,
          clientSecret: 123,
          shipping: 25.36,
          status:"Cash",
          UserID: user.id,
          isSuccess: false,
        }),
      });
      let json = await response.json();

      const productStatus = await updateProduct(props.productId, {weight:selectOneProduct[0].weight - props.quantity}, dispatch, token);
      const orderStatus = await updateOrder(props.id, {status:"Completed"}, dispatch, token);

      if(productStatus && orderStatus){
        console.log("Success");
        navigate("/buyer/buy-details");
      }else{
        console.log("Unsuccess")
      }

      console.log(json);
      Swal.fire({
        icon: "success",
        title: "Payment Success!",
        showConfirmButton: true,
      });
      // alert("Update");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: "Payment Unsuccess!",
        showConfirmButton: true,
      });
    } 
  }

  const onlinePayment = async () => {
    alert("Online Payment");
    console.log(props.amount);
    console.log(props.quantity);
    console.log(selectOneProduct);
    console.log(selectOneProduct[0].weight);
    console.log(selectOneProduct[0].weight - props.quantity);

    if (selectOneProduct[0].weight - props.quantity < 0) {
      Swal.fire({
        icon: "error",
        text: "Can't purchase this item. Amount exceeded!",
        showConfirmButton: true,
      });
    } else {
      saveAmount(
        dispatch,
        props.amount,
        selectOneProduct[0].weight - props.quantity,
        props.productId,
        props.id
      );

      // const updateSuccess = await updateProduct(props.productId, {weight:selectOneProduct[0].weight - props.quantity}, dispatch, token);
      // if(updateSuccess){
      //   console.log("Success");
      // }
      navigate("/buyer/payment", { Amount: props.amount });
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{ textTransform: "none", borderRadius: 20 }}
        variant="contained"
      >
        Buy
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CenteredBox align="center">
                <Typography variant="h5">Select your payment method</Typography>
              </CenteredBox>
            </Grid>
            <Grid item xs={12}>
              <CenteredBox align="center">
                <Button style={{ textTransform: "none" }} variant="outlined" onClick={cashPayment}>
                  Cash Payment
                </Button>
              </CenteredBox>
            </Grid>
            <Grid item xs={12}>
              <CenteredBox align="center">
                <Button
                  style={{ textTransform: "none" }}
                  variant="contained"
                  onClick={onlinePayment}
                >
                  Card Payment
                </Button>
              </CenteredBox>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
