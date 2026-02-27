import DashboardLayout from "../../layout/DashboardLayout";

type props={
role: "tutor" | "premiumTutor";
}
const TutorDashboard = ({role}:props) => {
  return (
    <DashboardLayout role={role}>
      <h1>Tutor Dashboard</h1>
      <div>My Courses</div>
      <div>Create Course</div>
      {role === "premiumTutor" && (
        <div>
          <h2>Premium Insights</h2>
          <p>Advanced Analytics</p>
          <p>Revenue Breakdown</p>
        </div>      )}
    </DashboardLayout>
  );
};

export default TutorDashboard;