import type { User } from "../../shared/types/user.Type";
import StudentDashboard from "./StudentDashboard";
import TutorDashboard from "./TutorDashboard";
import AdminDashboard from "./AdminDashboard";

type Props = {
  user: User;
};

const Dashboard = ({ user }: Props) => {
  if (user.role === "student") {
    return <StudentDashboard />;
  }

  if (user.role === "admin") {
    return <AdminDashboard />;
  }

  return <TutorDashboard role={user.role} />;
};

export default Dashboard;