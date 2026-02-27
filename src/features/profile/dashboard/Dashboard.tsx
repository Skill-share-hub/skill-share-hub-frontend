import type { User } from "../../shared/types/user.Type";
import StudentDashboard from "./StudentDashboard";
import TutorDashboard from "./TutorDashboard";

type Props = {
  user: User;
};

const Dashboard = ({ user }: Props) => {
  if (user.role === "student") {
    return <StudentDashboard />;
  }

  return <TutorDashboard />;
};

export default Dashboard;