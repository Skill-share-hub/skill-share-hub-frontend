import { BookOpen, PlayCircle } from "lucide-react";

interface EnrolledCourse {
  _id: string;
  title: string;
  thumbnailUrl?: string;
  progress?: number; // 0-100
  instructor?: string;
}

interface StudentProfileCoursesProps {
  courses?: EnrolledCourse[];
}

function CourseCard({ course }: { course: EnrolledCourse }) {
  const progress = course.progress ?? 0;

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
      {/* Thumbnail */}
      <div className="relative h-32 bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center overflow-hidden">
        {course.thumbnailUrl ? (
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <BookOpen className="w-10 h-10 text-white opacity-60" />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <PlayCircle className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h4 className="text-sm font-bold text-gray-900 line-clamp-2 mb-1">{course.title}</h4>
        {course.instructor && (
          <p className="text-xs text-gray-500 mb-3">by {course.instructor}</p>
        )}

        {/* Progress bar */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500 font-medium">Progress</span>
            <span className="text-xs font-bold text-green-700">{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-600 to-emerald-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentProfileCourses({ courses = [] }: StudentProfileCoursesProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-600" />
          Enrolled Courses
        </h3>
        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm font-semibold border border-green-100">
          {courses.length} Total
        </span>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      ) : (
        <div className="py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
          <BookOpen className="w-12 h-12 text-gray-300 mb-4" />
          <h4 className="text-lg font-bold text-gray-700 mb-1">No Courses Yet</h4>
          <p className="text-sm text-gray-500 font-medium">
            You haven't enrolled in any courses yet. Start learning today!
          </p>
          <button className="mt-5 px-5 py-2.5 bg-green-800 hover:bg-green-900 text-white text-sm font-semibold rounded-xl transition-colors">
            Browse Courses
          </button>
        </div>
      )}
    </div>
  );
}