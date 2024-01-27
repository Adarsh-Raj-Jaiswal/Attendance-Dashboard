"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminControllers_1 = require("../controllers/adminControllers");
const router = express_1.default.Router();
router.route("/todaysCounts").get(adminControllers_1.getTodaysCounts);
router.route("/students").get(adminControllers_1.getAllStudents);
router.route("/search").post(adminControllers_1.searchStudent);
router.route("/day").post(adminControllers_1.attendanceRecord);
exports.default = router;
