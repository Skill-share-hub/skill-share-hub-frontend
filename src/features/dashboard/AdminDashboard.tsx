import DashboardLayout from "../../layouts/DashboardLayout";

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <h1>Admin Dashboard</h1>

      <div>
        <p>Manage Users</p>
        <p>Approve Tutors</p>
        <p>View Reports</p>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;