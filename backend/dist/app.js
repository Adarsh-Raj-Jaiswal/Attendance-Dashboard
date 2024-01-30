"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const qrCodeRoutes_1 = __importDefault(require("./routes/qrCodeRoutes"));
const path_1 = __importDefault(require("path"));
const error_1 = __importDefault(require("./middlewares/error"));
const auth_1 = require("./middlewares/auth");
//@ts-ignore
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: [process.env.CLIENT_URL, "http://localhost:5173"],
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// app.post("/", async (req, res) => {
//   const studentId = req.body.studentId;
//   const present = true;
//   const admin = await attendanceModel.create({
//     student: studentId,
//     status: present,
//   });
//   res.json({
//     success: true,
//     admin,
//   });
// });
app.use("/api/v1", authRoutes_1.default);
app.use("/api/v1/admin", auth_1.isAuthenticatedUser, (0, auth_1.authorizeRoles)("Admin"), adminRoutes_1.default);
app.use("/api/v1/student", auth_1.isAuthenticatedUser, (0, auth_1.authorizeRoles)("Student"), studentRoutes_1.default);
app.use("/api/v1/qr", qrCodeRoutes_1.default);
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../../frontend/build/index.html"));
});
app.use(error_1.default);
exports.default = app;
