import type { Course } from "../types/course.types"
import { Users, Star, Layers } from "lucide-react"
import StatusBadge from "./StatusBadge"

interface Props {
  course: Course
}

const CourseCard = ({ course }: Props) => {

  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition">

      <img
        src={course.thumbnailUrl || "/placeholder.jpg"}
        className="w-full h-40 object-cover rounded-t-xl"
      />

      <div className="p-4">

        {/* STATUS */}

        <div className="flex justify-between items-center mb-2">

          <StatusBadge status={course.status} />

          <span className="text-xs text-gray-500">
            {course.courseLevel}
          </span>

        </div>

        {/* TITLE */}

        <h3 className="font-semibold text-lg mb-2">
          {course.title}
        </h3>

        {/* CATEGORY */}

        <p className="text-sm text-gray-500 mb-3">
          {course.category}
        </p>

        {/* COURSE METRICS */}

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">

          <span className="flex items-center gap-1">
            <Users size={16} />
            {course.totalEnrollments ?? 0}
          </span>

          <span className="flex items-center gap-1">
            <Star size={16} />
            {course.ratingsAverage ?? 0}
          </span>

          <span className="flex items-center gap-1">
            <Layers size={16} />
            {course.contentModules?.length}
          </span>

        </div>

        {/* PRICE */}

        <div className="mb-4 font-medium">

          {course.courseType === "paid"
            ? `$${course.price}`
            : `${course.creditCost} credits`
          }

        </div>

        {/* ACTION */}

        <button className="w-full border rounded-lg py-2 hover:bg-gray-100">
          Edit Course
        </button>

      </div>
    </div>
  )
}

export default CourseCard