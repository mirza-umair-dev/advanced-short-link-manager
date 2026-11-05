import { useContext } from "react";
import { VscLoadingCompact } from "react-icons/vsc";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/ContextProvider";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useContext(AppContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <VscLoadingCompact className="animate-spin text-3xl" />
      </div>
    );
  }

  // Check authentication
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Check authorization
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;