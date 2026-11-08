import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import AuthLayout from "./layouts/AuthLayout";
import VerifyOtp from "./pages/auth/VerifyOtp";
import RequestResetPassword from "./pages/auth/RequestResetPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import TokenSuccess from "./pages/auth/TokenSuccess";
import PasswordChangedSuccess from "./pages/auth/PasswordChangedSuccess";
import GenerateLink from "./pages/GenerateLink";
import { ToastContainer } from "react-toastify";
import UserLayout from "./layouts/UserLayout";
import Links from "./pages/Links";
import ProtectedRoute from "./routes/ProtectedRoute";
import UserAnalytics from "./pages/user/UserAnalytics";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <div>
      {/* Auth Routes */}
      <Routes>
        
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/register" element={<SignUp />} />
          <Route path="/auth/login" element={<SignIn />} />
          <Route path="/auth/verify-otp" element={<VerifyOtp />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/auth/request-reset-password"
            element={<RequestResetPassword />} />
          <Route path="/auth/token-sent" element={<TokenSuccess />} />
          <Route path="/auth/password-changed" element={<PasswordChangedSuccess />} />
       
        {/* User Routes */}

        <Route element={<ProtectedRoute role="user" />}>
          
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/generate-link" element={<GenerateLink />} />
            <Route path="/links" element={<Links />} />
            <Route path="/analytics" element={<UserAnalytics />} />
                 </Route>

        {/* Admin Routes */}

        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
