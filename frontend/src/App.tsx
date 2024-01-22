import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";
import AdminDashboard from "./components/admin/AdminDashboard";
import StudentManagement from "./components/admin/StudentManagement";
import AttendanceManagement from "./components/admin/AttendanceManagement";
import QRgenerate from "./components/student/QRgenerate";
import StudentDashbaord from "./components/student/StudentDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/student-management" element={<StudentManagement />} />
        <Route path="/attendance-management" element={<AttendanceManagement />}/>
        <Route path="/student-dashboard" element={<StudentDashbaord/>}/>
        <Route path="/qr-code" element={<QRgenerate />} />
      </Routes>
    </Router>
  );
}
export default App;
