import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../shared/services/axios";

export default function TutorList() {
  const navigate = useNavigate();

  const [role, setRole] = useState("all");
  const [tutors, setTutors] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("");
  const [isPremium, setIsPremium] = useState("");

  // ✅ debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchTutors = async () => {
    try {
      const res = await api.get("/admin/Users", {
        params: {
          page,
          limit,
          ...(debouncedSearch && { search: debouncedSearch }),
          ...(status && { status }),
          ...(isPremium !== "" && { isPremium }),
          ...(role !== "all" && { role }),
        },
      });

      const data = res.data.data;
      setTutors(data.tutors || []);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, [page, debouncedSearch, status, isPremium, role]);

  // ✅ title based on role
  const getTitle = () => {
    if (role === "tutor") return "Tutors";
    if (role === "student") return "Students";
    if (role === "premiumTutor") return "Premium Tutors";
    return "All Users";
  };

  // ✅ BAN / UNBAN
  const handleBlock = async (id: string) => {
    try {
      await api.patch(`/admin/users/${id}/block`);
      fetchTutors(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0f12] text-gray-100 p-4 md:p-8 font-mono">
      {/* HEADER */}
      <div className="mb-8 border-b border-gray-800 pb-6">
        <p className="text-xs tracking-[0.3em] text-gray-500 uppercase mb-1">
          User Management
        </p>
        <h1 className="text-2xl font-semibold text-white">{getTitle()}</h1>
      </div>

      {/* FILTERS */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#161a1f] border border-gray-700 px-3 py-2 rounded text-sm"
        />

        {/* ROLE */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-[#161a1f] border border-gray-700 px-3 py-2 rounded text-sm"
        >
          <option value="all">All Roles</option>
          <option value="student">Student</option>
          <option value="tutor">Tutor</option>
          <option value="premiumTutor">Premium Tutor</option>
        </select>

        {/* STATUS */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-[#161a1f] border border-gray-700 px-3 py-2 rounded text-sm"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="banned">Banned</option>
        </select>

        {/* PLAN */}
        <select
          value={isPremium}
          onChange={(e) => setIsPremium(e.target.value)}
          className="bg-[#161a1f] border border-gray-700 px-3 py-2 rounded text-sm"
        >
          <option value="">All Plans</option>
          <option value="true">Premium</option>
          <option value="false">Free</option>
        </select>
      </div>

      {/* TABLE */}
      <table className="w-full text-sm">
        <thead className="bg-[#13161b]">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Plan</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tutors.map((t) => (
            <tr key={t._id} className="border-t border-gray-800">
              <td className="p-3">{t.name}</td>
              <td className="p-3">{t.email}</td>
              <td className="p-3">
                {t.isBlocked ? "Banned" : "Active"}
              </td>
              <td className="p-3">
                {t.isPremium ? "Premium" : "Free"}
              </td>

              {/* ACTIONS */}
              <td className="p-3 flex gap-2">
                {/* VIEW */}
                <button
                  onClick={() => navigate(`/admin/users/${t._id}/details`)}
                  className="px-2 py-1 border text-xs"
                >
                  View
                </button>

                {/* BAN */}
                <button
                  onClick={() => handleBlock(t._id)}
                  className="px-2 py-1 border text-xs text-red-400"
                >
                  {t.isBlocked ? "Unban" : "Ban"}
                </button>
              </td>
            </tr>
          ))}

          {tutors.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center p-6 text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={tutors.length < limit}
        >
          Next
        </button>
      </div>
    </div>
  );
}