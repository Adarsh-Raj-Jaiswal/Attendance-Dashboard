import express from "express";
import {
  day,
  getAllStudents,
  getCounts,
  search,
} from "../controllers/adminControllers";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth";

const router = express.Router();

router
  .route("/admin/counts")
  .get(isAuthenticatedUser, authorizeRoles("Admin"), getCounts);
router
  .route("/admin/students")
  .get(isAuthenticatedUser, authorizeRoles("Admin"), getAllStudents);
router
  .route("/admin/search")
  .post(isAuthenticatedUser, authorizeRoles("Admin"), search);

router
  .route("/admin/day")
  .get(isAuthenticatedUser, authorizeRoles("Admin"), day);
export default router;
