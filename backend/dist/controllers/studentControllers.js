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
exports.isPresent = exports.getCounts = void 0;
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const attendanceModel_1 = __importDefault(require("../models/attendanceModel"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
// redis
exports.getCounts = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const studentId = req.user._id;
    // await redis.set("hello", "world");
    // const cashedValue = await redis.get();
    const totalAttendanceDays = yield attendanceModel_1.default.countDocuments({
        student: studentId,
    });
    const presentDays = yield attendanceModel_1.default.countDocuments({
        student: studentId,
        status: true,
    });
    const absentDays = totalAttendanceDays - presentDays;
    res.status(200).json({
        success: true,
        totalAttendanceDays,
        presentDays,
        absentDays,
    });
}));
exports.isPresent = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const studentId = req.user._id;
    const date = req.body;
    if (!date) {
        return next(new errorHandler_1.default("Please provide date", 400));
    }
    const attendanceRecord = yield attendanceModel_1.default.findOne({
        student: studentId,
        date: date,
    });
    let success, isPresent;
    if (attendanceRecord) {
        success = true;
        if (attendanceRecord.status) {
            isPresent = true;
        }
        else {
            isPresent = false;
        }
    }
    else {
        success = false;
    }
    res.status(200).json({
        success: success,
        isPresent: isPresent,
    });
}));
