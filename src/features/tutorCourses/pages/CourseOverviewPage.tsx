import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { getCourseByIdApi } from "../api/courses.api"
import type { Course } from "../types/course.types"
import toast from "react-hot-toast"

// Component-based design
import OverviewHero from "../components/Overview/OverviewHero"
import OverviewStats from "../components/Overview/OverviewStats"
import CurriculumOverview from "../components/Overview/CurriculumOverview"
import HelpSection from "../components/Overview/HelpSection"

const CourseOverviewPage = () => {
    const { id } = useParams<{ id: string }>()
    const [course, setCourse] = useState<Course | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchCourseData = async () => {
            if (!id) return
            try {
                setIsLoading(true)
                const response = await getCourseByIdApi(id)
                if (response.success) {
                    setCourse(response.data)
                }
            } catch (error) {
                console.error("Failed to fetch course data", error)
                toast.error("Failed to load course details")
            } finally {
                setIsLoading(false)
            }
        }

        fetchCourseData()
    }, [id])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#166534]"></div>
            </div>
        )
    }

    if (!course) {
        return (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800">Course not found</h2>
                <Link
                    to="/my-courses"
                    className="mt-4 inline-block text-[#166534] font-medium hover:underline"
                >
                    Back to My Courses
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 font-sans text-gray-900 bg-[#F9FAFB]">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <Link to="/my-courses" className="hover:text-[#166534] transition-colors">My Courses</Link>
                <ChevronRight size={14} />
                <span className="text-gray-900 font-medium truncate">{course.title}</span>
            </nav>

            {/* Hero Section Component */}
            <OverviewHero course={course} />

            {/* Stats Row Component */}
            <OverviewStats course={course} />

            {/* Curriculum Section Component */}
            <CurriculumOverview course={course} />

            {/* Help Section Component */}
            <HelpSection />
        </div>
    )
}

export default CourseOverviewPage
