import { useEffect, useState } from "react";
import api from "../../shared/services/axios";
import { Search, Eye, Trash2, Ban } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminCoursesPage() {
    type Course = {
        _id: string;
        title: string;
        status: string;
        price: number;
        courseType?: "paid" | "credit" | "free";
        creditCost?: number;
        tutorId?: { name: string };
    };
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Course[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const limit = 10;

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const res = await api.get("/admin/courses");
            setCourses(res.data.data.courses || []);
        } catch (err) {
            console.error("Error fetching courses:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this course?")) return;
        try {
            await api.delete(`/courses/${id}`);
            setCourses(prev => prev.filter(c => c._id !== id));
        } catch (err) {
            console.error("Error deleting course:", err);
        }
    };

    const handleBlock = async (id: string) => {
        try {
            await api.patch(`/courses/${id}/block`);
            setCourses(prev =>
                prev.map(c =>
                    c._id === id
                        ? {
                            ...c,
                            status: c.status === "blocked" ? "published" : "blocked",
                        }
                        : c
                )
            );
        } catch (err) {
            console.error("Error toggling block status:", err);
        }
    };

    const filtered = courses.filter(
        (c) =>
            c.title?.toLowerCase().includes(search.toLowerCase()) ||
            c.tutorId?.name?.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / limit);
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return (
        <div className="min-h-screen bg-[#0d0f12] text-gray-300 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-xs tracking-[0.3em] text-gray-600 uppercase mb-1">
                        Course Management
                    </p>
                    <h1 className="text-2xl font-semibold text-white tracking-tight">
                        All Courses
                    </h1>
                </div>

                {/* Filters Bar */}
                <div className="flex flex-wrap items-center gap-4 mb-6 bg-[#13161b] p-4 rounded-xl border border-gray-800/80 shadow-md">
                    <div className="relative flex-1 min-w-[280px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                        <input
                            type="text"
                            placeholder="Search courses or tutors..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            className="w-full bg-[#0d0f12] border border-gray-800 text-gray-300 text-sm pl-9 pr-4 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder-gray-700 transition-all shadow-inner"
                        />
                    </div>
                    <div className="ml-auto text-[10px] uppercase font-bold text-gray-700 tracking-widest hidden lg:block">
                        {filtered.length} record{filtered.length !== 1 ? "s" : ""}
                    </div>
                </div>

                {/* Table Wrapper for Responsiveness */}
                <div className="bg-[#13161b] rounded-xl border border-gray-800 overflow-hidden shadow-xl">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-sm min-w-[900px]">
                            <thead>
                                <tr className="bg-[#1a1d23] border-b border-gray-800">
                                    <th className="text-left px-6 py-4 text-xs font-bold tracking-widest text-gray-600 uppercase">Course</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold tracking-widest text-gray-600 uppercase">Tutor</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold tracking-widest text-gray-600 uppercase">Price/Credits</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold tracking-widest text-gray-600 uppercase text-center">Status</th>
                                    <th className="text-center px-6 py-4 text-xs font-bold tracking-widest text-gray-600 uppercase">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-800/40">
                                {loading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td colSpan={5} className="px-6 py-8">
                                                <div className="h-4 bg-gray-800/50 rounded w-full"></div>
                                            </td>
                                        </tr>
                                    ))
                                ) : paginated.length > 0 ? (
                                    paginated.map((course: any) => (
                                        <tr
                                            key={course._id}
                                            className="hover:bg-[#1a1d23]/80 transition-colors group"
                                        >
                                            {/* Course */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700/50 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0 uppercase shadow-sm">
                                                        {course.title?.charAt(0) || "C"}
                                                    </div>
                                                    <span className="text-gray-200 font-medium line-clamp-1 max-w-[280px]">
                                                        {course.title}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Tutor */}
                                            <td className="px-6 py-4 text-gray-500 text-xs">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/40" />
                                                    {course.tutorId?.name || "Unknown Tutor"}
                                                </div>
                                            </td>

                                            {/* Price */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-gray-200 font-medium text-xs">
                                                        {course.courseType === "credit" ? (
                                                            <span className="flex items-center gap-1">
                                                                <span className="text-emerald-500">⛁</span>
                                                                {course.creditCost || 0} Credits
                                                            </span>
                                                        ) : (
                                                            <span>₹{course.price || 0}</span>
                                                        )}
                                                    </span>
                                                    <span className="text-[9px] text-gray-700 font-bold uppercase tracking-tighter">
                                                        {course.courseType || 'paid'}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-tight ${course.status === "published"
                                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                    : course.status === "blocked"
                                                        ? "bg-red-500/10 text-red-500 border border-red-500/20"
                                                        : "bg-gray-500/10 text-gray-500 border border-gray-800"
                                                    }`}>
                                                    <span className={`w-1 h-1 rounded-full ${course.status === "published" ? "bg-emerald-400"
                                                        : course.status === "blocked" ? "bg-red-400"
                                                            : "bg-gray-600"
                                                        }`} />
                                                    {course.status}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => navigate(`/courses/${course._id}`)}
                                                        className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-all border border-transparent hover:border-gray-700 shadow-sm"
                                                        title="View"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>

                                                    <button
                                                        onClick={() => handleBlock(course._id)}
                                                        className={`p-2 rounded-lg transition-all border border-transparent shadow-sm ${course.status === "blocked"
                                                            ? "text-emerald-500/60 hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/20"
                                                            : "text-amber-500/60 hover:text-amber-400 hover:bg-amber-500/10 hover:border-amber-500/20"
                                                            }`}
                                                        title={course.status === "blocked" ? "Unblock" : "Block"}
                                                    >
                                                        <Ban className="w-4 h-4" />
                                                    </button>

                                                    <button
                                                        onClick={() => handleDelete(course._id)}
                                                        className="p-2 text-red-500/60 hover:text-red-500 rounded-lg hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20 shadow-sm"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center py-24 text-gray-600">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-gray-800/30 flex items-center justify-center">
                                                    <Search className="w-6 h-6 text-gray-700" />
                                                </div>
                                                <span className="text-sm font-bold uppercase tracking-widest text-[10px]">No courses found</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-8 flex-wrap gap-4">
                        <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                            Page <span className="text-gray-400">{page}</span> of <span className="text-gray-400">{totalPages}</span>
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="text-xs px-4 py-2 rounded-lg border border-gray-800 text-gray-500 hover:text-white hover:border-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all bg-[#13161b] shadow-md"
                            >
                                ← Previous
                            </button>

                            <div className="hidden sm:flex gap-1.5">
                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                                    .reduce<(number | string)[]>((acc, p, i, arr) => {
                                        if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("...");
                                        acc.push(p);
                                        return acc;
                                    }, [])
                                    .map((p, i) =>
                                        p === "..." ? (
                                            <span key={`e-${i}`} className="w-8 flex items-center justify-center text-gray-700 text-xs font-bold">...</span>
                                        ) : (
                                            <button
                                                key={p}
                                                onClick={() => setPage(p as number)}
                                                className={`w-9 h-9 text-xs font-bold rounded-lg transition-all ${page === p
                                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                                                    : "border border-gray-800 text-gray-500 hover:text-white hover:bg-gray-800 shadow-sm"
                                                    }`}
                                            >
                                                {p}
                                            </button>
                                        )
                                    )}
                            </div>

                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="text-xs px-4 py-2 rounded-lg border border-gray-800 text-gray-500 hover:text-white hover:border-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all bg-[#13161b] shadow-md"
                            >
                                Next →
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}