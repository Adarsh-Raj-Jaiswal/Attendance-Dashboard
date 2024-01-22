import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Student {
  id: number;
  name: string;
}

interface AttendanceRecord {
  date: string;
  students: { id: number; status: string }[];
}

const AttendanceManagement: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  // Dummy student data
  const students: Student[] = [
    { id: 1, name: "Ritika" },
    { id: 2, name: "Adarsh" },
  ];

  // Dummy attendance data
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    // Fetch attendance records for the selected date or initialize if not available
    const formattedDate = date ? formatDate(date) : "";
    const recordsForDate = attendanceRecords.find((record) => record.date === formattedDate);
    if (recordsForDate) {
      // Attendance records for the selected date already exist
      setAttendanceRecords([...attendanceRecords]);
    } else {
      // Initialize attendance records for the selected date
      const newRecords: AttendanceRecord = {
        date: formattedDate,
        students: students.map((student) => ({ id: student.id, status: "Absent" })),
      };
      setAttendanceRecords([...attendanceRecords, newRecords]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <button
        className="md:hidden bg-orange-900 text-white p-2 rounded-md focus:outline-none"
        onClick={toggleMenu}
      >
        &#9776; {/* Hamburger icon */}
      </button>

      <nav
        className={`bg-orange-900 text-white sticky w-full md:w-1/6 p-4 md:p-8 
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
              className="block p-2 hover:bg-orange-800 rounded-md"
            >
              Student Management
            </Link>
          </li>
          <li className="mb-2 md:mb-6">
            <Link
              to="/attendance-management"
              className="block p-2 hover:bg-orange-800 rounded-md"
            >
              Attendance Management
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex-grow p-4">
        <div className="mb-4">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
            placeholderText="Select a date"
          />
        </div>

        {selectedDate && (
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Attendance Records for {formatDate(selectedDate)}
            </h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="bg-amber-100 border border-gray-400 border border-gray-300 p-2">Student Name</th>
                  <th className="bg-amber-100 border border-gray-400 border border-gray-300 p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const status =
                    attendanceRecords.find((record) => record.date === formatDate(selectedDate))
                      ?.students.find((s) => s.id === student.id)?.status || "Absent";
                  return (
                    <tr key={student.id}>
                      <td className="border border-gray-300 p-2">{student.name}</td>
                      <td className="border border-gray-300 p-2">{status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceManagement;
