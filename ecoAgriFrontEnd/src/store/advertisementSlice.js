import { createSlice } from "@reduxjs/toolkit";

export const AdvertisementSlice = createSlice({
  name: "advertisement",
  initialState: {
    advertisements: [],
    count: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getAdvertisementStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getAdvertisementSuccess: (state, action) => {
      state.isFetching = false;
      state.advertisements = action.payload;
    },
    getAdvertisementFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteAdvertisementStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteAdvertisementSuccess: (state, action) => {
      state.isFetching = false;
      state.advertisements.splice(
        state.advertisements.findIndex((item) => item.id === action.payload),
        1
      );
    },
    deleteAdvertisementFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateAdvertisementStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateAdvertisementSuccess: (state, action) => {
      state.isFetching = false;
      state.advertisements[
        state.advertisements.findIndex((item) => item.id === action.payload.id)
      ] = action.payload.advertisement;
    },
    updateAdvertisementFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addAdvertisementStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addAdvertisementSuccess: (state, action) => {
      state.isFetching = false;
      state.advertisements.push(action.payload);
    },
    addAdvertisementFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //COUNT
    countAdvertisementStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    countAdvertisementSuccess: (state, action) => {
      state.isFetching = false;
      state.count = action.payload;
    },
    countAdvertisementFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getAdvertisementStart,
  getAdvertisementSuccess,
  getAdvertisementFailure,
  deleteAdvertisementStart,
  deleteAdvertisementSuccess,
  deleteAdvertisementFailure,
  updateAdvertisementStart,
  updateAdvertisementSuccess,
  updateAdvertisementFailure,
  addAdvertisementStart,
  addAdvertisementSuccess,
  addAdvertisementFailure,
  countAdvertisementStart,
  countAdvertisementSuccess,
  countAdvertisementFailure,
} = AdvertisementSlice.actions;

export default AdvertisementSlice.reducer;
