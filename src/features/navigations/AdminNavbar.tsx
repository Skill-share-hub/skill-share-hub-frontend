import { useLocation } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import { useAppSelector } from '../../shared/hooks/redux';
import { useState, useEffect } from 'react';

const AdminNavbar = () => {
  const location = useLocation();
  const {user} = useAppSelector((state) => state.user);

  const getPageTitle = (pathname: string) => {
    // Handle exact matches
    if (pathname === '/admin') return 'Dashboard';
    
    // Handle specific sub-routes
    if (pathname.includes('/admin/users')) return 'Users Management';
    if (pathname.includes('/admin/courses')) return 'Courses Management';
    if (pathname.includes('/admin/enrollments')) return 'Enrollments';
    if (pathname.includes('/admin/settings')) return 'Settings';
    
    // Fallback: extract last word and capitalize
    const parts = pathname.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1];
    return lastPart ? lastPart.charAt(0).toUpperCase() + lastPart.slice(1).replace(/-/g, ' ') : 'Admin Panel';
  };

  const title = getPageTitle(location.pathname);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      // Hide when scrolled down, show when at the top
      if (target.scrollTop > 50) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };
    
    const timer = setTimeout(() => {
      const container = document.getElementById('admin-scroll-container');
      if (container) {
        container.addEventListener('scroll', handleScroll, { passive: true });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      const container = document.getElementById('admin-scroll-container');
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <header className={`h-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shrink-0 z-40 transition-all duration-300 ease-in-out ${isHidden ? '-mt-20 opacity-0 pointer-events-none' : 'mt-0 opacity-100'}`}>
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white capitalize">
          {title}
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5 md:gap-8">
        {/* Search Bar */}
        <div className="relative hidden md:block group">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search everywhere..." 
            className="pl-10 pr-4 py-2.5 bg-slate-100/80 dark:bg-slate-800/80 border border-transparent rounded-xl text-sm focus:outline-none focus:border-blue-500/30 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-blue-500/10 w-64 lg:w-80 transition-all text-slate-700 dark:text-slate-300 placeholder:text-slate-400"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2.5 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-full transition-colors relative" title="Notifications">
            <Bell size={22} />
            <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
          </button>
        </div>

        {/* Divider */}
        <div className="hidden md:block h-8 w-px bg-slate-200 dark:bg-slate-800"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          {
            user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="" className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm shadow-blue-500/20 group-hover:shadow-md transition-all group-hover:-translate-y-0.5" />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm shadow-blue-500/20 group-hover:shadow-md transition-all group-hover:-translate-y-0.5">
                {user?.name.charAt(0).toUpperCase()}
              </div>
            )
          }
          <div className="hidden md:block">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {user?.name}
            </p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Super Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
