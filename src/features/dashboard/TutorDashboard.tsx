import DashboardLayout from "../../layouts/DashboardLayout";
import { useAppSelector } from "../../shared/hooks/redux";

const TutorDashboard = () => {
  const user = useAppSelector((state) => state.user.user);

  if (!user) return null;

  return (
    <DashboardLayout>
      <h1>Tutor Dashboard</h1>
      <div>My Courses</div>
      <div>Create Course</div>

      {user.role === "premiumTutor" && (
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