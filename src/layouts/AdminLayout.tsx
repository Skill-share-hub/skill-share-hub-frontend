import { Outlet } from 'react-router-dom';
import AdminSidebar from '../features/navigations/AdminSidebar';
import AdminNavbar from '../features/navigations/AdminNavbar';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminSidebar />
      <div className="flex-1 ml-20 flex flex-col w-full h-screen overflow-hidden">
        <AdminNavbar />
        <main id="admin-scroll-container" className="flex-1 overflow-y-auto w-full scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
