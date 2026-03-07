import { useEffect } from "react"
import CourseCard from "../components/CourseCard"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../store/store"
import { fetchTutorCourses } from "../thunk/course.thunk"
import { useNavigate } from "react-router-dom"

const MyCoursesPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {courses,loading,error} = useSelector((state:RootState)=>state.tutorCourses)
  const navigate=useNavigate()


  useEffect(() => {
    dispatch(fetchTutorCourses())
  }, [dispatch])

  return (
    <div className="p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-2xl font-bold">
            My Courses
          </h1>
          <p className="text-gray-500">
            Manage and monitor your educational content
          </p>
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded-lg"
         onClick={()=>navigate("/create-course")}>
          + Create Course
        </button>

      </div>

      {/* Courses */}

      {loading ? (
        <p>Loading courses...</p>
      ) : courses.length === 0 ? (

        <div className="text-center py-20 text-gray-500">
          No courses created yet
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {courses.map(course => (
            <CourseCard
              key={course._id}
              course={course}
            />
          ))}

        </div>

      )}

    </div>
  )
}

export default MyCoursesPage