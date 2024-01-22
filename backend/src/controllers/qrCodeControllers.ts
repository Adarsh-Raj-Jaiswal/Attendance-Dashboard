import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import attendanceModel from "../models/attendanceModel";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
export const getQR = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const hash = "a_random_dummy_hash";
    res.json({
      success: true,
      hash,
    });
  }
);

export const scanQR = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { hash, studentId } = req.body;
    if (!hash) {
      return next(new ErrorHandler("Not marked", 400));
    }

    const present = true;
    const admin = await attendanceModel.create({
      student: studentId,
      status: present,
    });

    res.json({
      success: true,
      hash,
    });
  }
);
