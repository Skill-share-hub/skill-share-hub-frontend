import type { UserRole } from "../../shared/types/user.Type";

type Props = {
  role: UserRole;
};

const Sidebar = ({ role }: Props) => {
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
    admin: [
      "Dashboard",
      "Users",
      "Tutor Approvals",
      "Reports",
      "Settings",
    ],
  };

  const navItemsRole = navItems[role];

  return (
    <div className="h-full flex flex-col">
      <div className="h-16 flex items-center px-6 border-b font-bold text-lg">
        SkillShare Hub
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItemsRole.map((item) => (
          <div
            key={item}
            className="px-4 py-2 rounded-md cursor-pointer hover:bg-gray-200 transition"
          >
            {item}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;