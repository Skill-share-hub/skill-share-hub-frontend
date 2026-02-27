import type { UserRole } from "../../shared/types/user.Type";
type Props = {
  role: UserRole;
};

const Sidebar = ({ role }: Props) => {
  const studentNav = ["Dashboard", "My Courses", "Progress"];
  const tutorNav = ["Dashboard", "My Courses", "Create Course", "Analytics"];

  const navItems = role === "student" ? studentNav : tutorNav;

  return (
    <div className="h-full flex flex-col">

      {/* Logo Section */}
      <div className="h-16 flex items-center px-6 border-b font-bold text-lg">
        SkillShare Hub
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
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