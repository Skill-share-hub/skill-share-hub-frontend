import { useEffect, useState } from "react";
import {
  FaPlay,
  FaCheckCircle,
  FaBookmark,
} from "react-icons/fa";
import { FiAward } from "react-icons/fi";
import { useAppSelector } from "../../../shared/hooks/redux";
import FullScreenLoader from "../../../shared/components/FullScreenLoader";
import api from "../../../shared/services/axios";
import handleError from "../../../shared/services/handleError";
import { useNavigate } from "react-router-dom";


type CourseStatus = "active" | "completed" | "cancelled" ;

type Enrollment = {
  _id : string;
  userId: string;
  courseId: string;
  status: CourseStatus;
  progress: number;
  completedContent : string[];
  totalContents : number
  courseSnapshot: {
    title: string;
    thumbnail: string;
    price: number;
    courseType: string;
    creditCost?: number;
  };

}

type DataType = {
  totalEnrollment : number ;
  courses : Enrollment[];
  inProgress : number;
  completed : number;
  saved : number
}

const filters: { label: string; value: CourseStatus; icon: React.ReactNode }[] =
  [
    {
      label: "In Progress",
      value: "active",
      icon: <FaPlay className="text-xs" />,
    },
    {
      label: "Completed",
      value: "completed",
      icon: <FaCheckCircle className="text-xs" />,
    }
  ];

export default function MyActivity() {
  const [filter, setFilter] = useState<CourseStatus>("active");
  const [data,setData] = useState<DataType|null>(null);
  const {user} = useAppSelector(state => state.user);

  const stats = [
    {
      label: "Enrolled",
      value: data?.totalEnrollment,
      icon: <FiAward className="text-emerald-600" />,
    },
    {
      label: "Completed",
      value: data?.completed,
      icon: <FaCheckCircle className="text-emerald-600" />,
    },
    {
      label: "In Progress",
      value: data?.inProgress,
      icon: <FaPlay className="text-emerald-600" />,
    },
    {
      label: "Saved",
      value: data?.saved,
      icon: <FaBookmark className="text-emerald-600" />,
    },
  ];

  const fetchData = async () => {
    try{
      const {data:enrollmentData} = await api.get(`/enrollments?status=${filter}`);
      setData(enrollmentData.data);
    }catch(error){
      handleError(error);
    }
  }

  useEffect(()=>{
    fetchData();
  },[filter]);

  if(!data)return <FullScreenLoader />

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={user?.avatarUrl}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-emerald-500 ring-offset-2"
                />
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                  {user?.name} Let's Grind
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Continue your learning journey
                </p>
              </div>
            </div>

            <button className="self-start sm:self-auto flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors duration-200">
              <FiAward />
              View Certificates
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-lg">
                  {s.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === f.value
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-400 hover:text-emerald-600"
                }`}
              >
                {f.icon}
                {f.label}
              </button>
            ))}
          </div>

          {data.courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-2xl text-gray-300">
                <FaBookmark />
              </div>
              <p className="text-gray-500 font-medium">No courses found</p>
              <p className="text-sm text-gray-400 mt-1">
                Try a different filter or explore new courses.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.courses?.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function CourseCard({ course }: { course: Enrollment }) {

  const navigate = useNavigate();

  return (
    <div onClick={()=>navigate(`/my-activity/${course.courseId}`)} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200 flex flex-col">
      <div className="relative">
        <img src={course.courseSnapshot.thumbnail} className="w-full h-44 object-cover" />
        <span
          className={`absolute top-3 left-3 flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full`}
        >
          
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 text-base leading-snug">
          {course.courseSnapshot.title}
        </h3>

        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>Progress</span>
            <span className="font-medium text-gray-700">
              {course.progress}%
            </span>
          </div>

          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-1.5 bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${course.progress?.toFixed(0) || 0}%` }}
            />
          </div>
        </div>

        <button className="mt-5 w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors duration-200">
          View Course
        </button>
      </div>
    </div>
  );
}