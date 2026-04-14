import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const ProtectedRoute = ({ adminOnly = false }) => {
  const { user, isLoadingUser } = useContext(UserContext);
  const location = useLocation();
  const isAdminUser = user?.role === "admin" || user?.role === "superadmin";

  if (isLoadingUser) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // Si no hay usuario logueado
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si requiere ser admin y el usuario no lo es
  if (adminOnly && !isAdminUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
