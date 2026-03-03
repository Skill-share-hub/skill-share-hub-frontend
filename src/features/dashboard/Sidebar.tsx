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
    <div>
      <h2>SkillShare Hub</h2>
      <nav>
        {navItems[user.role].map((item) => (
          <div key={item}>{item}</div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;