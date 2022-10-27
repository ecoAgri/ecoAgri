import { createSlice } from "@reduxjs/toolkit";

export const SelectLocationSlice = createSlice({
  name: "selectLocation",
  initialState: {
    locations: [],
    count: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    //GET ALL
    getSelectLocationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getSelectLocationSuccess: (state, action) => {
      state.isFetching = false;
      state.locations = action.payload;
    },
    getSelectLocationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //DELETE
    deleteSelectLocationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteSelectLocationSuccess: (state, action) => {
      state.isFetching = false;
      state.locations.splice(
        state.locations.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteSelectLocationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UPDATE
    updateSelectLocationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateSelectLocationSuccess: (state, action) => {
      state.isFetching = false;
      state.locations[
        state.locations.findIndex((item) => item.id === action.payload.id)
      ] = action.payload.locations;
    },
    updateSelectLocationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //ADD
    addSelectLocationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addSelectLocationSuccess: (state, action) => {
      state.isFetching = false;
      state.SelectLocations.push(action.payload);
    },
    addSelectLocationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //COUNT
    countSelectLocationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    countSelectLocationSuccess: (state, action) => {
      state.isFetching = false;
      state.count = action.payload;
    },
    countSelectLocationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getSelectLocationStart,
  getSelectLocationSuccess,
  getSelectLocationFailure,
  deleteSelectLocationStart,
  deleteSelectLocationSuccess,
  deleteSelectLocationFailure,
  updateSelectLocationStart,
  updateSelectLocationSuccess,
  updateSelectLocationFailure,
  addSelectLocationStart,
  addSelectLocationSuccess,
  addSelectLocationFailure,
  countSelectLocationStart,
  countSelectLocationSuccess,
  countSelectLocationFailure,
} = SelectLocationSlice.actions;

export default SelectLocationSlice.reducer;
