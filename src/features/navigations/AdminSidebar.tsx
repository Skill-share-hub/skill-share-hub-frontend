import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  LogOut, 
  GraduationCap
} from 'lucide-react';

const AdminSidebar = () => {
  const links = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Courses', path: '/admin/courses', icon: BookOpen },
    { name: 'Enrollments', path: '/admin/enrollments', icon: GraduationCap },
    { name: 'Premium Applications', path: '/admin/applications', icon: Users },
  ];

  return (
    <aside className="group fixed top-0 left-0 h-screen w-20 hover:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300 ease-in-out z-50 overflow-hidden">
      {/* Logo Area */}
      <div className="flex items-center h-20 border-b border-slate-200 dark:border-slate-800 px-6 shrink-0">
        <div className="flex items-center gap-4">
          <div className="min-w-8 w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm shadow-blue-500/20 shrink-0">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            AdminPanel
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-4 space-y-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 text-slate-600 dark:text-slate-400">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/admin'}
              title={link.name}
              className={({ isActive }) =>
                `flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold shadow-sm' 
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
                }`
              }
            >
              <Icon size={22} className="shrink-0" />
              <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                {link.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 shrink-0 overflow-hidden">
        <button 
          className="flex items-center gap-4 px-3 py-3 w-full rounded-xl text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors duration-200 font-medium"
          title="Sign Out"
        >
          <LogOut size={22} className="shrink-0 group-hover:text-red-500 transition-colors duration-200" />
          <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
