import { useState, useEffect } from "react";
import { useAppSelector } from "../../shared/hooks/redux";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "Courses Enrolled", value: "12", delta: "+2 this week", icon: "📚" },
  { label: "Hours Learned", value: "48", delta: "+5 today", icon: "⏱" },
  { label: "Certificates", value: "3", delta: "2 in progress", icon: "🎓" },
  { label: "Day Streak", value: "14", delta: "Personal best", icon: "🔥" },
];

const continueWatching = [
  { title: "React — The Complete Guide", instructor: "Maximilian S.", progress: 68, done: "28h", total: "42h", tag: "Web Development" },
  { title: "Python for Data Science", instructor: "Jose Portilla", progress: 34, done: "10h", total: "30h", tag: "Data Science" },
  { title: "UI/UX Design Fundamentals", instructor: "Daniel Scott", progress: 82, done: "14h", total: "18h", tag: "Design" },
];

const recommended = [
  { title: "Node.js — Backend Development", instructor: "Andrew Mead", rating: 4.8, students: "18,420", hours: "28h", tag: "Backend", free: true },
  { title: "Advanced CSS & Sass", instructor: "Jonas Schmedtmann", rating: 4.9, students: "34,100", hours: "22h", tag: "Frontend", free: false },
  { title: "Machine Learning A–Z", instructor: "Kirill Eremenko", rating: 4.7, students: "51,300", hours: "44h", tag: "Data Science", free: false },
  { title: "Figma UI Design Bootcamp", instructor: "Caleb Kingston", rating: 4.8, students: "12,800", hours: "16h", tag: "Design", free: true },
];

const Stars = ({ rating }: { rating: number }) => (
  <span className="text-amber-400 text-xs">
    {"★".repeat(Math.floor(rating))}
    {"☆".repeat(5 - Math.floor(rating))}
    <span className="text-gray-500 ml-1 font-medium">{rating}</span>
  </span>
);

const StudentDashboard = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [vis, setVis] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 60);
    return () => clearTimeout(t);
  }, []);

  if (!user) return null;

  const firstName = user.name.split(" ")[0];

  return (
    <div className="py-8 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="space-y-10">

        {/* HEADER */}
        <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all duration-500 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div>
            <p className="text-xs uppercase tracking-widest font-semibold text-green-800 mb-1">
              Student Dashboard
            </p>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome back, {firstName} 👋
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Pick up where you left off — your progress awaits.
            </p>
          </div>

          <button
            onClick={() => navigate("/courses")}
            className="bg-green-800 hover:bg-green-900 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            Explore Courses →
          </button>
        </div>

        {/* STATS */}
        <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-500 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>

          {stats.map((s) => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-xl px-5 py-4 hover:shadow-md transition">

              <div className="flex justify-between mb-3">
                <p className="text-xs font-semibold uppercase text-gray-400">{s.label}</p>
                <span>{s.icon}</span>
              </div>

              <p className="text-2xl font-bold text-gray-900">{s.value}</p>

              <span className="text-xs text-green-700 font-medium bg-green-50 px-2 py-1 rounded-full inline-block mt-2">
                {s.delta}
              </span>

            </div>
          ))}
        </div>

        {/* CONTINUE WATCHING */}
        <div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Continue Watching</h2>
            <button className="text-sm text-green-800 font-semibold hover:underline">
              View all
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {continueWatching.map((c) => (
              <div key={c.title} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition">

                <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded">
                  {c.tag}
                </span>

                <h3 className="font-semibold text-gray-900 mt-3">{c.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{c.instructor}</p>

                <div className="flex justify-between text-sm mb-2">
                  <span className="text-green-700 font-semibold">{c.progress}%</span>
                  <span className="text-gray-400">{c.done} / {c.total}</span>
                </div>

                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-700"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>

                <button className="mt-4 w-full py-2 rounded-lg border border-green-800 text-green-800 font-semibold hover:bg-green-800 hover:text-white transition">
                  Resume
                </button>

              </div>
            ))}

          </div>
        </div>

        {/* CTA */}
        <div className="bg-green-900 rounded-xl px-6 md:px-8 py-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

          <div>
            <p className="text-xs uppercase tracking-widest text-green-400 mb-2">
              Tutor Programme
            </p>

            <h2 className="text-xl font-bold text-white mb-2">
              Ready to Teach & Earn?
            </h2>

            <p className="text-green-200 text-sm max-w-xl">
              Share your expertise, build a student base, and earn credits plus real money.
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {["Earn Credits", "Real Money", "Analytics Dashboard", "Student Engagement"].map((t) => (
                <span key={t} className="text-xs text-green-300 border border-green-700 px-3 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="bg-white text-green-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Create Tutor Profile →
          </button>

        </div>

        {/* RECOMMENDED */}
        <div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recommended for You</h2>
            <button className="text-sm text-green-800 font-semibold hover:underline">
              See all
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

            {recommended.map((r) => (
              <div key={r.title} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition flex flex-col">

                <div className="flex justify-between mb-2">
                  <span className="text-xs text-gray-500 uppercase font-semibold">{r.tag}</span>

                  <span className={`text-xs px-2 py-1 rounded ${r.free ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                    {r.free ? "Free" : "Premium"}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-gray-900">{r.title}</h3>
                <p className="text-xs text-gray-400 mb-2">by {r.instructor}</p>

                <Stars rating={r.rating} />

                <div className="flex justify-between text-xs text-gray-500 mt-3 pt-3 border-t">
                  <span>{r.hours}</span>
                  <span>{r.students}</span>
                </div>

              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;