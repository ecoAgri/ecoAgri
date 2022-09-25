import { createSlice } from "@reduxjs/toolkit";

export const PaymentSlice = createSlice({
  name: "payment",
  initialState: {
    payments: [],
    count: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getPaymentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getPaymentSuccess: (state, action) => {
      state.isFetching = false;
      state.payments = action.payload;
    },
    getPaymentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deletePaymentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deletePaymentSuccess: (state, action) => {
      state.isFetching = false;
      state.payments.splice(
        state.payments.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deletePaymentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updatePaymentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updatePaymentSuccess: (state, action) => {
      state.isFetching = false;
      state.payments[
        state.payments.findIndex((item) => item.id === action.payload.id)
      ] = action.payload.payment;
    },
    updatePaymentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addPaymentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addPaymentSuccess: (state, action) => {
      state.isFetching = false;
      state.payments.push(action.payload);
    },
    addPaymentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //COUNT
    countPaymentStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    countPaymentSuccess: (state, action) => {
      state.isFetching = false;
      state.count = action.payload;
    },
    countPaymentFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
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
} = PaymentSlice.actions;

export default PaymentSlice.reducer;
