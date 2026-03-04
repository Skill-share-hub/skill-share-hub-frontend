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

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Navbar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">


          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <button className="hover:text-green-700">Home</button>
            <button className="hover:text-green-700">Courses</button>
            <button className="hover:text-green-700">My Activity</button>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-6">

            {/* Credits */}
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              💰 1000
            </div>

            {/* Notifications */}
            <span className="text-xl cursor-pointer">🔔</span>

            {/* User Avatar */}
            <div className="w-9 h-9 bg-green-500 text-white rounded-full flex items-center justify-center">
              {user.name.charAt(0).toUpperCase()}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button>

          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;