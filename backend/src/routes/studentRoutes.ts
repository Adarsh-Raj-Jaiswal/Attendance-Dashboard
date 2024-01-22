import express from "express";
import { date, getCounts } from "../controllers/studentControllers";
import { isAuthenticatedUser } from "../middlewares/auth";

const router = express.Router();

router.route("/student/counts").get(isAuthenticatedUser, getCounts);
router.route("/student/date").post(isAuthenticatedUser, date);

export default router;
