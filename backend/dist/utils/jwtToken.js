"use strict";
// Create Token and saving in cookie
Object.defineProperty(exports, "__esModule", { value: true });
const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    // options for cookie
    const options = {
        sameSite: "none",
        secure: true,
        expires: new Date(
        //@ts-ignore
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    //@ts-ignore
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};
exports.default = sendToken;
