import { useAppSelector } from "../../shared/hooks/redux";
import { useNavigate, useLocation } from "react-router-dom";
import type { UserRole } from "../../shared/types/user.Type";
import { LayoutGrid, BookOpen, DollarSign, Settings, PieChart, Users, FileText, CheckCircle2 } from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon: any;
}

const navConfig: Record<UserRole, NavItem[]> = {
  student: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutGrid },
    { label: "My Learning", path: "/courses", icon: BookOpen },
    { label: "Progress", path: "/progress", icon: PieChart },
  ],
  tutor: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutGrid },
    { label: "My Courses", path: "/my-courses", icon: BookOpen },
    { label: "Revenue", path: "/revenue", icon: DollarSign },
    { label: "Settings", path: "/settings", icon: Settings },
  ],
  premiumTutor: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutGrid },
    { label: "My Courses", path: "/my-courses", icon: BookOpen },
    { label: "Analytics", path: "/analytics", icon: PieChart },
    { label: "Revenue", path: "/revenue", icon: DollarSign },
    { label: "Settings", path: "/settings", icon: Settings },
  ],
  admin: [
    { label: "Dashboard", path: "/dashboard", icon: LayoutGrid },
    { label: "Users", path: "/users", icon: Users },
    { label: "Approvals", path: "/approvals", icon: CheckCircle2 },
    { label: "Reports", path: "/reports", icon: FileText },
    { label: "Settings", path: "/settings", icon: Settings },
  ],
};

const Sidebar = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const location = useLocation();
  if (!user) return null;

  const items = navConfig[user.role];

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">

      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-5 flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-green-700 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
          <BookOpen size={18} />
        </div>
        <div className="flex flex-col">
          <span className="text-[15px] font-bold text-gray-900 tracking-tight leading-none">
            Skill<span className="text-green-700">Share</span>
          </span>
          <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase mt-0.5">
            Tutor Hub
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 flex flex-col gap-0.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-3 pb-2">
          Menu
        </p>

        {items.map((item) => {
          const active = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13.5px] transition-all duration-200 ${active
                ? "bg-green-50 text-green-700 font-bold shadow-sm border-r-4 border-green-700 rounded-r-none"
                : "text-gray-500 font-medium hover:bg-gray-50 hover:text-gray-900"
                }`}
            >
              <Icon size={18} className={active ? "text-green-700" : "text-gray-400"} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="p-3 border-t border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200">
          <div className="w-8 h-8 rounded-full bg-green-800 flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-gray-900 truncate">{user.name}</p>
            <p className="text-[11px] text-gray-500 capitalize">{user.role}</p>
          </div>
          <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
