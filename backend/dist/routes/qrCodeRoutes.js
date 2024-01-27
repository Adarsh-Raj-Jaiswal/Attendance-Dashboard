"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const qrCodeControllers_1 = require("../controllers/qrCodeControllers");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.route("/get").get(auth_1.isAuthenticatedUser, (0, auth_1.authorizeRoles)("Admin"), qrCodeControllers_1.getQR);
router
    .route("/scan")
    .post(auth_1.isAuthenticatedUser, (0, auth_1.authorizeRoles)("Student"), qrCodeControllers_1.scanQR);
exports.default = router;
