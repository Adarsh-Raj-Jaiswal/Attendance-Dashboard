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
exports.scanQR = exports.getQR = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const attendanceModel_1 = __importDefault(require("../models/attendanceModel"));
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
exports.getQR = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield adminModel_1.default.findOne();
    if (!admin)
        return next(new errorHandler_1.default("admin login kro", 400));
    //@ts-ignore
    const hash = admin.getQRHash();
    yield admin.save({ validateBeforeSave: false });
    res.json({
        success: true,
        hash,
    });
}));
exports.scanQR = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const studentId = req.user._id;
    const { hash } = req.body;
    if (!hash) {
        return next(new errorHandler_1.default("Qr not scanned unable to get the hash", 400));
    }
    const admin = yield adminModel_1.default.findOne();
    if (hash !== (admin === null || admin === void 0 ? void 0 : admin.qrHash)) {
        return next(new errorHandler_1.default("This QR code has expired", 400));
    }
    const attendance = yield attendanceModel_1.default.findOne({ studentId });
    if (attendance === null || attendance === void 0 ? void 0 : attendance.status) {
        return res.json({
            success: false,
        });
    }
    yield attendanceModel_1.default.create({
        student: studentId,
        status: true,
    });
    res.json({
        success: true,
    });
}));
