import { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const StudentDashboard = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<
    { date: Date; status: "Present" | "Absent" }[]
  >([]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  const studentData = {
    name: "Ritika Gajeshwar",
    mobileNumber: "123-456-7890",
    registrationNumber: "ABC123",
    rollNumber: "123456",
  };

  const attendanceData = {
    totalDays: 30,
    totalPresent: 20,
    totalAbsent: 10,
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const viewAttendanceStatus = () => {
    const selectedDateAttendance = attendanceRecords.find(
      (record) => record.date === selectedDate
    );

    if (selectedDateAttendance) {
      alert(
        `On ${selectedDate?.toLocaleDateString()}, you were ${selectedDateAttendance.status}`
      );
    } else {
      alert(`No attendance record found for ${selectedDate?.toLocaleDateString()}`);
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
        className={`bg-orange-900 text-white sticky w-full md:w-1/6 p-4 md:p-8 ${
          isMenuOpen ? "block" : "hidden"
        } md:block`}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-4">Dashboard</h2>

        <ul>
          <li className="mb-2 md:mb-6">
            <Link
              to="/qr-code"
              className="block p-2 hover:bg-orange-800 rounded-md"
            >
              Mark Attendance
            </Link>
          </li>
        </ul>

        <button
          className="bg-red-600 text-white p-3 rounded-md mt-4 ml-3"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      {/* Student Details */}
      <div className="p-8 w-full md:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Student Details</h2>
        <table className="table-auto mb-8">
          <tbody>
            <tr>
              <td className="bg-amber-100 border border-gray-400 px-7 py-2">Name</td>
              <td className="bg-white-100 border border-gray-400 px-4 py-2">{studentData.name}</td>
            </tr>
            <tr>
              <td className=" bg-amber-100 border border-gray-400 px-4 py-2">Mobile Number</td>
              <td className="bg-white-100 border border-gray-400 px-4 py-2">{studentData.mobileNumber}</td>
            </tr>
            <tr>
              <td className=" bg-amber-100 border border-gray-400 px-4 py-2">Registration Number</td>
              <td className="bg-white-100 border border-gray-400 px-4 py-2">
                {studentData.registrationNumber}
              </td>
            </tr>
            <tr>
              <td className="bg-amber-100 border border-gray-400 px-4 py-2">Roll Number</td>
              <td className="bg-white-100 border border-gray-400 px-4 py-2">{studentData.rollNumber}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Attendance Summary */}
      <div className="p-8 w-full md:w-1/3">
        <h2 className="text-2xl font-bold mb-4 ">Attendance Summary</h2>
        <table className="table-auto">
          <tbody>
            <tr>
              <td className="bg-amber-100 border border-gray-400 px-4 py-2">Total Days</td>
              <td className="bg-white-100 border border-gray-400 px-4 py-2">{attendanceData.totalDays}</td>
            </tr>
            <tr>
              <td className="bg-amber-100 border border-gray-400 px-4 py-2">Total Present</td>
              <td className="bg-white-100 border border-gray-400 px-4 py-2">{attendanceData.totalPresent}</td>
            </tr>
            <tr>
              <td className="bg-amber-100 border border-gray-400 px-4 py-2">Total Absent</td>
              <td className="bg-wgite-100 border border-gray-800 px-4 py-2">{attendanceData.totalAbsent}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* View Attendance */}
      <div className="p-8 w-full md:w-1/3">
        <h2 className="text-2xl font-bold mb-4">View Attendance</h2>
        <div className="mb-4">
          <label htmlFor="datepicker" className="block text-sm font-medium text-gray-600">
            Select Date:
          </label>
          <DatePicker
            id="datepicker"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
          />
        </div>

        <button
          onClick={viewAttendanceStatus}
          className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          View Attendance
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
