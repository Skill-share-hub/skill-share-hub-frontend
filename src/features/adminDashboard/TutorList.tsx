import { useEffect, useState } from "react";
import api from "../../shared/services/axios";

export default function TutorList() {
  const [role, setRole] = useState("all");
  const [tutors, setTutors] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [isPremium, setIsPremium] = useState("");

  const fetchTutors = async () => {
    try {
      const res = await api.get("/admin/Users", {
        params: {
          page,
          limit,
          ...(search && { search }),
          ...(status && { status }),
          ...(isPremium !== "" && { isPremium }),
          ...(role && { role }),
        },
      });
      const data = res.data.data;
      setTutors(data.tutors || []);
    } catch (err: any) {
      console.log(err.message);
    }
  };
const getTitle = () => {
  if (role === "tutor") return "Tutors";
  if (role === "student") return "Students";
  if (role === "admin") return "Admins";
  return "All Users";
};
  useEffect(() => {
    fetchTutors();
  }, [page, search, status, isPremium, role]);

  return (
    <div className="min-h-screen bg-[#0d0f12] text-gray-100 p-8 font-mono">

      {/* Header */}
      <div className="mb-8 border-b border-gray-800 pb-6">
        <p className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-1">User Management</p>
        <h1 className="text-2xl font-semibold text-white tracking-tight">{getTitle()}</h1>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#161a1f] border border-gray-700 text-gray-200 text-sm pl-9 pr-4 py-2 rounded focus:outline-none focus:border-gray-500 placeholder-gray-600 transition-colors"
          />
        </div>

        {/* Role Filter */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-[#161a1f] border border-gray-700 text-gray-300 text-sm px-3 py-2 rounded focus:outline-none focus:border-gray-500 transition-colors cursor-pointer"
        >
          <option value="all">All Roles</option>
          <option value="tutor">Tutor</option>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-[#161a1f] border border-gray-700 text-gray-300 text-sm px-3 py-2 rounded focus:outline-none focus:border-gray-500 transition-colors cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="banned">Banned</option>
        </select>

        {/* Premium Filter */}
        <select
          value={isPremium}
          onChange={(e) => setIsPremium(e.target.value)}
          className="bg-[#161a1f] border border-gray-700 text-gray-300 text-sm px-3 py-2 rounded focus:outline-none focus:border-gray-500 transition-colors cursor-pointer"
        >
          <option value="">All Plans</option>
          <option value="true">Premium</option>
          <option value="false">Free</option>
        </select>

        <div className="ml-auto text-xs text-gray-600">
          {tutors.length} record{tutors.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#13161b] border-b border-gray-800">
              <th className="text-left px-5 py-3 text-xs font-medium tracking-widest text-gray-500 uppercase">
                Name
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium tracking-widest text-gray-500 uppercase">
                Email
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium tracking-widest text-gray-500 uppercase">
                Status
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium tracking-widest text-gray-500 uppercase">
                Plan
              </th>
              <th className="text-left px-5 py-3 text-xs font-medium tracking-widest text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800/60">
            {tutors.map((t: any) => (
              <tr
                key={t._id}
                className="bg-[#0d0f12] hover:bg-[#13161b] transition-colors group"
              >
                {/* Name + Avatar */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-semibold text-gray-300 shrink-0">
                      {t.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <span className="text-gray-200 font-medium">{t.name}</span>
                  </div>
                </td>

                {/* Email */}
                <td className="px-5 py-4 text-gray-400">{t.email}</td>

                {/* Status Badge */}
                <td className="px-5 py-4">
                  {t.status ? (
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium tracking-wide
                        ${t.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : t.status === "banned"
                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                          : "bg-gray-500/10 text-gray-400 border border-gray-600/30"
                        }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full
                        ${t.status === "active" ? "bg-emerald-400" :
                          t.status === "banned" ? "bg-red-400" : "bg-gray-500"}`}
                      />
                      {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                    </span>
                  ) : (
                    <span className="text-gray-600 text-xs">—</span>
                  )}
                </td>

                {/* Premium Badge */}
                <td className="px-5 py-4">
                  {t.isPremium ? (
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 tracking-wide">
                      ★ Premium
                    </span>
                  ) : (
                    <span className="text-xs text-gray-600">Free</span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-xs text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-2.5 py-1 rounded transition-colors">
                      View
                    </button>
                    <button className="text-xs text-gray-400 hover:text-red-400 border border-gray-700 hover:border-red-500/40 px-2.5 py-1 rounded transition-colors">
                      Ban
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {tutors.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-16 text-gray-600">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                        d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5M12 12a4 4 0 100-8 4 4 0 000 8z" />
                    </svg>
                    <span className="text-sm">No users found</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-5">
        <span className="text-xs text-gray-600">
          Page {page}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="text-xs px-3 py-1.5 rounded border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Prev
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={tutors.length < limit}
            className="text-xs px-3 py-1.5 rounded border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}