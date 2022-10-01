import { createSlice } from "@reduxjs/toolkit";

const initialUserTypeSelectorButtonState = {
  selectedSignupButton: "", //userType
  beforeClickBackButton: "",
};
const userTypeSelectorButtonSlice = createSlice({
  name: "userTypeSelector-button",
  initialState: initialUserTypeSelectorButtonState,
  reducers: {
    setSelectedSignupButton(state, action) {
      state.selectedSignupButton = action.payload;
    },
    setBeforeClickBackButton(state, action) {
      state.beforeClickBackButton = action.payload;
    },
  },
});

export const userTypeSelectorButtonActions =
  userTypeSelectorButtonSlice.actions;

export default userTypeSelectorButtonSlice;
