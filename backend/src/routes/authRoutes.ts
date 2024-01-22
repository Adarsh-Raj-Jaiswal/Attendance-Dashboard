import express from "express";
import {
  login,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/authControllers";
const router = express.Router();

router.route("/login").post(login); // device id add krna hai
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
export default router;
