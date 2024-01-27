"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.logout = exports.login = void 0;
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const jwtToken_1 = __importDefault(require("../utils/jwtToken"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const studentModel_1 = __importDefault(require("../models/studentModel"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const crypto_1 = __importDefault(require("crypto"));
exports.login = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, hash } = req.body;
    if (!hash) {
        return next(new errorHandler_1.default("Device not supported", 400));
    }
    // checking if user has given password and email both
    if (!email || !password) {
        return next(new errorHandler_1.default("Please Enter Email & Password", 400));
    }
    let user;
    const admin = yield adminModel_1.default.findOne({ email }).select("+password");
    if (admin) {
        user = admin;
    }
    else {
        const student = yield studentModel_1.default.findOne({ email }).select("+password");
        if (!student) {
            return next(new errorHandler_1.default("Invalid email or password", 401));
        }
        user = student;
    }
    //@ts-ignore
    const isPasswordMatched = yield user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new errorHandler_1.default("Invalid email or password", 401));
    }
    user.deviceHash = hash;
    yield user.save({ validateBeforeSave: false });
    (0, jwtToken_1.default)(user, 200, res);
}));
exports.logout = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
}));
exports.forgotPassword = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    const admin = yield adminModel_1.default.findOne({ email: req.body.email });
    if (admin) {
        user = admin;
    }
    else {
        const student = yield studentModel_1.default.findOne({ email: req.body.email });
        if (!student) {
            return next(new errorHandler_1.default("User not found", 404));
        }
        user = student;
    }
    // Get ResetPassword Token
    //@ts-ignore
    const resetToken = user.getResetPasswordToken();
    yield user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
    try {
        yield (0, sendEmail_1.default)({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    }
    catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        yield user.save({ validateBeforeSave: false });
        return next(new errorHandler_1.default(error.message, 500));
    }
}));
exports.resetPassword = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // creating token hash
    const resetPasswordToken = crypto_1.default
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    let user;
    const admin = yield adminModel_1.default.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if (admin) {
        user = admin;
    }
    else {
        const student = yield studentModel_1.default.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });
        if (!student) {
            return next(new errorHandler_1.default("Reset Password Token is invalid or has been expired", 400));
        }
        user = student;
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new errorHandler_1.default("Password does not match confirmPassword", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    yield user.save();
    (0, jwtToken_1.default)(user, 200, res);
}));
