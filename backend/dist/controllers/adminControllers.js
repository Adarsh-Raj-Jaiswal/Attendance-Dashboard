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
exports.attendanceRecord = exports.searchStudent = exports.getAllStudents = exports.getTodaysCounts = void 0;
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const studentModel_1 = __importDefault(require("../models/studentModel"));
const attendanceModel_1 = __importDefault(require("../models/attendanceModel"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.getTodaysCounts = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const totalStudentsCount = yield studentModel_1.default.countDocuments();
    const date = new Date();
    // Get present students count
    const presentStudentsCount = yield attendanceModel_1.default.countDocuments({
        date: date,
        status: true,
    });
    // Get absent students count
    const absentStudentsCount = totalStudentsCount - presentStudentsCount;
    res.status(200).json({
        success: true,
        totalStudentsCount,
        presentStudentsCount,
        absentStudentsCount,
    });
}));
// redis
exports.getAllStudents = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentPage = Number(req.query.page) || 1;
    const resultPerPage = 5;
    const skip = resultPerPage * (currentPage - 1);
    const students = yield studentModel_1.default.find().limit(resultPerPage).skip(skip);
    const studentCount = students.length;
    res.status(200).json({
        success: true,
        resultPerPage,
        studentCount,
        students,
    });
}));
exports.searchStudent = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const word = req.body.word;
    if (!word) {
        return next(new errorHandler_1.default("Enter the word to be searched", 400));
    }
    // const cashedValue = await redis.get(word);
    const student = yield studentModel_1.default.find({ name: word });
    res.json({
        success: true,
        student,
    });
}));
exports.attendanceRecord = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.body;
    if (!date) {
        return next(new errorHandler_1.default("Please provide date", 400));
    }
    const attendanceList = yield attendanceModel_1.default.find({
        date: date,
    }).populate("student", "name rollNumber email");
    const length = attendanceList.length;
    res.status(200).json({
        success: true,
        length,
        attendanceList,
    });
}));
