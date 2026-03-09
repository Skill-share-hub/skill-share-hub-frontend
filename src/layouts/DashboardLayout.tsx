import { useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../shared/hooks/redux";
import { setUserLogout } from "../features/auth/authSlice";
import Sidebar from "../features/dashboard/Sidebar";
import { Search, Plus, Bell, LogOut } from "lucide-react";
import { Outlet } from "react-router-dom";
type Props = { children: ReactNode };



/* Hamburger icon — three lines that animate to X */
const HamburgerIcon = ({ open }: { open: boolean }) => (
  <div className="flex flex-col justify-center items-center w-5 h-5 gap-[5px]">
    <span
      className={`block h-[2px] bg-gray-600 rounded-full transition-all duration-300 origin-center ${open ? "w-5 rotate-45 translate-y-[7px]" : "w-5"
        }`}
    />
    <span
      className={`block h-[2px] bg-gray-600 rounded-full transition-all duration-200 ${open ? "w-0 opacity-0" : "w-4 opacity-100"
        }`}
    />
    <span
      className={`block h-[2px] bg-gray-600 rounded-full transition-all duration-300 origin-center ${open ? "w-5 -rotate-45 -translate-y-[7px]" : "w-5"
        }`}
    />
  </div>
);

const DashboardLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) return null;

  const handleLogout = () => {
    dispatch(setUserLogout());
    navigate("/login");
  };

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">

      {/* Sidebar — slides in/out */}
      <aside
        className={`flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out ${sidebarOpen ? "w-56" : "w-0"
          }`}
      >
        <div className="w-56 h-full">
          <Sidebar />
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 flex-shrink-0 z-10">

          <div className="flex items-center gap-6 flex-1">
            {/* Hamburger toggle */}
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:text-green-700 hover:bg-green-50 transition-all duration-200"
              aria-label="Toggle sidebar"
            >
              <HamburgerIcon open={sidebarOpen} />
            </button>

            {/* Global Search Bar */}
            <div className="relative group max-w-md w-full hidden lg:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-green-600 transition-colors" />
              <input
                type="text"
                placeholder="Search your courses..."
                className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-green-600/10 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">

            {/* Notification */}
            <button className="relative w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:text-green-700 hover:bg-green-50 transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
            </button>

            {/* Create Course Button */}
            <button
              onClick={() => navigate("/create-course")}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1F5E45] hover:bg-[#164733] text-white rounded-xl text-sm font-bold transition-all shadow-sm active:scale-95 whitespace-nowrap"
            >
              <Plus size={18} strokeWidth={3} />
              Create Course
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 ml-2 border-l border-gray-100 pl-4 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-green-700 flex items-center justify-center text-white text-sm font-black shadow-sm group-hover:scale-105 transition-transform">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden xl:block">
                <p className="text-xs font-black text-gray-900 leading-none">{user.name}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-1">{user.role}</p>
              </div>
              <button onClick={handleLogout} className="p-2 text-gray-300 hover:text-red-600 transition-colors">
                <LogOut size={16} />
              </button>
            </div>

          </div>
        </header>

        {/* Page content */}
      <main className="flex-1 overflow-y-auto px-8 py-7">
  <Outlet />
</main>

      </div>
    </div>
  );
};

export default DashboardLayout;
