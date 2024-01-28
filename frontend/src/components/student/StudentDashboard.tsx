import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { logout } from "../../api-helper/api-helper";
import { login } from "../../api-helper/api-helper";
import { getMyCounts, checkStudentPresence } from "../../api-helper/api-helper";
import { AxiosResponse } from "axios";

const StudentDashboard = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isPresent, setIsPresent] = useState<boolean | null>(null);

  const [studentData, setStudentData] = useState({
    id: "",
    name: "",
    number: "",
    email: "",
    rollNumber: "",
  });

  const [myCounts, setMyCounts] = useState<{
    totalAttendanceDays: number;
    presentDays: number;
    absentDays: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<{
          totalAttendanceDays: number;
          presentDays: number;
          absentDays: number;
        }> = await getMyCounts();

        setMyCounts(response.data);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPresenceStatus = async () => {
      try {
        if (selectedDate) {
          const formattedDate = selectedDate?.toISOString();
          const studentId = studentData.id;
          const response: AxiosResponse<{
            success: boolean;
            isPresent: boolean;
          }> = await checkStudentPresence(studentId, formattedDate);

          console.log("Presence status for date:", response.data);
          setIsPresent(response.data.isPresent);
        }
      } catch (error: any) {
        console.error("Error checking presence status:", error.message);
      }
    };

    fetchPresenceStatus();
  }, [selectedDate]);

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    const userPassword = localStorage.getItem("password");

    if (userEmail && userPassword) {
      login(userEmail, userPassword)
        .then((response) => {
          //console.log("Login API response:", response.data);

          const student = response.data;

          if (student) {
            const firstStudent = student.user;
            console.log("Student details:", firstStudent);

            setStudentData({
              id: firstStudent._id,
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

  // const handleDateChange = (date: Date | null) => {
  //   setSelectedDate(date);
  // };

  return (
    <div style={{ backgroundImage: "url('/images/bg-image.png')" }}>
      <div className="overflow-x-hidden flex flex-col md:flex-row h-screen">
        <button
          className="md:hidden bg-slate-800 text-white p-2 rounded-md focus:outline-none"
          onClick={toggleMenu}
        >
          &#9776;
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
            <li
              className="mb-2 md:mb-6 cursor-pointer bg-blue-900 block p-2 rounded-md text-center"
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
                  <td className="px-4 py-4 text-center font-bold">Name:</td>
                  <td className="px-4 py-4 text-center">{studentData.name}</td>
                </tr>
                <tr>
                  <td className="px-2 py-4 text-center font-bold">
                    Mobile Number:
                  </td>
                  <td className="px-2 py-4 text-center bg-white-100">
                    {studentData.number}
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-4 text-center font-bold">Email:</td>
                  <td className="px-2 py-4 text-center bg-white-100">
                    {studentData.email}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-4 text-center font-bold">
                    Roll Number:
                  </td>
                  <td className="px-4 py-4 text-center bg-white-100">
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
                    {myCounts?.totalAttendanceDays}
                  </td>
                </tr>
                <tr>
                  <td className=" px-4 py-5 text-center">Total Present</td>
                  <td className="bg-white-100 px-5 py-4 text-center">
                    {myCounts?.presentDays}
                  </td>
                </tr>
                <tr>
                  <td className=" px-5 py-4 text-center">Total Absent</td>
                  <td className="bg-wgite-100  px-5 py-4 text-center">
                    {myCounts?.absentDays}
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
              Calendar
            </h2>
            <div className="mb-14 text-center">
              <label
                htmlFor="datepicker"
                className="p-4 text-center block text-sm font-medium text-black"
              >
                Select Date:
              </label>
              <DatePicker
                className="p-1 rounded-xl text-center bg-amber-400"
                id="datepicker"
                selected={selectedDate}
                onChange={(date: Date | null) => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
              />
            </div>
            {isPresent !== null && (
              <p className="text-orange-600 font-bold text-center">
                {isPresent
                  ? `You were present on ${selectedDate?.toLocaleDateString()}`
                  : `You were absent on ${selectedDate?.toLocaleDateString()}`}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
