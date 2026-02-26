import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { loading, token } = useAuth();

  if (loading) return <div style={{ padding: 24 }}>Cargando...</div>;
  if (!token) return <Navigate to="/login" replace />;

  return children;
}

export function AdminRoute({ children }: { children: JSX.Element }) {
  const { loading, token, user } = useAuth();

  if (loading) return <div style={{ padding: 24 }}>Cargando...</div>;
  if (!token) return <Navigate to="/login" replace />;
  if (user?.role !== "admin") return <Navigate to="/profile" replace />;

  return children;
}