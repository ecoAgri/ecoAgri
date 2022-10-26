import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  getUserStart,
  getUserSuccess,
  getUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  addUserStart,
  addUserSuccess,
  addUserFailure,
} from "./userSlice";
import { publicRequest, userRequest } from "../requestMethods";
// import { useNavigate } from "react-router";

export const register = async (User) => {
  // dispatch(addUserStart());
  try {
    const res = await publicRequest.post(`/register`, User);
    console.log(res);
    // alert("User registration Success!");
    return 1;
    //   dispatch(addUserSuccess(res.data));
  } catch (err) {
    alert("User registration Failed!");
    return 0;
    //   dispatch(addUserFailure());
  }
};

export const login = async (dispatch, user) => {
  // const userData = JSON.stringify(user);
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/login", user);
    console.log(res);
    dispatch(loginSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(loginFailure());
    return 0;
  }
};

export const getUsers = async (dispatch,token) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/users",{
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    dispatch(getUserSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(getUserFailure());
    return 0;
  }
};

export const deleteUser = async (id, dispatch,token) => {
  dispatch(deleteUserStart());
  try {
    const res = await userRequest.delete(`/user/${id}`,{
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const updateUser = async (id, User, dispatch, token) => {
  dispatch(updateUserStart());
  try {
    // update
    const res = await userRequest.put(`/user/${id}`,{
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    dispatch(updateUserSuccess({ id, User }));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

export const logOutUser = async (dispatch) => {
  dispatch(logout());
};

// export const addUserWithAuth = async (User, dispatch) => {
//   dispatch(addUserStart());
//   try {
//     const res = await userRequest.post(`/user/save`, User);
//     dispatch(addUserSuccess(res.data));
//   } catch (err) {
//     dispatch(addUserFailure());
//   }
// };


