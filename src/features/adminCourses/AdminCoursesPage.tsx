import { useEffect, useState } from "react";
import api from "../../shared/services/axios";
import { FiSearch, FiEye, FiTrash2 } from "react-icons/fi";
import { HiOutlineBan } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function AdminCoursesPage() {
    type Course = {
        _id: string;
        title: string;
        status: string;
        price: number;
        tutorId?: { name: string };
    };
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Course[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10;

    const fetchCourses = async () => {
        const res = await api.get("/courses");
        setCourses(res.data.data.courses);
    };

    useEffect(() => {
        const load = async () => {
            await fetchCourses();
        };
        load();
    }, []);
    const handleDelete = async (id: string) => {
        if (!confirm("Delete this course?")) return;

        await api.delete(`/courses/${id}`);

        setCourses(prev => prev.filter(c => c._id !== id));
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
            console.log("error:", err);
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
        <div className="min-h-screen bg-[#0d0f12] text-gray-300 p-8">
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

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="relative flex-1 min-w-[200px] max-w-sm">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            className="w-full bg-[#13161b] border border-gray-800 text-gray-300 text-sm pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:border-gray-600 placeholder-gray-700 transition-colors"
                        />
                    </div>
                    <div className="ml-auto text-xs text-gray-700">
                        {filtered.length} record{filtered.length !== 1 ? "s" : ""}
                    </div>
                </div>

                {/* Table */}
                <div className="min-h-screen overflow-hidden bg-[#0d0f12] text-gray-300 p-8">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-[#13161b] border-b border-gray-800">
                                <th className="text-left px-6 py-3 text-xs font-medium tracking-widest text-gray-600 uppercase">Course</th>
                                <th className="text-left px-6 py-3 text-xs font-medium tracking-widest text-gray-600 uppercase">Tutor</th>
                                <th className="text-left px-6 py-3 text-xs font-medium tracking-widest text-gray-600 uppercase">Price</th>
                                <th className="text-left px-6 py-3 text-xs font-medium tracking-widest text-gray-600 uppercase">Status</th>
                                <th className="text-left px-6 py-3 text-xs font-medium tracking-widest text-gray-600 uppercase">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-800/60">
                            {paginated.length > 0 ? (
                                paginated.map((course: any) => (
                                    <tr
                                        key={course._id}
                                        className="bg-[#0d0f12] hover:bg-[#13161b] transition-colors group"
                                    >
                                        {/* Course */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-semibold text-gray-400 shrink-0 uppercase">
                                                    {course.title?.charAt(0) || "C"}
                                                </div>
                                                <span className="text-gray-200 font-medium line-clamp-1 max-w-[220px]">
                                                    {course.title}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Tutor */}
                                        <td className="px-6 py-4 text-gray-500">
                                            {course.tutorId?.name || "—"}
                                        </td>

                                        {/* Price */}
                                        <td className="px-6 py-4 text-gray-300 font-medium">
                                            ${course.price ?? 0}
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${course.status === "published"
                                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                : course.status === "blocked"
                                                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                                    : "bg-gray-500/10 text-gray-500 border border-gray-700"
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${course.status === "published" ? "bg-emerald-400"
                                                    : course.status === "blocked" ? "bg-red-400"
                                                        : "bg-gray-600"
                                                    }`} />
                                                {course.status?.charAt(0).toUpperCase() + course.status?.slice(1) || "—"}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => navigate(`/courses/${course._id}`)}
                                                    className="text-xs text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-2.5 py-1 rounded transition-colors"
                                                >
                                                    <FiEye className="inline w-3.5 h-3.5 mr-1" />
                                                    View
                                                </button>

                                                <button
                                                    onClick={() => handleBlock(course._id)}
                                                    className={`text-xs border px-2.5 py-1 rounded transition-colors ${course.status === "blocked"
                                                        ? "text-green-500 border-green-500/20 hover:border-green-500/40 hover:text-green-400"
                                                        : "text-amber-500 border-amber-500/20 hover:border-amber-500/40 hover:text-amber-400"
                                                        }`}
                                                >
                                                    <HiOutlineBan className="inline w-3.5 h-3.5 mr-1" />
                                                    {course.status === "blocked" ? "Unblock" : "Block"}
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(course._id)}
                                                    className="text-xs text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 px-2.5 py-1 rounded transition-colors"
                                                >
                                                    <FiTrash2 className="inline w-3.5 h-3.5 mr-1" />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-20">
                                        <div className="flex flex-col items-center gap-2">
                                            <FiSearch className="w-8 h-8 text-gray-800" />
                                            <span className="text-sm text-gray-600">No courses found</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-5">
                    <span className="text-xs text-gray-700">
                        Page {page} of {totalPages || 1}
                    </span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="text-xs px-3 py-1.5 rounded border border-gray-800 text-gray-500 hover:text-white hover:border-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            ← Prev
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                            .reduce<(number | string)[]>((acc, p, i, arr) => {
                                if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("...");
                                acc.push(p);
                                return acc;
                            }, [])
                            .map((p, i) =>
                                p === "..." ? (
                                    <span key={`e-${i}`} className="text-xs text-gray-700 px-1 self-center">...</span>
                                ) : (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p as number)}
                                        className={`w-8 h-8 text-xs font-medium rounded transition ${page === p
                                            ? "bg-white text-gray-900"
                                            : "border border-gray-800 text-gray-500 hover:text-white hover:border-gray-600"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                )
                            )}

                        <button
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages || totalPages === 0}
                            className="text-xs px-3 py-1.5 rounded border border-gray-800 text-gray-500 hover:text-white hover:border-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            Next →
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}