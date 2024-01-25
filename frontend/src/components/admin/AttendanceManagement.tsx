import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios, { AxiosResponse } from "axios";
import { getAdminDayData } from "../../api-helper/api-helper";

const AttendanceManagement: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const [attendanceCounts, setAttendanceCounts] = useState<
    {
      totalStudentsCount: number;
      presentStudentsCount: number;
      absentStudentsCount: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchAttendanceCounts = async () => {
      try {
        const response = await axios.get("/api/v1/admin/todaysCounts");
        console.log("API Response:", response.data);
        setAttendanceCounts([response.data]);
      } catch (error: any) {
        console.error(
          "Failed to fetch counts data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchAttendanceCounts();
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [attendanceData, setAttendanceData] = useState<{
    length: number;
    attendanceList: any[];
  }>({
    length: 0,
    attendanceList: [],
  });

  useEffect(() => {
    const fetchAttendanceData = async () => {
      if (selectedDate) {
        try {
          const response = await getAdminDayData();
          console.log("Attendance data for date:", response.data);
          setAttendanceData(response.data);
        } catch (error: any) {
          console.error(
            "Failed to fetch attendance data:",
            error.response ? error.response.data : error.message
          );
        }
      }
    };

    fetchAttendanceData();
  }, [selectedDate]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <button
        className="md:hidden bg-slate-800 text-white p-2 rounded-md focus:outline-none"
        onClick={toggleMenu}
      >
        &#9776; {/* Hamburger icon */}
      </button>

      <nav
        className={`bg-slate-800 text-white sticky w-full md:w-1/6 p-4 md:p-8 
        ${isMenuOpen ? "block" : "hidden"} md:block`}
      >
        <Link to="/admin-dashboard">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-4">
            Dashboard
          </h2>
        </Link>
        <ul>
          <li className="mb-2 md:mb-6">
            <Link
              to="/student-management"
              className="bg-orange-800 block p-2 hover:bg-orange-800 rounded-md text-center"
            >
              Student Management
            </Link>
          </li>
          <li className="mb-2 md:mb-6">
            <Link
              to="/attendance-management"
              className="bg-orange-800 block p-2 hover:bg-orange-800 rounded-md text-center"
            >
              Attendance Management
            </Link>
          </li>
        </ul>
      </nav>

      <div className="md:w-5/6 p-8">
        <h1 className="text-2xl font-bold mb-4">Attendance Management</h1>

        <table className="table-auto w-full border-collapse border border-gray-800">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border p-2">Total Students</th>
              <th className="border p-2">Present Students</th>
              <th className="border p-2">Absent Students</th>
            </tr>
          </thead>
          <tbody>
            {attendanceCounts.map((count, index) => (
              <tr key={index} className="border">
                <td className="border p-2">{count.totalStudentsCount}</td>
                <td className="border p-2">{count.presentStudentsCount}</td>
                <td className="border p-2">{count.absentStudentsCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-row md:flex-row h-screen">
        <div>
          <label>Select Date: </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
          />
        </div>
        {selectedDate && (
          <div>
            <h2>Attendance Data for {selectedDate.toDateString()}</h2>
            <p>Length: {attendanceData.length}</p>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.attendanceList.map((attendance, index) => (
                  <tr key={index}>
                    <td>{attendance.name}</td>
                    <td>{attendance.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceManagement;
