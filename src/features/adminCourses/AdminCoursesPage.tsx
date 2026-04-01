import { useEffect, useState } from "react";
import api from "../../shared/services/axios";
import { Search, Eye, Trash2, Ban, RotateCcw } from "lucide-react"; // Added RotateCcw for Restore
import { useNavigate } from "react-router-dom";

export default function AdminCoursesPage() {
    type Course = {
        _id: string;
        title: string;
        status: string;
        price: number;
        courseType?: "paid" | "credit" | "free";
        creditCost?: number;
        isDeleted?: boolean;
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

    useEffect(() => { fetchCourses(); }, []);

    // Optimized Handlers
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this course?")) return;
        try {
            await api.delete(`/courses/${id}`);
            setCourses(prev => prev.filter(c => c._id !== id));
        } catch (err) { console.error(err); }
    };

    const handleBlock = async (id: string) => {
        try {
            await api.patch(`/courses/${id}/block`);
            setCourses(prev => prev.map(c => c._id === id ? { 
                ...c, status: c.status === "blocked" ? "published" : "blocked" 
            } : c));
        } catch (err) { console.error(err); }
    };

    const handleRestore = async (id: string) => {
        try {
            await api.patch(`/courses/${id}/restore`);
            setCourses(prev => prev.map(c => c._id === id ? { ...c, isDeleted: false } : c));
        } catch (err) { console.error(err); }
    };

    const filtered = courses.filter(c =>
        c.title?.toLowerCase().includes(search.toLowerCase()) ||
        c.tutorId?.name?.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filtered.length / limit);
    const paginated = filtered.slice((page - 1) * limit, page * limit);

    return (
        <div className="min-h-screen bg-[#0d0f12] text-gray-300 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header & Search */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-white">All Courses</h1>
                </div>

                <div className="flex items-center gap-4 mb-6 bg-[#13161b] p-4 rounded-xl border border-gray-800">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-[#0d0f12] border border-gray-800 pl-9 pr-4 py-2 rounded-lg"
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="bg-[#13161b] rounded-xl border border-gray-800 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-[#1a1d23] border-b border-gray-800">
                                <tr>
                                    <th className="text-left px-6 py-4">Course</th>
                                    <th className="text-left px-6 py-4">Tutor</th>
                                    <th className="text-left px-6 py-4">Price/Credits</th>
                                    <th className="text-center px-6 py-4">Status</th>
                                    <th className="text-center px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/40">
                                {loading ? (
                                    <tr><td colSpan={5} className="text-center py-10">Loading...</td></tr>
                                ) : paginated.length > 0 ? (
                                    paginated.map((course) => (
                                        <tr key={course._id} className="hover:bg-[#1a1d23]/80 group">
                                            <td className="px-6 py-4">{course.title}</td>
                                            <td className="px-6 py-4 text-gray-500">{course.tutorId?.name || "Unknown"}</td>
                                            <td className="px-6 py-4">
                                                {course.courseType === "credit" ? `${course.creditCost} ⛁` : `₹${course.price}`}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${course.status === 'published' ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
                                                    {course.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <button onClick={() => navigate(`/courses/${course._id}`)} className="p-2 hover:text-white"><Eye className="w-4 h-4" /></button>
                                                    <button onClick={() => handleBlock(course._id)} className="p-2 text-amber-500/60"><Ban className="w-4 h-4" /></button>
                                                    {course.isDeleted ? (
                                                        <button onClick={() => handleRestore(course._id)} className="p-2 text-green-500/60"><RotateCcw className="w-4 h-4" /></button>
                                                    ) : (
                                                        <button onClick={() => handleDelete(course._id)} className="p-2 text-red-500/60"><Trash2 className="w-4 h-4" /></button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan={5} className="text-center py-20 text-gray-600">No courses found</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Simplified Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-6">
                        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-4 py-2 border border-gray-800 rounded-lg disabled:opacity-30">Previous</button>
                        <span className="text-xs">Page {page} of {totalPages}</span>
                        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-4 py-2 border border-gray-800 rounded-lg disabled:opacity-30">Next</button>
                    </div>
                )}
            </div>
        </div>
    );
}