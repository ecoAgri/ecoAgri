import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userTypeSelectorButtonSlice from "./userType-selector-slice";
import userReducer from "./userSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import imageUploadSlice from "./uploadImage-slice";
import popularAreaSelectorSlice from "./popularAreaSelector-slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  userTypeSelectorButton: userTypeSelectorButtonSlice.reducer,
  user: userReducer,
  imageUpload: imageUploadSlice.reducer,
  popularArea: popularAreaSelectorSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: {
//     userTypeSelectorButton: userTypeSelectorButtonSlice.reducer,
//     user: userReducer,
//   },
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

export default store;
