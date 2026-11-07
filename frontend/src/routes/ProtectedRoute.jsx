import { useContext } from "react";
import { VscLoadingCompact } from "react-icons/vsc";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/ContextProvider";

const ProtectedRoute = ({role}) => {
  const { user, loading } = useContext(AppContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <VscLoadingCompact className="animate-spin text-3xl" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth/login" replace />;
  if (!user.isVerified) return <Navigate to="/auth/verify-otp" replace />;
  if (role && user.role !== role) return <Navigate to="/unauthorized" replace />;
  return <Outlet />
};

export default ProtectedRoute;