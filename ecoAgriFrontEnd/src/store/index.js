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
import productReducer from "./productSlice";
import orderReducer from "./orderSlice";
import paymentReducer from "./paymentSlice";
import articleReducer from "./articleSlice";
import advertisementReducer from "./advertisementSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  userTypeSelectorButton: userTypeSelectorButtonSlice.reducer,
  user: userReducer,
  product: productReducer,
  order: orderReducer,
  payment: paymentReducer,
  advertisement: advertisementReducer,
  article: articleReducer,
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
