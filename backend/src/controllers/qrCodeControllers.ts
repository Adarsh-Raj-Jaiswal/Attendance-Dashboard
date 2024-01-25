import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import attendanceModel from "../models/attendanceModel";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import adminModel from "../models/adminModel";

export const getQR = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const admin = await adminModel.findOne();
    if (!admin) return next(new ErrorHandler("admin login kro", 400));

    //@ts-ignore
    const hash = admin.getQRHash();
    await admin.save({ validateBeforeSave: false });

    res.json({
      success: true,
      hash,
    });
  }
);

export const scanQR = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const studentId = req.user._id;
    const { hash } = req.body;
    if (!hash) {
      return next(
        new ErrorHandler("Qr not scanned unable to get the hash", 400)
      );
    }

    const admin = await adminModel.findOne();
    if (!admin) return next(new ErrorHandler("admin login kro", 400));
    if (hash !== admin.qrHash) {
      return next(new ErrorHandler("This QR code has expired", 400));
    }

    await attendanceModel.create({
      student: studentId,
      status: true,
    });

    res.json({
      success: true,
    });
  }
);
