import { Link } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../api-helper/api-helper";

const AdminDashboard = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

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
        className={`bg-slate-800 text-white sticky w-full md:w-1/6 p-4 md:p-8 ${
          isMenuOpen ? "block" : "hidden"
        } md:block`}
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

          <li
            className="mb-2 md:mb-6 bg-orange-800 block p-2 rounded-md text-center"
            onClick={handleLogout}
          >
            Logout
          </li>
        </ul>
      </nav>

      <div className="text-center p-20 text-orange-400 text-2xl">
        Welcome to Student Attendance Mangement System
      </div>
    </div>
  );
};

export default AdminDashboard;
