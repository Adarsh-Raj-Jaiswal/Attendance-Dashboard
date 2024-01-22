import { Link } from "react-router-dom";
import { useState } from "react";

const StudentManagement = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState([
    { id: 1, name: "Ritika", email: "ritika@gmail.com", mobile: "1234567890", rollNo: "A123" },
    { id: 2, name: "Adarsh", email: "adarsh@gmail.com", mobile: "9876543210", rollNo: "B456" },
  ]);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <input
            type="text"
            placeholder="Search by student name"
            className="p-2 border border-gray-300 rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          {filteredStudents.length === 0 ? (
            <p>No matching students found.</p>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="bg-amber-100 border border-gray-400 p-2">Student ID</th>
                  <th className="bg-amber-100 border border-gray-400 p-2">Name</th>
                  <th className="bg-amber-100 border border-gray-400 p-2">Email</th>
                  <th className="bg-amber-100 border border-gray-400 p-2">Mobile Number</th>
                  <th className="bg-amber-100 border border-gray-400 p-2">Roll No.</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="border border-gray-300 p-2">{student.id}</td>
                    <td className="border border-gray-300 p-2">{student.name}</td>
                    <td className="border border-gray-300 p-2">{student.email}</td>
                    <td className="border border-gray-300 p-2">{student.mobile}</td>
                    <td className="border border-gray-300 p-2">{student.rollNo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;
