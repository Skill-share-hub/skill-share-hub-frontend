import DashboardLayout from "../../layouts/DashboardLayout";
import { useAppSelector } from "../../shared/hooks/redux";

const TutorDashboard = () => {
  const user = useAppSelector((state) => state.user.user);

  if (!user) return null;

  return (
    <div>

 

      {/* Welcome Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your courses and track your teaching performance.
          </p>
        </div>

        <button className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition">
          Create Course
        </button>
      </div>


      {/* Tutor Stats */}
      <div className="grid grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-sm text-gray-500 mb-2">Total Courses</h3>
          <p className="text-2xl font-bold">3</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-sm text-gray-500 mb-2">Total Students</h3>
          <p className="text-2xl font-bold">120</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-sm text-gray-500 mb-2">Total Earnings</h3>
          <p className="text-2xl font-bold">$540</p>
        </div>

      </div>


      {/* My Courses Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          My Courses
        </h2>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="font-semibold mb-2">React for Beginners</h3>
            <p className="text-sm text-gray-500">45 Students Enrolled</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="font-semibold mb-2">JavaScript Mastery</h3>
            <p className="text-sm text-gray-500">60 Students Enrolled</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h3 className="font-semibold mb-2">Node.js API Design</h3>
            <p className="text-sm text-gray-500">15 Students Enrolled</p>
          </div>

        </div>
      </div>


      {/* Premium Tutor Section */}
      {user.role === "premiumTutor" && (
        <div className="bg-purple-100 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">
            Premium Insights
          </h2>

          <div className="grid grid-cols-2 gap-6">

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm text-gray-500">Analytics</h3>
              <p className="font-semibold">Course engagement insights</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm text-gray-500">Revenue</h3>
              <p className="font-semibold">Detailed earnings breakdown</p>
            </div>

          </div>
        </div>
      )}

       </div>
  );
};

export default TutorDashboard;
