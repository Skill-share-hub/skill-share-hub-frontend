import DashboardLayout from "../../layouts/DashboardLayout";
import { useAppSelector } from "../../shared/hooks/redux";


const TutorDashboard = () => {
  const role = useAppSelector(state => state.user.role);
   if (!role) return null;
   return(
  <DashboardLayout role={role}>
    <h1>Tutor Dashboard</h1>
    <div>My Courses</div>
    <div>Create Course</div>

    {role === "premiumTutor" && (
      <div>
        <h2>Premium Insights</h2>
        <p>Advanced Analytics</p>
        <p>Revenue Breakdown</p>
      </div>
    )}
  </DashboardLayout>
  );
};

export default TutorDashboard;
