import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 1. Jika belum login → langsung ke login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Jika route butuh role spesifik & role user tidak cocok
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
