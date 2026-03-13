import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../shared/hooks/redux";
import type { UserRole } from "../shared/types/user.Type";
import FullScreenLoader from "../shared/components/FullScreenLoader";

function ProtectedRoute({ allowedRole }: { allowedRole?: UserRole }) {
  const { user, loading } = useAppSelector((state) => state.user);
  console.log(user);
  if (loading) return <FullScreenLoader />

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Role restriction
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;