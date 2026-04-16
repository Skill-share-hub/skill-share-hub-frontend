import {
    Users,
    Star,
    DollarSign,
    Layers
} from "lucide-react"
import { motion } from "framer-motion"
import type { Course } from "../../types/course.types"

interface OverviewStatsProps {
    course: Course
}

const OverviewStats = ({ course }: OverviewStatsProps) => {
    const ratingsCount = course.ratingsCount || 0
    const ratingsAverage = ratingsCount > 0 ? (course.ratingsAverage || 0).toFixed(1) : "0.0"
    const moduleCount = course.contentModules?.length || 0
    const revenueValue = course.courseType === "paid"
        ? `$${((course.price || 0) * (course.totalEnrollments || 0)).toLocaleString()}`
        : `${((course.creditCost || 0) * (course.totalEnrollments || 0)).toLocaleString()} credits`

    const stats = [
        {
            label: "Enrollments",
            value: course.totalEnrollments?.toLocaleString() || "0",
            icon: Users,
            hint: "Total student enrollments"
        },
        {
            label: "Avg. Rating",
            value: ratingsAverage,
            icon: Star,
            hint: ratingsCount > 0 ? `Based on ${ratingsCount} review${ratingsCount === 1 ? "" : "s"}` : "No reviews yet"
        },
        {
            label: course.courseType === "paid" ? "Gross Sales" : "Credits Earned",
            value: revenueValue,
            icon: DollarSign,
            hint: course.courseType === "paid" ? "Calculated from price x enrollments" : "Calculated from credit cost x enrollments"
        },
        {
            label: "Modules",
            value: moduleCount.toLocaleString(),
            icon: Layers,
            hint: "Published curriculum items"
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm group hover:shadow-md transition-shadow"
                >
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-semibold text-gray-500">{stat.label}</span>
                        <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-[#166534]/10 transition-colors">
                            <stat.icon size={20} className="text-gray-400 group-hover:text-[#166534] transition-colors" />
                        </div>
                    </div>

                    <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-medium">
                        <span className="text-gray-400">
                            {stat.hint}
                        </span>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default OverviewStats
