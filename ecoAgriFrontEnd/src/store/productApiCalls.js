import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
  countProductStart,
  countProductSuccess,
  countProductFailure,
} from "./productSlice";

export const getProducts = async (dispatch, token) => {
  dispatch(getProductStart());
  try {
    const res = await userRequest.get("/products", {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    dispatch(getProductSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(getProductFailure());
    return 0;
  }
};

export const deleteProduct = async (id, dispatch, token) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch, token) => {
  dispatch(updateProductStart());
  try {
    // update
    const res = await userRequest.put(`/product/${id}`,product, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    console.log(res);
    dispatch(updateProductSuccess(res));
    return 1;
  } catch (err) {
    dispatch(updateProductFailure());
    return 0;
  }
};
export const addProduct = async (product, dispatch, token) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/product/save`,product, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    console.log(res);
    dispatch(addProductSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(addProductFailure());
    return 0;
  }
};
// export const countProduct = async (dispatch,token) => {
//   dispatch(countProductStart());
//   try {
//     const res = await userRequest.get(`/inventoryItem/count`);
//     console.log(res);
//     dispatch(countProductSuccess(res.data));
//     return 1;
//   } catch (err) {
//     dispatch(countProductFailure());
//     return 0;
//   }
// };
