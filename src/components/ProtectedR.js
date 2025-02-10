import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

export default function ProtectedRoute({ element, allowedRoles }) {
  const role = getUserRole();

  if (!role) {
    return <Navigate to="/Login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return element;
}
