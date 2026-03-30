import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
  LogOut,
  GraduationCap,
} from 'lucide-react';

const links = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Users', path: '/admin/tutors', icon: Users }, // updated path
  { name: 'Courses', path: '/admin/courses', icon: BookOpen },
  { name: 'Enrollments', path: '/admin/enrollments', icon: GraduationCap },
  { name: 'Premium Applications', path: '/admin/applications', icon: Users }, // new feature
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

const AdminSidebar = () => {
  return (
    <aside className="group fixed top-0 left-0 h-screen w-[60px] hover:w-56 bg-[#0d0f12] border-r border-gray-800 flex flex-col transition-all duration-300 ease-in-out z-50 overflow-hidden">
      {/* Logo */}
      <div className="flex items-center h-16 border-b border-gray-800 px-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="min-w-[28px] w-7 h-7 rounded-lg bg-gray-700 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-sm font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-75 tracking-tight">
            AdminPanel
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-1 scrollbar-thin scrollbar-thumb-gray-800">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/admin'}
              title={link.name}
              className={({ isActive }) =>
                `flex items-center gap-3 px-2.5 py-2.5 rounded-lg transition-all duration-150 ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-500 hover:text-gray-200 hover:bg-gray-800/60'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={18} className="shrink-0" strokeWidth={isActive ? 2.5 : 1.8} />
                  <span className="whitespace-nowrap text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-75">
                    {link.name}
                  </span>
                  {isActive && (
                    <span className="ml-auto w-1 h-1 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-75 shrink-0" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="p-3 border-t border-gray-800 shrink-0">
        <button
          title="Sign Out"
          className="flex items-center gap-3 px-2.5 py-2.5 w-full rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-150"
        >
          <LogOut size={18} className="shrink-0" strokeWidth={1.8} />
          <span className="whitespace-nowrap text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-75">
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
