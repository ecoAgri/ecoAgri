import express from "express";
// import { Register } from "../controllers/registerController.js";
import { Login, Register } from "../controllers/authController.js";
import { getUsers,getUser,updateUser,deleteUser } from "../controllers/userDetailsController.js";
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


router.get("/users/admin", [verifyToken, isAdmin], adminBoard);
router.get(
  "/users/moderator",
  [verifyToken, isModerator],

  moderatorBoard
);
//no need this .. logout handled by redux
router.delete("/logout", Logout);

export default router;
