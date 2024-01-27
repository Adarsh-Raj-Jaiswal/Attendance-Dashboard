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
exports.authorizeRoles = exports.isAuthenticatedUser = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const catchAsyncErrors_1 = __importDefault(require("./catchAsyncErrors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const studentModel_1 = __importDefault(require("../models/studentModel"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
exports.isAuthenticatedUser = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (!token) {
        return next(new errorHandler_1.default("Please Login to access this resource", 401));
    }
    // @ts-ignore
    const decodedData = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET); // this method verify the signatue that is generated using the jwt secret(payload is not compared)
    const student = yield studentModel_1.default.findById(decodedData.id);
    if (student) {
        // @ts-ignore
        req.user = student;
    }
    else {
        const admin = yield adminModel_1.default.findById(decodedData.id);
        if (!admin) {
            return next(new errorHandler_1.default("Please Login to access this resource", 401));
        }
        // @ts-ignore
        req.user = admin; // populates the req.user property
    }
    next();
}));
const authorizeRoles = (...types) => {
    return (req, res, next) => {
        //@ts-ignore
        if (!types.includes(req.user.type)) {
            return next(new errorHandler_1.default(
            //@ts-ignore
            `Role: ${req.user.type} is not allowed to access this resouce `, 403));
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
