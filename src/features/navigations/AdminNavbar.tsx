import { useLocation } from 'react-router-dom';
import { Bell, Command } from 'lucide-react';
import { useAppSelector } from '../../shared/hooks/redux';
import { useState, useEffect, useRef } from 'react';

const AdminNavbar = () => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.user);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const getPageTitle = (pathname: string) => {
    if (pathname === '/admin') return 'Dashboard';
    if (pathname.includes('/admin/Users')) return 'User Management';
    if (pathname.includes('/admin/courses')) return 'Courses Management';
    if (pathname.includes('/admin/enrollments')) return 'Enrollments';
    if (pathname.includes('/admin/settings')) return 'Settings';
    const parts = pathname.split('/').filter(Boolean);
    const lastPart = parts[parts.length - 1];
    return lastPart ? lastPart.charAt(0).toUpperCase() + lastPart.slice(1).replace(/-/g, ' ') : 'Admin Panel';
  };

  const title = getPageTitle(location.pathname);

  useEffect(() => {
    const container = document.getElementById('admin-scroll-container');
    if (!container) return;

    const handleScroll = () => {
      const currentScrollY = container.scrollTop;
      
      // Always show at the very top (within navbar height)
      if (currentScrollY < 64) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Hide only if we've scrolled down a significant amount (threshold)
      // Show if we've scrolled up
      const diff = currentScrollY - lastScrollY.current;
      
      if (diff > 10) { // Scrolling down
        setIsVisible(false);
      } else if (diff < -10) { // Scrolling up
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`h-16 bg-[#0d0f12]/95 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-8 shrink-0 z-40 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${!isVisible ? '-mb-16' : 'mb-0'}`}
    >
      {/* Page Title */}
      <div>
        <h1 className="text-base font-semibold tracking-tight text-white capitalize">
          {title}
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Cmd+K hint — future global search placeholder */}
        <button
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-700 bg-[#13161b] text-gray-500 text-xs hover:border-gray-600 hover:text-gray-400 transition-colors"
          title="Global search (coming soon)"
        >
          <Command size={12} />
          <span>K</span>
        </button>

        {/* Divider */}
        <div className="h-5 w-px bg-gray-800" />

        {/* Notifications */}
        <button
          className="relative p-2 text-gray-500 hover:text-gray-300 hover:bg-gray-800 rounded-md transition-colors"
          title="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#0d0f12]" />
        </button>

        {/* Divider */}
        <div className="h-5 w-px bg-gray-800" />

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt=""
              className="w-8 h-8 rounded-lg object-cover ring-1 ring-gray-700 group-hover:ring-gray-500 transition-all"
            />
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gray-700 flex items-center justify-center text-white text-xs font-bold ring-1 ring-gray-600 group-hover:ring-gray-500 transition-all">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors leading-none mb-0.5">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 leading-none">Super Admin</p>
          </div>
        </div>

      </div>
    </header>
  );
};

export default AdminNavbar;