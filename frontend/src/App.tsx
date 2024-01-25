import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store'; 
import { adminActions, userActions } from './store/store';
import Login from './components/pages/UserLogin';
import ForgotPassword from './components/pages/ForgotPassword';
import ResetPassword from './components/pages/ResetPassword';
import AdminDashboard from './components/admin/AdminDashboard';
import StudentManagement from './components/admin/StudentManagement';
import AttendanceManagement from './components/admin/AttendanceManagement';
import StudentDashboard from './components/student/StudentDashboard';
import UserLogin from './components/pages/UserLogin';
import QRLogin from './components/pages/QRLogin';
import QRpage from './components/pages/QRpage';

function App() 
{
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state: RootState) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  console.log("isAdminLoggedIn", isAdminLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);

  useEffect(() => 
  {
    if (localStorage.getItem("userId")) 
    {
      dispatch(userActions.login());
    } 
    else if (localStorage.getItem("adminId"))
    {
      dispatch(adminActions.login());
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/user" element={<UserLogin />} />
        <Route path='/qr-page' element={<QRpage/>}/>
        <Route path="/qr" element={<QRLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        { isUserLoggedIn &&  (
        <>
        {" "}
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            </>
        )}
         { isAdminLoggedIn && (
        <>
        {" "}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/student-management" element={<StudentManagement />} />
            <Route path="/attendance-management" element={<AttendanceManagement />} />
            </>

        )}
      </Routes>
    </Router>
  );
}

export default App;
