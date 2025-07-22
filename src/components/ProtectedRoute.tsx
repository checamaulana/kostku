import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

function ProtectedRoute() {
  const { userRole, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Atau tampilkan spinner
  }

  if (userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Jika user adalah admin, tampilkan konten halaman
  return <Outlet />;
}

export default ProtectedRoute;
