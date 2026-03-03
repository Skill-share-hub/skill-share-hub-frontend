import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../shared/hooks/redux";
import { setUserLogout } from "../features/profile/userSlice";
import Sidebar from "../features/dashboard/Sidebar";

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  if (!user) return null;

  const handleLogout = () => {
    dispatch(setUserLogout());
    navigate("/login");
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <aside className="w-64 bg-white border-r flex-shrink-0">
        <Sidebar />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold capitalize">
            {user.role} Dashboard
          </h1>

          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-600">
              Welcome {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-500 hover:underline"
            >
              Logout
            </button>

            <div className="w-9 h-9 bg-green-500 text-white rounded-full flex items-center justify-center">
              {user.name.charAt(0).toUpperCase()}
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