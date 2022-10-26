import { publicRequest, userRequest } from "../requestMethods";
import {
    getArticleStart,
    getArticleSuccess,
    getArticleFailure,
    deleteArticleStart,
    deleteArticleSuccess,
    deleteArticleFailure,
    updateArticleStart,
    updateArticleSuccess,
    updateArticleFailure,
    addArticleStart,
    addArticleSuccess,
    addArticleFailure,
    countArticleStart,
    countArticleSuccess,
    countArticleFailure,
} from "./articleSlice";

export const getArticles = async (dispatch, token) => {
  dispatch(getArticleStart());
  try {
    const res = await userRequest.get("/articles", {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    dispatch(getArticleSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(getArticleFailure());
    return 0;
  }
};

export const deleteArticle = async (id, dispatch, token) => {
  dispatch(deleteArticleStart());
  try {
    const res = await userRequest.delete(`/article/${id}`, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    dispatch(deleteArticleSuccess(id));
  } catch (err) {
    dispatch(deleteArticleFailure());
  }
};

export const updateArticle = async (id, Article, dispatch, token) => {
  dispatch(updateArticleStart());
  try {
    // update
    const res = await userRequest.put(`/article/${id}`,Article, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    console.log(res);
    dispatch(updateArticleSuccess({ id, Article }));
    return 1;
  } catch (err) {
    dispatch(updateArticleFailure());
    return 0;
  }
};
export const addArticle = async (Article, dispatch, token) => {
  dispatch(addArticleStart());
  try {
    const res = await userRequest.post(`/article/save`,Article, {
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });
    console.log(res);
    dispatch(addArticleSuccess(res.data));
    return 1;
  } catch (err) {
    dispatch(addArticleFailure());
    return 0;
  }
};
// export const countArticle = async (dispatch,token) => {
//   dispatch(countArticleStart());
//   try {
//     const res = await userRequest.get(`/inventoryItem/count`);
//     console.log(res);
//     dispatch(countArticleSuccess(res.data));
//     return 1;
//   } catch (err) {
//     dispatch(countArticleFailure());
//     return 0;
//   }
// };
