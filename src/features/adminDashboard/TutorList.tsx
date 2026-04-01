import { useEffect, useState } from "react";
import api from "../../shared/services/axios";
import { useNavigate } from "react-router-dom";

export default function TutorList() {
  const [role, setRole] = useState("all");
  const [tutors, setTutors] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [isPremium, setIsPremium] = useState("");
  const navigate = useNavigate();

  const fetchTutors = async () => {
    try {
      const res = await api.get("/admin/Users", {
        params: {
          page,
          limit,
          ...(search && { search }),
          ...(status && { status }),
          ...(isPremium !== "" && { isPremium }),
          ...(role !== "all" && { role }),
        },
      });
      const data = res.data.data;
      setTutors(data.tutors || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };

  const getTitle = () => {
    if (role === "tutor") return "Tutors";
    if (role === "student") return "Students";
    return "All Users";
  };

  useEffect(() => {
    fetchTutors();
  }, [page, search, status, isPremium, role]);

  return (
    <div className="min-h-screen bg-[#0d0f12] text-gray-100 p-4 md:p-8 font-mono">
      {/* Header */}
      <div className="mb-8 border-b border-gray-800 pb-6">
        <p className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-1">User Management</p>
        <h1 className="text-2xl font-semibold text-white tracking-tight">{getTitle()}</h1>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#161a1f] border border-gray-700 text-gray-200 text-sm pl-4 pr-4 py-2 rounded focus:outline-none focus:border-gray-500"
          />
        </div>

        <select value={role} onChange={(e) => setRole(e.target.value)} className="bg-[#161a1f] border border-gray-700 text-sm px-3 py-2 rounded outline-none text-gray-300">
          <option value="all">All Roles</option>
          <option value="tutor">Tutor</option>
          <option value="student">Student</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-[#161a1f] border border-gray-700 text-sm px-3 py-2 rounded outline-none text-gray-300">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>

        <select value={isPremium} onChange={(e) => setIsPremium(e.target.value)} className="bg-[#161a1f] border border-gray-700 text-sm px-3 py-2 rounded outline-none text-gray-300">
          <option value="">All Plans</option>
          <option value="true">Premium</option>
          <option value="false">Free</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-gray-800 overflow-hidden bg-[#0d0f12]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="bg-[#13161b] border-b border-gray-800">
                <th className="text-left px-5 py-3 text-xs font-medium tracking-widest text-gray-500 uppercase">Name</th>
                <th className="text-left px-5 py-3 text-xs font-medium tracking-widest text-gray-500 uppercase">Email</th>
                <th className="text-left px-5 py-3 text-xs font-medium tracking-widest text-gray-500 uppercase">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium tracking-widest text-gray-500 uppercase">Plan</th>
                <th className="text-left px-5 py-3 text-xs font-medium tracking-widest text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {tutors.map((t: any) => (
                <tr key={t._id} className="bg-[#0d0f12] hover:bg-[#13161b] transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs font-semibold text-gray-300">
                        {t.name?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                      <span className="text-gray-200 font-medium">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-400">{t.email}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${t.status === "active" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                      {t.status || "Unknown"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {t.isPremium ? (
                      <span className="text-amber-400 text-xs">★ Premium</span>
                    ) : (
                      <span className="text-gray-600 text-xs">Free</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        className="text-xs text-gray-400 hover:text-white border border-gray-700 px-2 py-1 rounded"
                        onClick={() => navigate(`/admin/Users/${t._id}`)}
                      >
                        View
                      </button>
                      <button 
                        className="text-xs text-gray-400 hover:text-red-400 border border-gray-700 px-2 py-1 rounded"
                        onClick={async () => {
                          await api.patch(`/admin/users/${t._id}/block`);
                          fetchTutors();
                        }}
                      >
                        {t.status === "blocked" ? "Unblock" : "Ban"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}