import type { ReactNode } from "react";
import type { UserRole } from "../shared/types/user.Type";
import Sidebar from "../features/dashboard/Sidebar";
type Props = {
  children: ReactNode;
  role: UserRole;
};

const DashboardLayout = ({ children, role }: Props) => {
  return (
    <div className="h-screen flex bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex-shrink-0">
        <Sidebar role={role} />
      </aside>

      {/* Main Section */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold capitalize">
            {role} Dashboard
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome
            </span>

            <div className="w-9 h-9 bg-green-500 text-white rounded-full flex items-center justify-center">
              S
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;