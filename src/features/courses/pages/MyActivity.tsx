import { useEffect, useState } from "react";
import {
FaPlay,
FaCheckCircle,
FaBookmark,
} from "react-icons/fa";
import { FiAward } from "react-icons/fi";
import api from "../../../shared/services/axios";
import { useAppDispatch } from "../../../shared/hooks/redux";

type CourseStatus = "in-progress" | "completed" | "saved";

export default function MyActivity() {
const [filter, setFilter] = useState<CourseStatus>("in-progress");
const [data, setData] = useState<any>(null);
const [loading, setLoading] = useState(false);

const dispatch = useAppDispatch();

// 🔥 FETCH REAL DATA
useEffect(() => {
const fetchData = async () => {
try {
setLoading(true);

    const res = await api.get("/enrollments?status=active");

    // backend structure:
    // res.data.data = { totalEnrollment, courses, inProgress, completed, saved }

    setData(res.data.data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

fetchData();

}, []);

if (loading) return <p>Loading...</p>;
if (!data) return <p>No activity</p>;

// ✅ REAL DATA
const courses = data.courses || [];

// ✅ MAP DATA
const mappedCourses = courses.map((c: any) => ({
id: c._id,
title: c.courseId?.title || "No Title",
instructor: c.courseId?.tutorId?.name || "Unknown",
thumbnail: c.courseId?.thumbnailUrl || "/course.jpg",
progress: c.progress || 0,
status:
c.progress === 100
? "completed"
: c.progress > 0
? "in-progress"
: "saved",
}));

const filteredCourses = mappedCourses.filter(
(c: any) => c.status === filter
);

// ✅ STATS (FROM BACKEND)
const stats = [
{
label: "Enrolled",
value: data.totalEnrollment,
icon: <FiAward />,
},
{
label: "Completed",
value: data.completed,
icon: <FaCheckCircle />,
},
{
label: "In Progress",
value: data.inProgress,
icon: <FaPlay />,
},
{
label: "Saved",
value: data.saved,
icon: <FaBookmark />,
},
];

return ( <div className="p-6">

  {/* STATS */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    {stats.map((s) => (
      <div key={s.label} className="bg-white p-4 rounded shadow">
        <p className="text-lg font-bold">{s.value}</p>
        <p className="text-sm text-gray-500">{s.label}</p>
      </div>
    ))}
  </div>

  {/* FILTERS */}
  <div className="flex gap-2 mb-6">
    <button onClick={() => setFilter("in-progress")}>In Progress</button>
    <button onClick={() => setFilter("completed")}>Completed</button>
    <button onClick={() => setFilter("saved")}>Saved</button>
  </div>

  {/* COURSES */}
  {filteredCourses.length === 0 ? (
    <p>No courses found</p>
  ) : (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredCourses.map((course: any) => (
        <div key={course.id} className="bg-white p-4 rounded shadow">
          <img src={course.thumbnail} className="w-full h-32 object-cover" />
          <h3 className="font-semibold mt-2">{course.title}</h3>
          <p className="text-sm text-gray-500">{course.instructor}</p>
          <p className="text-sm mt-2">Progress: {course.progress}%</p>
        </div>
      ))}
    </div>
  )}
</div>

);
}
