import { Edit3, Layout, Trash2, CheckCircle, Power, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import type { Course } from "../../types/course.types"
import { useState } from "react"
import { useAppDispatch } from "../../../../shared/hooks/redux"
import { deleteCourse, updateCourseStatus } from "../../thunk/course.thunk"
import toast from "react-hot-toast"

interface OverviewHeroProps {
    course: Course
}

const OverviewHero = ({ course }: OverviewHeroProps) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [expanded, setExpanded] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isChangingStatus, setIsChangingStatus] = useState(false);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this entire course? This action cannot be undone.")) return
        setIsDeleting(true)
        try {
            await dispatch(deleteCourse(course._id)).unwrap()
            navigate("/my-courses")
        } catch (error: any) {
            toast.error(error || "Failed to delete course")
        } finally {
            setIsDeleting(false)
        }
    }

    const handleStatusToggle = async () => {
        const nextStatus = course.status === "published" ? "draft" : "published"
        setIsChangingStatus(true)
        try {
            await dispatch(updateCourseStatus({ id: course._id, status: nextStatus })).unwrap()
        } catch (error: any) {
            toast.error(error || "Failed to update status")
        } finally {
            setIsChangingStatus(false)
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row"
        >
            <div className="md:w-5/12 aspect-square md:aspect-auto relative bg-[#FFF2E9] flex items-center justify-center p-12">
                {course.thumbnailUrl ? (
                    <img
                        src={course.thumbnailUrl}
                        alt={course.title}
                        className="w-full h-full object-cover rounded-2xl shadow-lg"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center">
                        <Layout size={64} className="text-orange-300" />
                    </div>
                )}
            </div>

            <div className="md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                    {/* <span className="bg-[#E7F3EF] text-[#065F46] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                        BESTSELLER
                    </span> */}
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
                        Course Overview
                    </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-[#111827] mb-4 leading-tight">
                    {course.title}
                </h1>

               <div>
      <p
        className={`text-gray-500 text-lg mb-2 leading-relaxed ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {course.description}
      </p>
      {course.description.length > 100 && (
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-black font-small underline"
      >
        {expanded ? "Read Less" : "Read More"}
      </button>)}
    </div>

                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={() => navigate(`/edit-course/${course._id}`)}
                        className="flex items-center gap-2 bg-[#166534] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#14532D] transition-all active:scale-95"
                    >
                        <Edit3 size={18} />
                        Edit Course
                    </button>
                    <button
                        onClick={handleStatusToggle}
                        disabled={isChangingStatus}
                        className={`flex items-center gap-2 border px-6 py-3 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50 ${course.status === "published"
                            ? "border-amber-200 text-amber-700 hover:bg-amber-50"
                            : "border-green-200 text-green-700 hover:bg-green-50"
                            }`}
                    >
                        {isChangingStatus ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : course.status === "published" ? (
                            <Power size={18} />
                        ) : (
                            <CheckCircle size={18} />
                        )}
                        {course.status === "published" ? "Unpublish" : "Publish"}
                    </button>

                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="flex items-center gap-2 border border-red-200 text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-50 transition-all active:scale-95 disabled:opacity-50"
                    >
                        {isDeleting ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <Trash2 size={18} />
                        )}
                        Delete
                    </button>
                </div>
            </div>
        </motion.div>
    )
}

export default OverviewHero
