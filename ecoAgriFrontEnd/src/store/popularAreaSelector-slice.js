import { createSlice } from "@reduxjs/toolkit";
import imageUploadSlice from "./uploadImage-slice";

const initialAreaState = {
    selectedAreas: []
}

const popularAreaSelectorSlice = createSlice({
    name: "popular-area",
    initialState: initialAreaState,
    reducers: {
        addArea(state, action) {
            const newArea = action.payload;
            const existingArea = state.selectedAreas.find((area) => area === newArea);
            if(!existingArea) {
                state.selectedAreas.push(newArea);
            } else {
                const index = state.selectedAreas.findIndex((area) => area === newArea);
                state.selectedAreas.splice(index, 1);
            }
        }
    }
});

export const propularAreaActions = popularAreaSelectorSlice.actions;

export default popularAreaSelectorSlice;
