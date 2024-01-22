import { Link } from "react-router-dom";
import { useState } from "react";

const AdminDashboard = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    window.location.href = "/";
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
        <button
          className="bg-red-600 text-white p-3 rounded-md mt-4 ml-3"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminDashboard;
