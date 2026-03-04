import { useAppSelector } from "../../shared/hooks/redux";
import type { UserRole } from "../../shared/types/user.Type";

const Sidebar = () => {
  const user = useAppSelector((state) => state.user.user);

  if (!user) return null;

  const navItems: Record<UserRole, string[]> = {
    student: ["Dashboard", "Courses", "Progress"],
    tutor: ["Dashboard", "My Courses", "Create Course"],
    premiumTutor: [
      "Dashboard",
      "My Courses",
      "Create Course",
      "Analytics",
      "Revenue",
    ],
    admin: ["Dashboard", "Users", "Tutor Approvals", "Reports", "Settings"],
  };

  return (
    <div className="h-full flex flex-col">

      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b">
        <div className="w-8 h-8 bg-green-600 text-white flex items-center justify-center rounded-lg mr-3">
          📚
        </div>
        <span className="font-semibold text-lg">SkillShare Hub</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">

        {navItems[user.role].map((item) => (
          <div
            key={item}
            className="px-4 py-2 rounded-lg cursor-pointer text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
          >
            {item}
          </div>
        ))}

      </nav>

      {/* User Section */}
      <div className="p-4 border-t text-sm text-gray-500">
        Logged in as
        <div className="font-semibold text-gray-700 capitalize">
          {user.role}
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
