import StudentDashboard from "./StudentDashboard";
import TutorDashboard from "./TutorDashboard";
import AdminDashboard from "./AdminDashboard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux";
import { fetchDashboard } from "./dashboardThunk";

const Dashboard = () => {
  const user = useAppSelector((state) => state.user.user);
const dispatch = useAppDispatch();
const { data, loading } = useAppSelector((state) => state.dashboard);

useEffect(() => {
  dispatch(fetchDashboard());
}, [dispatch]);
  if (!user) return null; 
if (loading) return <p>Loading...</p>;
if (!data) return <p>No data</p>;
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
