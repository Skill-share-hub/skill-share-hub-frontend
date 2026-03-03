import StudentDashboard from "./StudentDashboard";
import TutorDashboard from "./TutorDashboard";
import AdminDashboard from "./AdminDashboard";
import { useAppSelector } from "../../shared/hooks/redux";


const Dashboard = () => {
  const user = useAppSelector((state) => state.user.user);

  if (!user) return null; 

  switch (user.role) {
    case "student":
      return <StudentDashboard />;

    case "admin":
      return <AdminDashboard />;

    case "tutor":
    case "premiumTutor":
      return <TutorDashboard />;

    default:
      return null;
  }
};

export default Dashboard;
