import DashboardLayout from "../../layouts/DashboardLayout";
import { useAppSelector } from "../../shared/hooks/redux";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <DashboardLayout>

      {/* Welcome Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-500 mt-1">
            Ready to continue your learning journey?
          </p>
        </div>

        <button className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition">
          Explore All Courses
        </button>
      </div>


      {/* Tutor CTA Card */}
      <div className="bg-green-700 text-white p-6 rounded-xl flex justify-between items-center mb-10">
        <div>
          <h2 className="text-xl font-semibold mb-1">
            Ready to Teach? ✨
          </h2>
          <p className="text-sm opacity-90 max-w-lg">
            Share your knowledge and earn credits + real money! 
            Create courses, engage with students, and build your teaching portfolio.
          </p>

          <div className="flex gap-3 mt-3 text-xs">
            <span className="bg-white/20 px-3 py-1 rounded-full">
              Earn Credits
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              Real Money
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              Analytics
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full">
              Student Engagement
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate("/profile")}
          className="bg-white text-green-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Create Tutor Profile
        </button>
      </div>


      {/* Learning Pathways */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Your Learning Pathways
        </h2>
        <p className="text-gray-500 mb-6">
          Curated learning paths based on your interests
        </p>

        <div className="grid grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <div className="text-3xl mb-3">💻</div>
            <h3 className="font-semibold">Web Development</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold">Data Science</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-semibold">Design</h3>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <div className="text-3xl mb-3">🧮</div>
            <h3 className="font-semibold">Finance</h3>
          </div>
        </div>
      </div>

    </DashboardLayout>
  );
};

export default StudentDashboard;
