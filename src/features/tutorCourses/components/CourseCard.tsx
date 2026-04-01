import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Course } from "../types/course.types"
import { Users, Clock, MoreVertical, Edit2, CloudUpload, Loader2, BookOpen } from "lucide-react"
import { AnimatePresence } from "framer-motion"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../../store/store"
import toast from "react-hot-toast"
import { publishCourse } from "../thunk/course.thunk"
import ConfirmDialog from "../../../shared/components/ConfirmDialog"
interface Props {
  course: Course
}

const CourseCard = ({ course }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const [isPublishing, setIsPublishing] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const statusStyles = {
    published: "bg-green-100 text-green-700",
    draft: "bg-gray-100 text-gray-700",
    pending: "bg-yellow-100 text-yellow-700",
  }
  const handlePublishCourse = async (courseId: string) => {
    setIsPublishing(true)
    try {
      await dispatch(publishCourse(courseId)).unwrap();
      toast.success("Course published successfully!");
    } catch (error) {
      console.error("Course publishing failed", error);
      toast.error("Course publishing failed");
    } finally {
      setIsPublishing(false)
    }
  };

  // Format creation date
  const createdDate = course.createdAt ? new Date(course.createdAt) : new Date()
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 3600 * 24))
  const timeAgo = diffDays === 0 ? "Today" : diffDays < 7 ? `${diffDays}d ago` : diffDays < 30 ? `${Math.floor(diffDays / 7)}w ago` : `${Math.floor(diffDays / 30)}mo ago`

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full group">
      {/* Thumbnail with Status Badge */}
      <div
        onClick={() => navigate(`/course-overview/${course._id}`)}
        className="relative aspect-video overflow-hidden cursor-pointer"
      >
        <img
          src={course.thumbnailUrl || "/api/placeholder/400/225"}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md shadow-sm border border-white/20 ${statusStyles[course.status] || "bg-gray-100 text-gray-700"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${course.status === 'published' ? 'bg-green-500' : course.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'}`}></span>
            {course.status}
          </span>
        </div>

        {/* Hover overlay content would go here if needed */}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3
            onClick={() => navigate(`/course-overview/${course._id}`)}
            className="font-bold text-gray-900 text-lg leading-tight line-clamp-2 min-h-[2.5rem] cursor-pointer hover:text-secondary transition-colors"
          >
            {course.title}
          </h3>
          <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50 transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>

        {/* Info Rows */}
        <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-5">
          <div className="flex items-center gap-1.5">
            <Users size={14} className="text-gray-400" />
            <span>{course.totalEnrollments || 0}</span>
          </div>
          <div className="flex items-center gap-1.5 border-l border-gray-100 pl-4">
            <span className="font-bold text-gray-700">
              {course.courseType === 'paid' ? `$${course.price || 0}` : `${course.creditCost || 0} Credits`}
            </span>
          </div>
          <div className="flex items-center gap-1.5 border-l border-gray-100 pl-4">
            <Clock size={14} className="text-gray-400" />
            <span>{timeAgo}</span>
          </div>
        </div>

        {/* Footer Actions - Prioritized "View Details" */}
        <div className="mt-auto flex gap-3 pt-4 border-t border-gray-50">
          <button
            onClick={() => navigate(`/course-overview/${course._id}`)}
            className="flex-[2] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1F5E45] hover:bg-[#164733] text-white text-sm font-semibold transition-all active:scale-95 shadow-sm"
          >
            <BookOpen size={16} />
            <span>View Details</span>
          </button>

          <button
            onClick={() => navigate(`/edit-course/${course._id}`)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 text-sm font-semibold transition-all active:scale-95"
            title="Edit Course"
          >
            <Edit2 size={16} />
            <span className="hidden sm:inline">Edit</span>
          </button>

          {course.status === "draft" && (
            <>
              <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={() => handlePublishCourse(course._id)}
                title="Publish Course"
                description="Are you sure you want to publish this course? It will be visible to students immediately."
                confirmText="Publish"
                variant="primary"
              />
              <button
                onClick={() => setIsConfirmOpen(true)}
                disabled={isPublishing}
                className={`flex items-center justify-center w-11 h-11 rounded-xl bg-[#1F5E45] text-white hover:bg-[#164733] transition-all shadow-sm active:scale-95 ${isPublishing ? 'opacity-80 cursor-not-allowed' : ''}`}
                title="Publish Course"
              >
                <AnimatePresence mode="wait">
                  {isPublishing ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <CloudUpload size={18} />
                  )}
                </AnimatePresence>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseCard