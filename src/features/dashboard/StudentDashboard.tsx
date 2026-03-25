import { useState, useEffect } from "react";
import { useAppSelector } from "../../shared/hooks/redux";
import { useNavigate } from "react-router-dom";
import api from "../../shared/services/axios";

/* ─── tiny helpers ─────────────────────────────────────── */

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    <div className="flex">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${i < Math.floor(rating) ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <span className="text-xs font-semibold text-gray-600">{rating.toFixed(1)}</span>
  </div>
);

const ProgressRing = ({ pct }: { pct: number }) => {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const dash = circ * (pct / 100);
  return (
    <svg className="w-12 h-12 -rotate-90" viewBox="0 0 44 44">
      <circle cx="22" cy="22" r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
      <circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke="#15803d"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
      />
    </svg>
  );
};

/* ─── main component ────────────────────────────────────── */

const StudentDashboard = () => {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [vis, setVis] = useState(false);
  const [enrolledData, setEnrolledData] = useState<any[]>([]);
  const [recommendedCourse, setRecommendedCourse] = useState<any[]>([]);
  const [continueWatchingData, setContinueWatchingData] = useState<any[]>([]);
  const [totalHours, setTotalHours] = useState(0);
  const [watchedHours, setWatchedHours] = useState(0);
  const [completedHours, setCompletedHours] = useState(0);
  const [availableCredit, setAvailableCredit] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const res = await api.get("/dashboard/student");
      const data = res.data;
      setEnrolledData(data.enrolledCourses);
      setRecommendedCourse(data.recommendedCourses);
      setAvailableCredit(data.creditBalance);
      setContinueWatchingData(data.continueWatching);
      setTotalHours(data.totalHours);
      setWatchedHours(data.watchedHours);
      setCompletedHours(data.completedHours);
    };
    getData();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 60);
    return () => clearTimeout(t);
  }, []);

  if (!user) return null;

  const firstName = user.name.split(" ")[0];

  const stats = [
    { label: "Enrolled", value: enrolledData?.length || 0, icon: "📚", sub: "courses" },
    { label: "Watched", value: watchedHours, icon: "📽️", sub: "hours" },
    { label: "Total", value: totalHours, icon: "⏱", sub: "hours" },
    { label: "Completed", value: completedHours, icon: "✅", sub: "hours" },
  ];

  const formattedRecommended = recommendedCourse.map((r) => ({
    title: r.title,
    courseId: r._id,
    instructor: r.tutorId?.name || "Unknown",
    image: r.thumbnailUrl,
    tag: r.category,
    free: r.courseType === "free",
    rating: r.ratingsAverage || 0,
    students: r.totalEnrollments || 0,
  }));

  /* animation helper */
  const fade = (delay = 0) =>
    `transition-all duration-700 ease-out ${
      vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

        {/* ── HEADER ── */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${fade()}`}
          style={{ transitionDelay: "0ms" }}
        >
          <div className="flex items-center gap-4">
            {/* avatar */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-700 to-emerald-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-green-200 flex-shrink-0">
              {firstName[0]}
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-green-700">
                Student Dashboard
              </p>
              <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
                Welcome back, {firstName} 👋
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Pick up where you left off — your progress awaits.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* credits badge */}
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5">
              <span className="text-amber-500 text-lg">💰</span>
              <div>
                <p className="text-xs text-amber-600 font-semibold uppercase tracking-wide leading-none">Credits</p>
                <p className="text-lg font-extrabold text-amber-700 leading-tight">{availableCredit}</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/courses")}
              className="bg-green-700 hover:bg-green-800 active:scale-95 text-white text-sm font-bold px-5 py-3 rounded-xl shadow-md shadow-green-200 transition-all duration-150"
            >
              Explore Courses →
            </button>
          </div>
        </div>

        {/* ── STATS ── */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${fade()}`}
          style={{ transitionDelay: "80ms" }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="bg-white border border-gray-100 rounded-2xl px-5 py-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{s.label}</p>
                <span className="text-xl leading-none">{s.icon}</span>
              </div>
              <p className="text-3xl font-extrabold text-gray-900 tabular-nums">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1 font-medium">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* ── CONTINUE WATCHING ── */}
        <div className={fade()} style={{ transitionDelay: "160ms" }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-extrabold text-gray-900">Continue Watching</h2>
            <button className="text-sm text-green-700 font-bold hover:underline underline-offset-2">
              View all
            </button>
          </div>

          {continueWatchingData.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 text-center text-gray-400 text-sm">
              No courses in progress yet. Start one below!
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {continueWatchingData.map((r) => (
                <div
                  key={r._id}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
                >
                  {/* thumbnail */}
                  <div className="relative h-36 overflow-hidden bg-gray-100">
                    <img
                      src={r.courseId.thumbnailUrl}
                      alt={r.courseId.title}
                      className="w-full h-full object-cover"
                    />
                    {/* progress ring overlay */}
                    <div className="absolute bottom-3 right-3 bg-white rounded-full p-0.5 shadow-md">
                      <div className="relative flex items-center justify-center">
                        <ProgressRing pct={r.progress} />
                        <span className="absolute text-[10px] font-extrabold text-green-700">{r.progress}%</span>
                      </div>
                    </div>
                    <span className="absolute top-3 left-3 text-xs font-bold text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded-lg">
                      {r.courseId.category}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2">
                      {r.courseId.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 mb-4">by {r.courseId.tutorId?.name}</p>

                    {/* progress bar */}
                    <div className="mt-auto">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-400 font-medium">Progress</span>
                        <span className="text-green-700 font-bold">{r.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
                          style={{ width: `${r.progress}%` }}
                        />
                      </div>

                      <button
                        className="mt-4 w-full py-2.5 rounded-xl border-2 border-green-700 text-green-700 text-sm font-bold hover:bg-green-700 hover:text-white active:scale-95 transition-all duration-150"
                        onClick={() => navigate(`/courses/${r.courseId._id}`)}
                      >
                        ▶ Resume
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── CTA BANNER ── */}
        <div
          className={`relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 rounded-3xl px-7 md:px-10 py-9 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl shadow-green-900/20 ${fade()}`}
          style={{ transitionDelay: "240ms" }}
        >
          {/* decorative circles */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute -bottom-8 -right-4 w-32 h-32 rounded-full bg-white/5" />
          <div className="absolute top-4 right-32 w-16 h-16 rounded-full bg-white/5" />

          <div className="relative z-10">
            <p className="text-xs uppercase tracking-widest text-emerald-300 font-bold mb-2">
              Tutor Programme
            </p>
            <h2 className="text-xl md:text-2xl font-extrabold text-white mb-2">
              Ready to Teach & Earn?
            </h2>
            <p className="text-green-200 text-sm max-w-lg leading-relaxed">
              Share your expertise, build a student base, and earn credits plus real money.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {["Earn Credits", "Real Money", "Analytics Dashboard", "Student Engagement"].map((t) => (
                <span
                  key={t}
                  className="text-xs text-emerald-200 border border-emerald-600 bg-emerald-900/40 px-3 py-1 rounded-full font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="relative z-10 flex-shrink-0 bg-white text-green-900 font-extrabold text-sm px-7 py-3.5 rounded-xl hover:bg-gray-50 active:scale-95 shadow-lg transition-all duration-150"
          >
            Create Tutor Profile →
          </button>
        </div>

        {/* ── RECOMMENDED ── */}
        <div className={fade()} style={{ transitionDelay: "320ms" }}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-extrabold text-gray-900">Recommended for You</h2>
            <button className="text-sm text-green-700 font-bold hover:underline underline-offset-2">
              See all
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {formattedRecommended.map((r) => (
              <div
                key={r.courseId}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-200 flex flex-col group"
                onClick={() => navigate(`/courses/${r.courseId}`)}
              >
                {/* thumbnail */}
                <div className="relative h-28 overflow-hidden bg-gray-100">
                  <img
                    src={r.image}
                    alt={r.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span
                    className={`absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-lg ${
                      r.free
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {r.free ? "Free" : "Premium"}
                  </span>
                </div>

                <div className="p-3.5 flex flex-col flex-1">
                  <span className="text-xs text-gray-400 uppercase font-bold tracking-wide mb-1">
                    {r.tag}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 mb-1">
                    {r.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-2">by {r.instructor}</p>

                  <Stars rating={r.rating} />

                  <div className="flex justify-between text-xs text-gray-400 mt-3 pt-3 border-t border-gray-50">
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {r.students.toLocaleString()}
                    </span>
                  </div>
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
