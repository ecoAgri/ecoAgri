import { publicRequest, userRequest } from "../requestMethods";
import {
    getPaymentStart,
    getPaymentSuccess,
    getPaymentFailure,
    deletePaymentStart,
    deletePaymentSuccess,
    deletePaymentFailure,
    updatePaymentStart,
    updatePaymentSuccess,
    updatePaymentFailure,
    addPaymentStart,
    addPaymentSuccess,
    addPaymentFailure,
    countPaymentStart,
    countPaymentSuccess,
    countPaymentFailure,
} from "./paymentSlice";

export const getPayments = async (dispatch, token) => {
  dispatch(getPaymentStart());
  try {
    const res = await userRequest.get("/payments", {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    dispatch(getPaymentSuccess(res.data));
  } catch (err) {
    dispatch(getPaymentFailure());
  }
};

export const deletePayment = async (id, dispatch, token) => {
  dispatch(deletePaymentStart());
  try {
    const res = await userRequest.delete(`/payment/${id}`, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    dispatch(deletePaymentSuccess(id));
  } catch (err) {
    dispatch(deletePaymentFailure());
  }
};

export const updatePayment = async (id, Payment, dispatch, token) => {
  dispatch(updatePaymentStart());
  try {
    // update
    const res = await userRequest.put(`/payment/${id}`,Payment, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    console.log(res);
    dispatch(updatePaymentSuccess({ id, Payment }));
    return 1;
  } catch (err) {
    dispatch(updatePaymentFailure());
    return 0;
  }
};
export const addPayment = async (Payment, dispatch, token) => {
  dispatch(addPaymentStart());
  try {
    const res = await userRequest.post(`/payment/save`,Payment, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    console.log(res);
    dispatch(addPaymentSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(addPaymentFailure());
    return 0;
  }
};
// export const countPayment = async (dispatch,token) => {
//   dispatch(countPaymentStart());
//   try {
//     const res = await userRequest.get(`/inventoryItem/count`);
//     console.log(res);
//     dispatch(countPaymentSuccess(res.data));
//     return 1;
//   } catch (err) {
//     dispatch(countPaymentFailure());
//     return 0;
//   }
// };
