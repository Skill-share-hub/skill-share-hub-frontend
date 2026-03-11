import {
    Users,
    Star,
    DollarSign,
    ArrowUpRight
} from "lucide-react"
import { motion } from "framer-motion"
import type { Course } from "../../types/course.types"

interface OverviewStatsProps {
    course: Course
}

const OverviewStats = ({ course }: OverviewStatsProps) => {
    const stats = [
        {
            label: "Enrollments",
            value: course.totalEnrollments?.toLocaleString() || "0",
            icon: Users,
            trend: "+12% this month",
            trendUp: true
        },
        {
            label: "Avg. Rating",
            value: course.ratingsAverage?.toFixed(1) || "0.0",
            icon: Star,
            trend: "Based on 842 reviews",
            trendUp: null
        },
        {
            label: "Revenue",
            value: course.courseType === 'paid' ?
                `$${((course.price || 0) * (course.totalEnrollments || 0) * 0.8).toLocaleString()}k` :
                `${(course.creditCost || 0) * (course.totalEnrollments || 0)}`,
            icon: DollarSign,
            trend: "+8% growth",
            trendUp: true
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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
                        {stat.trendUp === true && <ArrowUpRight size={14} className="text-green-500" />}
                        <span className={stat.trendUp === true ? "text-green-600" : "text-gray-400"}>
                            {stat.trend}
                        </span>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export default OverviewStats
