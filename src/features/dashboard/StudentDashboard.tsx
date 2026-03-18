import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux";
import { fetchDashboard } from "./dashboardThunk";
import RecommendedCourses from "../courses/components/CourseDetails/RecommendedCourses";

const StudentDashboard = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.dashboard);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    if (!data) dispatch(fetchDashboard());
  }, [data, dispatch]);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 50);
    return () => clearTimeout(t);
  }, []);

  if (!user) return null;

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!data)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-sm text-gray-400">No data available.</p>
      </div>
    );

  const firstName = user.name.split(" ")[0];

  return (
    <div className="py-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

      {/* HEADER */}
      <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div>
          <p className="text-xs uppercase tracking-widest font-semibold text-emerald-700 mb-1">
            Student Dashboard
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Welcome back, {firstName} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Pick up where you left off — your progress awaits.
          </p>
        </div>
        <button
          onClick={() => navigate("/courses")}
          className="self-start md:self-auto bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-200"
        >
          Explore Courses →
        </button>
      </div>

      {/* STATS */}
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 delay-100 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        {data.stats?.map((s: any) => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{s.label}</p>
              <span className="text-lg">{s.icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-1 rounded-full inline-block mt-2">
              {s.delta}
            </span>
          </div>
        ))}
      </div>

      {/* CONTINUE WATCHING */}
      <div className={`transition-all duration-700 delay-150 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">Continue Watching</h2>
          <button className="text-sm text-emerald-700 font-semibold hover:underline underline-offset-2">
            View all
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.continueWatching?.map((c: any) => (
            <div key={c.title} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
              <span className="self-start text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                {c.tag}
              </span>
              <h3 className="font-semibold text-gray-900 mt-3 leading-snug">{c.title}</h3>
              <p className="text-sm text-gray-400 mt-0.5 mb-4">{c.instructor}</p>
              <div className="mt-auto">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-emerald-700 font-semibold">{c.progress}% complete</span>
                  <span className="text-gray-400">{c.done} / {c.total} lessons</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
                <button className="mt-4 w-full py-2.5 rounded-lg border border-emerald-700 text-emerald-700 text-sm font-semibold hover:bg-emerald-700 hover:text-white transition-colors duration-200">
                  Resume
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA BANNER */}
      <div className={`bg-emerald-900 rounded-2xl px-6 md:px-10 py-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-all duration-700 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div>
          <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2">
            Tutor Programme
          </p>
          <h2 className="text-xl font-bold text-white mb-2 tracking-tight">
            Ready to Teach & Earn?
          </h2>
          <p className="text-emerald-200 text-sm max-w-xl leading-relaxed">
            Share your expertise, build a student base, and earn credits plus real money.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["Earn Credits", "Real Money", "Analytics Dashboard", "Student Engagement"].map((t) => (
              <span key={t} className="text-xs text-emerald-300 border border-emerald-700 px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => navigate("/profile")}
          className="shrink-0 bg-white text-emerald-900 font-semibold text-sm px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Create Tutor Profile →
        </button>
      </div>

      {/* RECOMMENDED */}
      <div className={`transition-all duration-700 delay-300 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">Recommended for You</h2>
          <button
            onClick={() => navigate("/courses")}
            className="text-sm text-emerald-700 font-semibold hover:underline underline-offset-2"
          >
            See all
          </button>
        </div>

        {/* ✅ No grid wrapper — RecommendedCourses owns its own grid */}
        <RecommendedCourses />
      </div>

    </div>
  );
};

export default StudentDashboard;