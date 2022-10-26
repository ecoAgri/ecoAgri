import { publicRequest, userRequest } from "../requestMethods";
import {
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
    getOrderIdSuccess,
} from "./orderSlice";

export const saveAmount = async (dispatch, amount,quantity,productId,id) => {
  dispatch(getAmountSuccess(amount));
  dispatch(getQuantitySuccess(quantity));
  dispatch(getProductIdSuccess(productId));
  dispatch(getOrderIdSuccess(id));
};

export const getOrders = async (dispatch, token) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get("/orders", {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    dispatch(getOrderSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(getOrderFailure());
    return 0;
  }
};

export const deleteOrder = async (id, dispatch, token) => {
  dispatch(deleteOrderStart());
  try {
    const res = await userRequest.delete(`/order/${id}`, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    dispatch(deleteOrderSuccess(id));
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};

export const updateOrder = async (id, Order, dispatch, token) => {
  dispatch(updateOrderStart());
  try {
    // update
    const res = await userRequest.put(`/order/${id}`,Order, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    console.log(res);
    dispatch(updateOrderSuccess({ id, res }));
    // dispatch(updateOrderSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(updateOrderFailure());
    return 0;
  }
};
export const addOrder = async (Order, dispatch, token) => {
  dispatch(addOrderStart());
  try {
    const res = await userRequest.post(`/order/save`,Order, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    console.log(res);
    dispatch(addOrderSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(addOrderFailure());
    return 0;
  }
};
// export const countOrder = async (dispatch,token) => {
//   dispatch(countOrderStart());
//   try {
//     const res = await userRequest.get(`/inventoryItem/count`);
//     console.log(res);
//     dispatch(countOrderSuccess(res.data));
//     return 1;
//   } catch (err) {
//     dispatch(countOrderFailure());
//     return 0;
//   }
// };
