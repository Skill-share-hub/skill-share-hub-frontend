import { useState, useEffect } from "react";
import { useAppSelector } from "../../shared/hooks/redux";
import { useNavigate } from "react-router-dom";
import api from "../../shared/services/axios";
import { 
  BookOpen, 
  PlayCircle, 
  Clock, 
  CheckCircle2, 
  Wallet, 
  Star, 
  Users, 
  ArrowRight, 
  ChevronRight,
  TrendingUp,
  Award,
  Zap
} from "lucide-react";

/* ─── tiny helpers ─────────────────────────────────────── */

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1.5">
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={`${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
        />
      ))}
    </div>
    <span className="text-xs font-bold text-gray-500">{rating.toFixed(1)}</span>
  </div>
);

const ProgressRing = ({ pct }: { pct: number }) => {
  const r = 18;
  const circ = 2 * Math.PI * r;
  const dash = circ * (pct / 100);
  return (
    <svg className="w-12 h-12 -rotate-90 drop-shadow-sm" viewBox="0 0 44 44">
      <circle cx="22" cy="22" r={r} fill="none" stroke="#f1f5f9" strokeWidth="4" />
      <circle
        cx="22"
        cy="22"
        r={r}
        fill="none"
        stroke="url(#progress-gradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
      />
      <defs>
        <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
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
      try {
        const res = await api.get("/dashboard/student");
        const data = res.data;
        setEnrolledData(data.enrolledCourses);
        setRecommendedCourse(data.recommendedCourses);
        setAvailableCredit(data.creditBalance);
        setContinueWatchingData(data.continueWatching);
        setTotalHours(data.totalHours);
        setWatchedHours(data.watchedHours);
        setCompletedHours(data.completedHours);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (!user) return null;

  const firstName = user.name.split(" ")[0];

  const stats = [
    { label: "Enrolled", value: enrolledData?.length || 0, icon: <BookOpen size={20} />, color: "bg-blue-50 text-blue-600", sub: "courses" },
    { label: "Watched", value: watchedHours, icon: <PlayCircle size={20} />, color: "bg-emerald-50 text-emerald-600", sub: "hours" },
    { label: "Total", value: totalHours, icon: <Clock size={20} />, color: "bg-indigo-50 text-indigo-600", sub: "tracking" },
    { label: "Completed", value: completedHours, icon: <CheckCircle2 size={20} />, color: "bg-emerald-100 text-emerald-700", sub: "milestones" },
  ];

  /* animation helper */
  const fade = () =>
    `transition-all duration-700 ease-out ${
      vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`;

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* ── HEADER ── */}
        <div
          className={`flex flex-col md:flex-row md:items-center justify-between gap-6 ${fade()}`}
          style={{ transitionDelay: "0ms" }}
        >
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-500 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-emerald-200 transition-transform group-hover:scale-105">
                {firstName[0]}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <Award size={12} className="text-emerald-600" />
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
                  Student Account
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <TrendingUp size={10} /> Active Learner
                </span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">
                Welcome back, {firstName}
              </h1>
              <p className="text-sm text-slate-400 mt-2 font-medium">
                Your learning path is looking great. Ready for today's lesson?
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end px-6 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group cursor-default">
              <div className="flex items-center gap-2 mb-0.5">
                <Wallet size={14} className="text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Credit Balance</span>
              </div>
              <p className="text-2xl font-black text-slate-900 tabular-nums">{availableCredit}</p>
            </div>
            <button
              onClick={() => navigate("/courses")}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-[13px] font-black uppercase tracking-widest px-7 py-4 rounded-2xl shadow-xl shadow-emerald-200 transition-all group"
            >
              Explore Courses
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* ── STATS ── */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 ${fade()}`}
          style={{ transitionDelay: "100ms" }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl ${s.color} transition-colors group-hover:bg-slate-900 group-hover:text-white`}>
                  {s.icon}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
                <div className="flex items-baseline gap-1.5">
                  <p className="text-3xl font-black text-slate-900 tabular-nums tracking-tighter">{s.value}</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{s.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CONTINUE WATCHING ── */}
        <div className={fade()} style={{ transitionDelay: "200ms" }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-emerald-600 rounded-full"></div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Continue Learning</h2>
            </div>
            <button className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700 transition-colors group">
              View History
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {continueWatchingData.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-slate-100 rounded-[2.5rem] py-16 text-center flex flex-col items-center group cursor-pointer hover:border-emerald-200 transition-colors" onClick={() => navigate("/courses")}>
              <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mb-4 transition-colors group-hover:bg-emerald-50 group-hover:text-emerald-400">
                <Zap size={24} />
              </div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">No active sessions</p>
              <p className="text-slate-300 text-xs mt-1">Start your learning journey today!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {continueWatchingData.map((r) => (
                <div
                  key={r._id}
                  className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={r.courseId.thumbnailUrl}
                      alt={r.courseId.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <PlayCircle size={48} className="text-white drop-shadow-lg" />
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md rounded-2xl p-1 shadow-lg ring-1 ring-black/5">
                      <div className="relative flex items-center justify-center">
                        <ProgressRing pct={r.progress} />
                        <span className="absolute text-[10px] font-black text-emerald-700">{r.progress}%</span>
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 flex gap-2">
                       <span className="px-3 py-1 text-[9px] font-black text-white bg-slate-900/40 backdrop-blur-md rounded-lg uppercase tracking-widest">
                        {r.courseId.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-black text-slate-900 text-base leading-snug line-clamp-2 mb-1 group-hover:text-emerald-700 transition-colors">
                      {r.courseId.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mb-6">
                       <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-500">
                          {r.courseId.tutorId?.name?.[0]}
                       </div>
                       <p className="text-[10px] font-bold text-slate-400 capitalize">by {r.courseId.tutorId?.name}</p>
                    </div>

                    <div className="mt-auto space-y-4">
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">Modules Left</p>
                          <p className="text-xs font-black text-slate-700">3 of 12 complete</p>
                        </div>
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{r.progress}%</span>
                      </div>
                      
                      <div className="h-2 bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-100/50">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${r.progress}%` }}
                        />
                      </div>

                      <button
                        className="w-full py-3.5 rounded-xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-200 active:scale-[0.98] transition-all duration-200"
                        onClick={() => navigate(`/courses/${r.courseId._id}`)}
                      >
                        Resume Learning
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
          className={`relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-10 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl shadow-slate-200 ${fade()}`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-600/10 to-transparent pointer-events-none" />
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-emerald-500/10 blur-[80px]" />

          <div className="relative z-10 text-center lg:text-left max-w-2xl">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
               <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg border border-emerald-500/20">
                Tutor Opportunity
               </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight leading-tight">
              Turn your expertise into <span className="text-emerald-500">Earnings</span>
            </h2>
            <p className="text-slate-400 text-base font-medium leading-relaxed mb-8">
              Join our premium tutor network, reach thousands of global students, and get paid for what you know best.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {[
                { label: "High Revenue", icon: <TrendingUp size={12}/> },
                { label: "Analytics Tools", icon: <Award size={12}/> },
                { label: "Global Reach", icon: <Users size={12}/> }
              ].map((t) => (
                <div
                  key={t.label}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-300"
                >
                  {t.icon}
                  {t.label}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="flex-shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[13px] uppercase tracking-widest px-10 py-5 rounded-2xl shadow-xl shadow-emerald-600/20 hover:shadow-emerald-500/30 transition-all active:scale-95 group"
          >
            Become a Tutor 
            <ArrowRight size={16} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* ── RECOMMENDED ── */}
        <div className={fade()} style={{ transitionDelay: "400ms" }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-slate-900 rounded-full"></div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Recommended For You</h2>
            </div>
            <button className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors group">
              Browse All
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {enrolledData.length === 0 && recommendedCourse.length === 0 ? (
                <div className="col-span-full py-20 text-center">
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Looking for inspiration?</p>
                </div>
            ) : (
                recommendedCourse.map((r) => (
                    <div
                      key={r._id}
                      className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 cursor-pointer transition-all duration-500 group relative flex flex-col"
                      onClick={() => navigate(`/courses/${r._id}`)}
                    >
                      <div className="relative h-40 overflow-hidden bg-slate-100">
                        <img
                          src={r.thumbnailUrl}
                          alt={r.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className={`absolute top-3 right-3 px-3 py-1 font-black text-[9px] uppercase tracking-widest rounded-lg shadow-sm border ${
                            r.courseType === "free" 
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                              : "bg-amber-50 text-amber-700 border-amber-100"
                          }`}>
                          {r.courseType === "free" ? "Free" : "Premium"}
                        </div>
                      </div>
      
                      <div className="p-5 flex flex-col flex-1">
                        <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-1.5">{r.category || "General"}</p>
                        <h3 className="text-sm font-black text-slate-900 leading-snug line-clamp-2 mb-2 group-hover:text-emerald-700 transition-colors">
                          {r.title}
                        </h3>
                        <p className="text-[10px] font-bold text-slate-400 mb-4 capitalize">by {r.tutorId?.name || "Expert Tutor"}</p>
      
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                          <Stars rating={r.ratingsAverage || 5} />
                          <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px]">
                            <Users size={12} />
                            <span>{(r.totalEnrollments || 0).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
