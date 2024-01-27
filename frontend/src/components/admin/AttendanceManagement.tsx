import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  getAdminDate,
  getAdminCounts,
  logout,
} from "../../api-helper/api-helper";

const AttendanceManagement = () => {
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
        const response = await getAdminCounts();
        console.log("API Response:", response.data);
        //@ts-ignore
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // useEffect(() => {
  //   const fetchAttendanceData = async () => {
  //     try {
  //       setLoading(true);
  //       const defaultDate = "2024-01-20";
  //       const response = await getAdminDate(defaultDate);
  //       console.log("Attendance data for date:", response.data);
  //       setAttendanceData(response.data);
  //     } catch (error: any) {
  //       console.error("Error fetching attendance data:", error);
  //       setError("Failed to fetch attendance data. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAttendanceData();
  // }, []);
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (selectedDate) {
          const formattedDate = selectedDate.toISOString().split("T")[0];
          const response = await getAdminDate(formattedDate);
          console.log("Attendance data for date:", response.data);
          setAttendanceData(response.data);
        }
      } catch (error: any) {
        console.error("Error fetching attendance data:", error);
        setError("Failed to fetch attendance data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [selectedDate]);

  const handleLogout = async () => {
    try {
      const response = await logout();
      console.log(response.data.message);
      localStorage.removeItem("adminId");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-4">
          Dashboard
        </h2>

        <ul>
          <li className="mb-2 md:mb-6">
            <Link
              to="/student-management"
              className="bg-orange-800 block p-2 hover:bg-orange-900 rounded-md text-center"
            >
              Student Management
            </Link>
          </li>

          <li
            className="mb-2 md:mb-6 bg-orange-800  hover:bg-orange-900 block p-2 rounded-md text-center"
            onClick={handleLogout}
          >
            Logout
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

        <div className="flex flex-col mt-4">
          <label className="mb-2 font-bold text-blue-900">Select Date: </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            className="p-2 border border-blue-500 focus:outline-none rounded-3xl focus:border-blue-700"
          />

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {selectedDate && (
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2">
                Attendance Data for {selectedDate.toDateString()}
              </h2>
              <p>Length: {attendanceData.length}</p>

              <table className="table-auto w-full border-collapse border border-gray-800 mt-2">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.attendanceList.map((attendance, index) => (
                    <tr key={index} className="border">
                      <td className="border p-2">{attendance.name}</td>
                      <td className="border p-2">{attendance.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement;
