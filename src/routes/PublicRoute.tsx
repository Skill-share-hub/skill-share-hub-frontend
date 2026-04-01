import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../shared/hooks/redux";

export default function PublicRoute() {
  const { user } = useAppSelector(state => state.user);
  if (user) return <Navigate to="/" replace />
  return <Outlet />;
}