import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./Payment.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";
import { updateProduct } from "../../../store/productApiCalls";
import { updateOrder } from "../../../store/orderApiCalls";

const stripePromise = loadStripe(
  "pk_test_51LQvEKAjPRkUStMYeszYDlKAWx1thKzD8UU92RgiQMeTsHUGozDB2rrN0Nm8nVuCXefDo5t8WCkAcHXkBhoTdFWx00Eg83KkA1"
);

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  //   const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser.id);
  const token = useSelector((state) => state.user.token);
  const amount = useSelector((state) => state.order.totalAmount);
  const weight = useSelector((state) => state.order.totalQuantity);
  const productId = useSelector((state) => state.order.productId);
  const orderId = useSelector((state) => state.order.orderId);
  const [date, setDate] = useState("");
  const [clientSecretPay, setClientSecretPay] = useState("");
  const [allShow, setAllShow] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (stripe, elements) => async () => {
    const cardElement = elements.getElement(CardElement);
    console.log(amount);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);

      // ... SEND to your API server to process payment intent
      const response = await fetch(
        "http://localhost:5000/api/payments/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount * 100,
            currency: "usd",
          }),
        }
      );
      console.log(response);
      const { clientSecret, error } = await response.json();
      console.log(clientSecret);
      // console.log(error);
      setClientSecretPay(clientSecret);
      createPaymentDetails(clientSecret);
      //   createOrderDetails();
    }
  };

  const createPaymentDetails = async (clientSecret) => {
    var today = new Date();

    var dateNew =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    setDate(dateNew);
    try {
      let response = await fetch(`http://localhost:5000/api/payment/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: amount,
          clientSecret: 123,
          shipping: 25.36,
          status:"Success",
          UserID: user,
          isSuccess: true,
        }),
      });
      let json = await response.json();

      const productStatus = await updateProduct(productId,{weight:weight},dispatch, token);
      const orderStatus = await updateOrder(orderId, {status:"Completed",isAccept:true}, dispatch, token);

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
  };

  return (
    <div className="paymentContainer">
      <h1 className="paymentHeader">Payment</h1>
      <div className="subPaymentContainer">
        <CardElement />
      </div>
      <button
        className="paymentButton"
        onClick={handleSubmit(stripe, elements)}
      >
        Pay
      </button>
    </div>
  );
};

export default PaymentForm;
