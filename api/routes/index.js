import express from "express";
// import { Register } from "../controllers/registerController.js";
import { Login, Register } from "../controllers/authController.js";
import { getUsers,getUser,updateUser,deleteUser } from "../controllers/userDetailsController.js";
import { saveProduct,getProducts,getProduct,updateProduct,deleteProduct } from "../controllers/productDetailController.js";
import { savePayment, getPayment, getPayments, updatePayment, deletePayment, paymentIntent } from "../controllers/paymentController.js";
import { saveOrder, getOrder, getOrders, updateOrder, deleteOrder } from "../controllers/orderController.js";
import { saveArticle, getArticle, getArticles, updateArticle, deleteArticle } from "../controllers/articleController.js";
import { saveAdvertisement, getAdvertisement, getAdvertisements, updateAdvertisement, deleteAdvertisement } from "../controllers/advertisementController.js";
import { Logout } from "../controllers/logoutController.js";
import {
  verifyToken,
  isAdmin,
  isModerator,
  checkDuplicateUsernameOrEmail,
} from "../middleware/verifyToken.js";
import {
  adminBoard,
  moderatorBoard,
} from "../controllers/dashboardsController.js";
import { useValidator } from "../middleware/validateInputs.js";
import { validate } from "../middleware/validateInputs.js";

import { check } from "express-validator";
import { validationResult } from "express-validator";

const router = express.Router();
//[checkDuplicateUsernameOrEmail]
// router.post("/register", validate, useValidator);

router.post("/register", [checkDuplicateUsernameOrEmail], Register);
router.post("/login", Login);

router.get("/users/all", getUsers);
router.get("/users", [verifyToken], getUsers);
router.get("/user/:id", [verifyToken], getUser);
router.put("/user/:id", [verifyToken], updateUser);
router.delete("/user/:id", [verifyToken], deleteUser);

router.get("/products/all", getProducts);
router.post("/product/save",[verifyToken], saveProduct);
router.get("/products", [verifyToken], getProducts);
router.get("/product/:id", [verifyToken], getProduct);
router.put("/product/:id", [verifyToken], updateProduct);
router.delete("/product/:id", [verifyToken], deleteProduct);

router.get("/payments/all", getPayments);
router.post("/payments/create-payment-intent", paymentIntent);
router.post("/payment/save",[verifyToken], savePayment);
router.get("/payments", [verifyToken], getPayments);
router.get("/payment/:id", [verifyToken], getPayment);
router.put("/payment/:id", [verifyToken], updatePayment);
router.delete("/payment/:id", [verifyToken], deletePayment);

router.get("/orders/all", getOrders);
router.post("/order/save",[verifyToken], saveOrder);
router.get("/orders", [verifyToken], getOrders);
router.get("/order/:id", [verifyToken], getOrder);
router.put("/order/:id", [verifyToken], updateOrder);
router.delete("/order/:id", [verifyToken], deleteOrder);

router.get("/articles/all", getArticles);
router.post("/article/save",[verifyToken], saveArticle);
router.get("/articles", [verifyToken], getArticles);
router.get("/article/:id", [verifyToken], getArticle);
router.put("/article/:id", [verifyToken], updateArticle);
router.delete("/article/:id", [verifyToken], deleteArticle);

router.get("/advertisements/all", getAdvertisement);
router.post("/advertisement/save",[verifyToken], saveAdvertisement);
router.get("/advertisements", [verifyToken], getAdvertisements);
router.get("/advertisement/:id", [verifyToken], getAdvertisement);
router.put("/advertisement/:id", [verifyToken], updateAdvertisement);
router.delete("/advertisement/:id", [verifyToken], deleteAdvertisement);

router.get("/users/admin", [verifyToken, isAdmin], adminBoard);
router.get(
  "/users/moderator",
  [verifyToken, isModerator],

  moderatorBoard
);
//no need this .. logout handled by redux
router.delete("/logout", Logout);

export default router;
