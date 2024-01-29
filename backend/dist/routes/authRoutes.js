"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = require("../controllers/authControllers");
const router = express_1.default.Router();
router.route("/login").post(authControllers_1.login);
router.route("/logout").get(authControllers_1.logout);
router.route("/password/forgot").post(authControllers_1.forgotPassword);
router.route("/password/reset").put(authControllers_1.resetPassword);
exports.default = router;
