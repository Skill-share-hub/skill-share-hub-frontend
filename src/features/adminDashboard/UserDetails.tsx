import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../shared/services/axios";

type UserDetailsType = {
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
    isBlocked: boolean;
    userCreditBalance?: number;
    enrolledCourses?: string[];
    tutorProfile?: {
      createdCourses?: string[];
      earningsTotal?: number;
    };
  };
  student: {
    totalEnrolled: number;
    credits: number;
  };
  tutor: {
    totalCourses: number;
    totalEnrollments: number;
    totalEarnings: number;
  };
};

// ── Reusable field row ──────────────────────────────────────────────────────
function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-white/5 last:border-0">
      <span className="text-xs font-semibold tracking-widest uppercase text-slate-500">
        {label}
      </span>
      <span className="text-sm text-slate-200 text-right">{value}</span>
    </div>
  );
}

// ── Stat card ───────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-lg p-4 flex flex-col gap-1 border ${
        accent
          ? "bg-indigo-950/40 border-indigo-500/20"
          : "bg-white/[0.03] border-white/5"
      }`}
    >
      <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-500">
        {label}
      </span>
      <span className="text-2xl font-bold text-slate-100">{value}</span>
    </div>
  );
}

// ── Section wrapper ─────────────────────────────────────────────────────────
function Section({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#0f1117] overflow-hidden">
      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.07] bg-white/[0.02]">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-slate-400">
          {title}
        </h2>
        {badge && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium tracking-wide">
            {badge}
          </span>
        )}
      </div>
      <div className="px-5 py-1">{children}</div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────
export default function UserDetails() {
  const { id } = useParams();
  const [data, setData] = useState<UserDetailsType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/admin/Users/${id}/details`);
        setData(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  // ── Loading state ─────────────────────────────────────────────────────────
  if (loading || !data) {
    return (
      <div className="min-h-screen bg-[#080b10] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          <p className="text-xs tracking-widest uppercase text-slate-500">
            Fetching user data
          </p>
        </div>
      </div>
    );
  }

  const { user, student, tutor } = data;

  const isTutor =
    user.role === "tutor" ||
    user.role === "premiumTutor" ||
    !!user.tutorProfile;

  const isStudent =
    user.role === "student" ||
    student.totalEnrolled > 0 ||
    student.credits > 0;

  // ── Role badge label ──────────────────────────────────────────────────────
  const roleBadgeColor: Record<string, string> = {
    admin: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    tutor: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    premiumTutor: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    student: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  const roleClass =
    roleBadgeColor[user.role] ??
    "bg-slate-500/10 text-slate-400 border-slate-500/20";

  return (
    <div className="min-h-screen bg-[#080b10] text-slate-100 px-4 py-10 sm:px-8">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* ── Page Header ── */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-[10px] tracking-widest uppercase text-slate-500 mb-1">
              Admin Panel
            </p>
            <h1 className="text-xl font-bold text-slate-100 tracking-tight">
              User Details
            </h1>
          </div>
          <span
            className={`text-[11px] px-3 py-1 rounded-full border font-semibold tracking-wide ${roleClass}`}
          >
            {user.role}
          </span>
        </div>

        {/* ── Profile Section ── */}
        <Section title="Profile Information">
          <Field label="Full Name" value={user.name} />
          <Field label="Email Address" value={user.email} />
          <Field label="User ID" value={
            <span className="font-mono text-xs text-slate-400">{user._id}</span>
          } />
          <Field
            label="Account Status"
            value={
              user.isBlocked ? (
                <span className="inline-flex items-center gap-1.5 text-red-400 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                  Blocked
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Active
                </span>
              )
            }
          />
        </Section>

        {/* ── Student Section ── */}
        {isStudent && (
          <Section title="Student Overview" badge="Student">
            <div className="grid grid-cols-2 gap-3 py-4">
              <StatCard label="Enrolled Courses" value={student.totalEnrolled} />
              <StatCard label="Credit Balance" value={student.credits} accent />
            </div>
          </Section>
        )}

        {/* ── Tutor Section ── */}
        {isTutor && (
          <Section title="Tutor Overview" badge="Tutor">
            <div className="grid grid-cols-3 gap-3 py-4">
              <StatCard label="Courses Created" value={tutor.totalCourses} />
              <StatCard label="Total Enrollments" value={tutor.totalEnrollments} />
              <StatCard
                label="Total Earnings"
                value={`₹${tutor.totalEarnings.toLocaleString("en-IN")}`}
                accent
              />
            </div>
          </Section>
        )}

      </div>
    </div>
  );
}