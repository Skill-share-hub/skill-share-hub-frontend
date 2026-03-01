import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../shared/hooks/redux";
import { setUserLogout } from "../features/profile/userSlice";
import type { UserRole } from "../shared/types/user.Type";
import Sidebar from "../features/dashboard/Sidebar";

type Props = {
  children: ReactNode;
  role: UserRole;
};

const DashboardLayout = ({ children, role }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUserLogout());
    navigate("/login");
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <aside className="w-64 bg-white border-r flex-shrink-0">
        <Sidebar role={role} />
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold capitalize">
            {role} Dashboard
          </h1>

          <div className="flex items-center gap-6">

            <span className="text-sm text-gray-600">
              Welcome
            </span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-500 hover:underline"
            >
              Logout
            </button>

            <div className="w-9 h-9 bg-green-500 text-white rounded-full flex items-center justify-center">
              S
            </div>

          </div>
        </header>

       <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;