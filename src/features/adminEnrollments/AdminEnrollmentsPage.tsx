import { useEffect, useState } from "react";
import api from "../../shared/services/axios";
import { FiSearch, FiEye, FiFilter } from "react-icons/fi";
import EnrollmentModal from "./EnrollmentModal";

export default function AdminEnrollmentsPage() {
    type Enrollment = {
        _id: string;
        student: { name: string; email: string };
        course: { title: string; thumbnail: string };
        tutor: { name: string };
        status: string;
        progress: number;
        enrolledAt: string;
    };

    const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [selectedEnrollment, setSelectedEnrollment] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const limit = 10;

    const fetchEnrollments = async () => {
        setLoading(true);
        try {
            const res = await api.get("/admin/enrollments", {
                params: {
                    search,
                    status,
                    page,
                    limit
                }
            });
            const { enrollments, totalPages, totalCount } = res.data.data;
            setEnrollments(enrollments);
            setTotalPages(totalPages);
            setTotalCount(totalCount);
        } catch (error) {
            console.error("Error fetching enrollments:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchEnrollments();
        }, 300);
        return () => clearTimeout(timeout);
    }, [search, status, page]);

    const handleViewDetails = async (id: string) => {
        try {
            const res = await api.get(`/admin/enrollments/${id}`);
            setSelectedEnrollment(res.data.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching enrollment details:", error);
        }
    };

    return (
        <div className="min-h-screen bg-[#0d0f12] text-gray-300 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <p className="text-xs tracking-[0.3em] text-gray-600 uppercase mb-1">
                        Management
                    </p>
                    <h1 className="text-2xl font-semibold text-white tracking-tight">
                        Enrollments
                    </h1>
                </div>

                {/* Filters Bar */}
                <div className="flex flex-wrap items-center gap-4 mb-6 bg-[#13161b] p-4 rounded-xl border border-gray-800/80 shadow-md">
                    <div className="relative flex-1 min-w-[280px]">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                        <input
                            type="text"
                            placeholder="Search student or course..."
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                            className="w-full bg-[#0d0f12] border border-gray-800 text-gray-300 text-sm pl-9 pr-4 py-2.5 rounded-lg focus:outline-none focus:border-indigo-500/50 placeholder-gray-700 transition-all shadow-inner"
                        />
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="flex items-center gap-2 bg-[#0d0f12] border border-gray-800 rounded-lg px-2 flex-1 sm:flex-none">
                            <FiFilter className="w-3.5 h-3.5 text-gray-600" />
                            <select
                                value={status}
                                onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                                className="bg-transparent text-gray-300 text-xs py-2.5 outline-none cursor-pointer min-w-[120px] w-full"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div className="ml-auto text-[10px] uppercase font-bold text-gray-700 tracking-widest hidden lg:block">
                        {totalCount} record{totalCount !== 1 ? "s" : ""}
                    </div>
                </div>

                {/* Table Wrapper for Responsiveness */}
                <div className="bg-[#13161b] rounded-xl border border-gray-800 overflow-hidden shadow-xl">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-sm min-w-[1000px]">
                            <thead>
                                <tr className="bg-[#1a1d23] border-b border-gray-800">
                                    <th className="text-left px-6 py-4 text-xs font-bold tracking-widest text-gray-600 uppercase">Student</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold tracking-widest text-gray-600 uppercase">Course</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold tracking-widest text-gray-600 uppercase">Price/Credits</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold tracking-widest text-gray-600 uppercase">Tutor</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold tracking-widest text-gray-600 uppercase text-center">Status</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold tracking-widest text-gray-600 uppercase text-center">Progress</th>
                                    <th className="text-left px-6 py-4 text-xs font-bold tracking-widest text-gray-600 uppercase">Date</th>
                                    <th className="text-center px-6 py-4 text-xs font-bold tracking-widest text-gray-600 uppercase">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-800/40">
                                {loading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td colSpan={8} className="px-6 py-8">
                                                <div className="h-4 bg-gray-800/50 rounded w-full"></div>
                                            </td>
                                        </tr>
                                    ))
                                ) : enrollments.length > 0 ? (
                                    enrollments.map((enrollment: any) => (
                                        <tr
                                            key={enrollment._id}
                                            className="hover:bg-[#1a1d23]/80 transition-colors group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-gray-200 font-medium">{enrollment.student?.name}</span>
                                                    <span className="text-[10px] text-gray-600 font-bold uppercase tracking-tighter">{enrollment.student?.email}</span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700/50 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                                                        {enrollment.course?.thumbnail ? (
                                                            <img src={enrollment.course.thumbnail} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <span className="text-xs font-semibold text-gray-500 uppercase">
                                                                {enrollment.course?.title?.charAt(0)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-gray-300 font-medium line-clamp-1 max-w-[180px]">
                                                        {enrollment.course?.title}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-gray-200 font-medium text-xs">
                                                        {enrollment.course?.courseType === 'credit' 
                                                            ? <>
                                                                <span className="text-emerald-500 mr-1">⛁</span>
                                                                {enrollment.course?.creditCost || 0} Credits
                                                              </>
                                                            : `₹${enrollment.course?.price || 0}`
                                                        }
                                                    </span>
                                                    <span className="text-gray-700 text-[9px] uppercase font-bold tracking-tighter">
                                                        {enrollment.course?.courseType}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/40" />
                                                    {enrollment.tutor?.name}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-tight ${enrollment.status === "completed"
                                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                    : enrollment.status === "cancelled"
                                                        ? "bg-red-500/10 text-red-500 border border-red-500/20"
                                                        : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                                                    }`}>
                                                    {enrollment.status}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex flex-col items-center gap-1.5 min-w-[100px]">
                                                    <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full transition-all duration-700 ${enrollment.status === 'completed' ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                                                            style={{ width: `${enrollment.progress}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] text-gray-600 font-bold tracking-tighter">{enrollment.progress}%</span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-gray-500 text-[10px] font-bold uppercase tracking-tight">
                                                {new Date(enrollment.enrolledAt).toLocaleDateString()}
                                            </td>

                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => handleViewDetails(enrollment._id)}
                                                    className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white border border-gray-800 hover:border-gray-600 px-3 py-1.5 rounded-lg transition-all bg-[#0d0f12] group-hover:bg-[#13161b] shadow-sm"
                                                >
                                                    <FiEye className="w-3.5 h-3.5" />
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="text-center py-24">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-12 h-12 rounded-full bg-gray-800/30 flex items-center justify-center">
                                                    <FiSearch className="w-6 h-6 text-gray-700" />
                                                </div>
                                                <span className="text-sm text-gray-600 font-medium font-bold uppercase tracking-widest text-[10px]">No results found</span>
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

            {/* Modal */}
            <EnrollmentModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                enrollment={selectedEnrollment} 
            />
        </div>
    );
}
