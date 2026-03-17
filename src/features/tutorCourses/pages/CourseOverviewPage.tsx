import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ChevronRight, AlertCircle, BookOpen } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../store/store"
import { fetchCourseById } from "../thunk/course.thunk"
import { clearCurrentCourse } from "../slice/getCourseSlice"
import OverviewHero from "../components/Overview/OverviewHero"
import OverviewStats from "../components/Overview/OverviewStats"
import CurriculumOverview from "../components/Overview/CurriculumOverview"
import HelpSection from "../components/Overview/HelpSection"
import FullScreenLoader from "../../../shared/components/FullScreenLoader"

const CourseOverviewPage = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch<AppDispatch>()
    const { currentCourse: course, loading: isLoading, error } = useSelector((state: RootState) => state.tutorCourses)

    useEffect(() => {
        if (id) dispatch(fetchCourseById(id))
        return () => { dispatch(clearCurrentCourse()) }
    }, [id, dispatch])

    if (isLoading) return <FullScreenLoader />

    if (error) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex items-center gap-2 px-7 py-3 border-b border-gray-100 bg-gray-50/60">
                        <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-gray-400">Error</span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                        <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mb-4">
                            <AlertCircle size={20} className="text-red-400" />
                        </div>
                        <p className="text-[15px] font-bold text-gray-800">Failed to load course</p>
                        <p className="text-[13px] text-gray-400 mt-1">{error}</p>
                        <Link
                            to="/my-courses"
                            className="mt-5 text-[13px] font-semibold text-gray-900 underline underline-offset-2 hover:text-emerald-700 transition-colors"
                        >
                            ← Back to My Courses
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    if (!course) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex items-center gap-2 px-7 py-3 border-b border-gray-100 bg-gray-50/60">
                        <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-gray-400">Not Found</span>
                    </div>
                    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center mb-4">
                            <BookOpen size={20} className="text-gray-300" />
                        </div>
                        <p className="text-[15px] font-bold text-gray-800">Course not found</p>
                        <p className="text-[13px] text-gray-400 mt-1">This course may have been removed or the link is incorrect.</p>
                        <Link
                            to="/my-courses"
                            className="mt-5 text-[13px] font-semibold text-gray-900 underline underline-offset-2 hover:text-emerald-700 transition-colors"
                        >
                            ← Back to My Courses
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 font-sans text-gray-900">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-1.5 text-[12px] font-medium text-gray-400 mb-7">
                    <Link
                        to="/my-courses"
                        className="hover:text-gray-700 transition-colors"
                    >
                        My Courses
                    </Link>
                    <ChevronRight size={12} strokeWidth={2.5} className="text-gray-300" />
                    <span className="text-gray-700 truncate max-w-[260px]">{course.title}</span>
                </nav>

                {/* Page sections */}
                <OverviewHero course={course} />
                <OverviewStats course={course} />
                <CurriculumOverview course={course} />
                <HelpSection />

            </div>
        </div>
    )
}

export default CourseOverviewPage