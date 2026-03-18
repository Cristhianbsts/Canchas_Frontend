import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const ProtectedRoute = ({ adminOnly = false }) => {
  const { user, loadUserData } = useContext(UserContext);
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check session on mount if user is null just to be safe
    const checkAuth = async () => {
      if (!user) {
        await loadUserData();
      }
      setIsChecking(false);
    };
    checkAuth();
  }, [user, loadUserData]);

  if (isChecking) {
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
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
