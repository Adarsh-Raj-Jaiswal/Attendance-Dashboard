import { NextFunction, Request, Response } from "express";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import Attendance from "../models/attendanceModel";

export const getCounts = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const studentId = req.user._id;

    const totalAttendanceDays = await Attendance.countDocuments({
      student: studentId,
    });
    const presentDays = await Attendance.countDocuments({
      student: studentId,
      status: true,
    });
    const absentDays = await Attendance.countDocuments({
      student: studentId,
      status: false,
    });

    res.status(200).json({
      success: true,
      totalAttendanceDays,
      presentDays,
      absentDays,
    });
  }
);
export const date = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const studentId = req.user._id;
    const date = new Date("2024-01-20");

    const attendanceRecord = await Attendance.findOne({
      student: studentId,
      date: date,
    });

    let success, isPresent;
    if (attendanceRecord) {
      success = true;
      if (attendanceRecord.status) {
        isPresent = true;
      } else {
        isPresent = false;
      }
    } else {
      success = false;
    }

    res.status(200).json({
      success: success,
      isPresent: isPresent,
    });
  }
);
