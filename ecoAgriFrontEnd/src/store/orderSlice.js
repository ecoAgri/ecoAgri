import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    count: null,
    totalAmount: 0,
    totalQuantity: 0,
    productId: null,
    orderId: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
    },
    getOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders.splice(
        state.orders.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deleteOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateOrderSuccess: (state, action) => {
      state.isFetching = false;
      // state.orders = action.payload;
      state.orders[
        state.orders.findIndex((item) => item.id === action.payload.id)
      ] = action.payload.res;
    },
    updateOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders.push(action.payload);
    },
    addOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //COUNT
    countOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    countOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.count = action.payload;
    },
    countOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    getAmountSuccess: (state, action) => {
      state.isFetching = false;
      state.totalAmount = action.payload;
    },
    getQuantitySuccess: (state, action) => {
      state.isFetching = false;
      state.totalQuantity = action.payload;
    },
    getProductIdSuccess: (state, action) => {
      state.isFetching = false;
      state.productId = action.payload;
    },
    getOrderIdSuccess: (state, action) => {
      state.isFetching = false;
      state.orderId = action.payload;
    },
  },
});

export const {
  getOrderStart,
  getOrderSuccess,
  getOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
  updateOrderFailure,
  addOrderStart,
  addOrderSuccess,
  addOrderFailure,
  countOrderStart,
  countOrderSuccess,
  countOrderFailure,
  getAmountSuccess,
  getQuantitySuccess,
  getProductIdSuccess,
  getOrderIdSuccess
} = orderSlice.actions;

export default orderSlice.reducer;
