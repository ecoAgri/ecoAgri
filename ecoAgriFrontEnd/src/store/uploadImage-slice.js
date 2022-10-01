import { createSlice } from "@reduxjs/toolkit";

const initialImageUploadState = {
    images: [], //userType
};
const imageUploadSlice = createSlice({
    name: "imageUpload",
    initialState: initialImageUploadState,
    reducers: {
        addImage(state, action) {
            const newImage = action.payload;
            const existingBookmark = state.images.find(
                (image) => image === newImage
            );
            if (!existingBookmark) {
                state.images.push(newImage);
            } else {
                const index = state.images.findIndex(image => image === newImage);
                state.images.splice(index, 1);
            }
        },
        addImages(state, action) {
            state.images = action.payload;
        }
    },
});

export const imageUploadActions = imageUploadSlice.actions;

export default imageUploadSlice;