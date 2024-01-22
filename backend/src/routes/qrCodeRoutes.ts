import express from "express";
import { getQR, scanQR } from "../controllers/qrCodeControllers";
import { isAuthenticatedUser } from "../middlewares/auth";

const router = express.Router();

router.route("/attendance/qr").get(isAuthenticatedUser, getQR);
router.route("/attendance/scan").post(isAuthenticatedUser, scanQR);

export default router;
