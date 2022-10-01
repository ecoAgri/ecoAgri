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
      alert("User registration Success!");
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
    window.location.href = "http://localhost:3000/dashboard";
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    const res = await userRequest.delete(`/user/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const updateUser = async (id, User, dispatch) => {
  dispatch(updateUserStart());
  try {
    // update
    const res = await userRequest.put(`/user/${id}`);
    dispatch(updateUserSuccess({ id, User }));
  } catch (err) {
    dispatch(updateUserFailure());
  }
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


