import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { logout } from "../../api-helper/api-helper";
import { login } from "../../api-helper/api-helper";

const StudentDashboard = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const [attendanceRecords, setAttendanceRecords] = useState<
  //   { date: Date; status: "Present" | "Absent" }[]
  // >([]);

  const [studentData, setStudentData] = useState({
    name: "",
    number: "",
    email: "",
    rollNumber: "",
  });

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    const userPassword = localStorage.getItem("password");

    if (userEmail && userPassword) {
      login(userEmail, userPassword)
        .then((response) => {
          console.log("Login API response:", response.data);

          const student = response.data;

          if (student) {
            const firstStudent = student.user;
            console.log("Student details:", firstStudent);

            setStudentData({
              name: firstStudent.name,
              number: firstStudent.number,
              email: firstStudent.email,
              rollNumber: firstStudent.rollNumber,
            });
          } else {
            console.error("No student data found in the API response");
          }
        })
        .catch((error) => {
          console.error("Failed to fetch student data:", error);
        });
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      console.log(response.data.message);
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // const studentData = {
  //   name: "Ritika Gajeshwar",
  //   mobileNumber: "123-456-7890",
  //   registrationNumber: "ABC123",
  //   rollNumber: "1",
  // };

  // const attendanceData = {
  //   totalDays: 30,
  //   totalPresent: 20,
  //   totalAbsent: 10,
  // };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  // const viewAttendanceStatus = () => {
  //   const selectedDateAttendance = attendanceRecords.find(
  //     (record) => record.date === selectedDate
  //   );

  //   if (selectedDateAttendance) {
  //     alert(
  //       `On ${selectedDate?.toLocaleDateString()}, you were ${
  //         selectedDateAttendance.status
  //       }`
  //     );
  //   } else {
  //     alert(
  //       `No attendance record found for ${selectedDate?.toLocaleDateString()}`
  //     );
  //   }
  // };

  return (
    <div style={{ backgroundImage: "url('/images/bg-image.png')" }}>
      <div className="flex flex-col md:flex-row h-screen">
        <button
          className="md:hidden bg-slate-800 text-white p-2 rounded-md focus:outline-none"
          onClick={toggleMenu}
        >
          &#9776; {/* Hamburger icon */}
        </button>

        <nav
          className={`bg-slate-800 text-white sticky w-full md:w-1/6 p-4 md:p-8 ${
            isMenuOpen ? "block" : "hidden"
          } md:block`}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-4">
            Dashboard
          </h2>

          <ul>
            <li className="mb-2 md:mb-6">
              <Link
                to="/qr-code"
                className="bg-blue-900 block p-2 hover:bg-blue-700 rounded-md text-center"
              >
                &#9745; Mark Attendance
              </Link>
            </li>

            <li
              className="mb-2 md:mb-6 bg-blue-900 block p-2 rounded-md text-center"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </nav>

        {/* Student Details */}
        <div className="p-8 w-full md:w-1/3">
          <div className="bg-blue-100 p-3 rounded-3xl hover:bg-blue-200">
            <h2 className="mt-5 text-xl font-bold mb-6 bg-blue-300 p-4 rounded-3xl text-center">
              Student Details
            </h2>
            <table className="bg-blue-200 rounded-2xl text-center">
              <tbody>
                <tr>
                  <td className=" px-4 py-4 text-center">Name -</td>
                  <td className="px-4 py-4 text-center">{studentData.name}</td>
                </tr>
                <tr>
                  <td className=" px-2 py-4 text-center">Mobile Number -</td>
                  <td className="bg-white-100  px-2 py-4 text-center">
                    {studentData.number}
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-4 text-center">Email -</td>
                  <td className="bg-white-100  px-2 py-4 text-center">
                    {studentData.email}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-center">Roll Number -</td>
                  <td className="bg-white-100  px-4 py-4 text-center">
                    {studentData.rollNumber}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="p-8 w-full md:w-1/3">
          <div className="bg-blue-100 p-12 rounded-3xl hover:bg-blue-200">
            <h2 className="text-xl font-bold mb-6 bg-blue-300 p-4 rounded-3xl text-center">
              Attendance
            </h2>
            <table className="bg-blue-200 rounded-2xl ml-4">
              <tbody>
                <tr>
                  <td className=" px-5 py-4 text-center">Total Days</td>
                  <td className="bg-white-100  px-5 py-4 text-center">
                    {/* {attendanceData.totalDays} */}
                  </td>
                </tr>
                <tr>
                  <td className=" px-4 py-5 text-center">Total Present</td>
                  <td className="bg-white-100 px-5 py-4 text-center">
                    {/* {attendanceData.totalPresent} */}
                  </td>
                </tr>
                <tr>
                  <td className=" px-5 py-4 text-center">Total Absent</td>
                  <td className="bg-wgite-100  px-5 py-4 text-center">
                    {/* {attendanceData.totalAbsent} */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* View Attendance */}
        <div className="p-8 w-full md:w-1/3">
          <div className="bg-orange-200 p-14 rounded-3xl hover:bg-orange-100">
            <h2 className="text-xl font-bold mb-6 bg-orange-300 p-4 rounded-3xl text-center">
              Calender
            </h2>
            <div className="mb-14  text-center ">
              <label
                htmlFor="datepicker"
                className="p-4  text-center  block text-sm font-medium text-black"
              >
                Select Date:
              </label>
              <DatePicker
                className="p-1 rounded-xl text-center bg-amber-400"
                id="datepicker"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="MMMM d, yyyy"
              />
            </div>

            {/* <button
              onClick={viewAttendanceStatus}
              className="bg-orange-700 text-white p-3 ml-7 rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              View Attendance
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
