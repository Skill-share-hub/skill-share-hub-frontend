import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../shared/hooks/redux";

export default function PublicRoute() {
  const { user } = useAppSelector(state => state.user);
  if (user) {
    if (user.role === "admin") return <Navigate to="/admin" replace />;
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
}