import { publicRequest, userRequest } from "../requestMethods";
import {
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
} from "./advertisementSlice";

export const getAdvertisements = async (dispatch, token) => {
  dispatch(getAdvertisementStart());
  try {
    const res = await userRequest.get("/advertisements", {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    dispatch(getAdvertisementSuccess(res.data));
  } catch (err) {
    dispatch(getAdvertisementFailure());
  }
};

export const deleteAdvertisement = async (id, dispatch, token) => {
  dispatch(deleteAdvertisementStart());
  try {
    const res = await userRequest.delete(`/advertisement/${id}`, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    dispatch(deleteAdvertisementSuccess(id));
  } catch (err) {
    dispatch(deleteAdvertisementFailure());
  }
};

export const updateAdvertisement = async (id, Advertisement, dispatch, token) => {
  dispatch(updateAdvertisementStart());
  try {
    // update
    const res = await userRequest.put(`/advertisement/${id}`,Advertisement, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    console.log(res);
    dispatch(updateAdvertisementSuccess({ id, Advertisement }));
    return 1;
  } catch (err) {
    dispatch(updateAdvertisementFailure());
    return 0;
  }
};
export const addAdvertisement = async (Advertisement, dispatch, token) => {
  dispatch(addAdvertisementStart());
  try {
    const res = await userRequest.post(`/advertisement/save`,Advertisement, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    console.log(res);
    dispatch(addAdvertisementSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(addAdvertisementFailure());
    return 0;
  }
};
// export const countAdvertisement = async (dispatch,token) => {
//   dispatch(countAdvertisementStart());
//   try {
//     const res = await userRequest.get(`/inventoryItem/count`);
//     console.log(res);
//     dispatch(countAdvertisementSuccess(res.data));
//     return 1;
//   } catch (err) {
//     dispatch(countAdvertisementFailure());
//     return 0;
//   }
// };
