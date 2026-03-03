import StudentDashboard from "./StudentDashboard";
import TutorDashboard from "./TutorDashboard";
import AdminDashboard from "./AdminDashboard";
import { useAppSelector } from "../../shared/hooks/redux";


const Dashboard = () => {
  const role = useAppSelector((state) => state.user.role);
  switch (role) {
    case "student":
      return <StudentDashboard />;
    case "admin":
      return <AdminDashboard />;
    default:
      return <TutorDashboard />;
  }
};

export default Dashboard;
