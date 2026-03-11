import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../shared/hooks/redux";
import { fetchTutorCourses } from "../tutorCourses/thunk/course.thunk";
import { BookOpen, Users, Star, CreditCard, ChevronRight, Edit3, Eye, PlusCircle, Activity, LayoutDashboard, BarChart3, X } from "lucide-react";

const TutorDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const { courses, loading } = useAppSelector((state) => state.tutorCourses);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

  useEffect(() => {
    dispatch(fetchTutorCourses());
  }, [dispatch]);

  if (!user) return null;

  const totalCourses = courses.length;
  const totalEnrollments = courses.reduce((acc, course) => acc + (course.totalEnrollments || 0), 0);
  const avgRating = courses.length
    ? (courses.reduce((acc, course) => acc + (course.ratingsAverage || 0), 0) / courses.length).toFixed(1)
    : "0.0";
  const creditsEarned = user.tutorProfile?.totalCreditsEarned || (user as any)?.credits || 0;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="px-2.5 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">Published</span>;
      case 'pending':
        return <span className="px-2.5 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">Pending Review</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-semibold bg-gray-100 text-gray-700 rounded-full">Draft</span>;
    }
  };

  return (
    <div className="py-8 w-full max-w-7xl mx-auto px-4 lg:px-8 flex-1">
      <div className="space-y-8">

        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              You have {totalCourses} published courses and {totalEnrollments} students enrolled.
            </p>
          </div>
          <button
            onClick={() => navigate("/create-course")}
            className="mt-4 md:mt-0 flex items-center gap-2 bg-[#145537] text-white px-5 py-2.5 rounded-lg hover:bg-green-800 transition shadow-sm font-medium active:scale-95"
          >
            <PlusCircle size={18} />
            Create New Course
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-3 text-gray-500 mb-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                <BookOpen size={20} />
              </div>
              <h3 className="font-medium">Total Courses</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">{loading ? "..." : totalCourses}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-3 text-gray-500 mb-4">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                <Users size={20} />
              </div>
              <h3 className="font-medium">Total Enrollments</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">{loading ? "..." : totalEnrollments}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-3 text-gray-500 mb-4">
              <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg group-hover:scale-110 transition-transform">
                <Star size={20} />
              </div>
              <h3 className="font-medium">Average Rating</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">{loading ? "..." : avgRating}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-3 text-gray-500 mb-4">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg group-hover:scale-110 transition-transform">
                <CreditCard size={20} />
              </div>
              <h3 className="font-medium">Credits Earned</h3>
            </div>
            <p className="text-3xl font-bold text-gray-800">{creditsEarned}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Courses Section */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">My Courses</h2>
                <Link to="/my-activity" className="text-[#145537] hover:underline text-sm font-medium flex items-center">
                  View All <ChevronRight size={16} />
                </Link>
              </div>

              {loading ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map(i => <div key={i} className="h-32 bg-gray-200 rounded-2xl w-full"></div>)}
                </div>
              ) : courses.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4"><BookOpen size={24} /></div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">No courses yet</h3>
                  <p className="text-gray-500 mb-6">Create your first course to start earning.</p>
                  <button onClick={() => navigate("/create-course")} className="bg-[#145537] text-white px-5 py-2.5 rounded-lg hover:bg-green-800 transition font-medium">Create Course</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.slice(0, 4).map((course) => (
                    <div
                      key={course._id}
                      onClick={() => setSelectedCourse(course)}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all group flex flex-col cursor-pointer"
                    >
                      <div className="relative h-36 bg-gray-100 overflow-hidden">
                        {course.thumbnailUrl ? (
                          <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400"><BookOpen size={32} /></div>
                        )}
                        <div className="absolute top-3 right-3">
                          {getStatusBadge(course.status)}
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          <span>{course.category}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <span>{course.courseLevel}</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">{course.title}</h3>

                        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><Star size={14} className="text-yellow-500" /> {course.ratingsAverage || "New"}</span>
                            <span className="flex items-center gap-1"><Users size={14} /> {course.totalEnrollments || 0}</span>
                          </div>
                          <span className="font-bold text-[#145537]">{course.courseType === 'paid' ? `$${course.price}` : `${course.creditCost} CR`}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar Area */}
          <div className="space-y-8">

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><LayoutDashboard size={18} /> Quick Actions</h2>
              <div className="space-y-3">
                <button onClick={() => navigate("/create-course")} className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-[#145537] hover:bg-green-50 text-gray-700 transition group">
                  <span className="flex items-center gap-3 font-medium"><PlusCircle size={18} className="text-gray-400 group-hover:text-[#145537]" /> Create Course</span>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-[#145537]" />
                </button>
                <Link to="/my-activity" className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-[#145537] hover:bg-green-50 text-gray-700 transition group">
                  <span className="flex items-center gap-3 font-medium"><BookOpen size={18} className="text-gray-400 group-hover:text-[#145537]" /> Manage Courses</span>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-[#145537]" />
                </Link>
                <Link to="/reports" className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:border-[#145537] hover:bg-green-50 text-gray-700 transition group">
                  <span className="flex items-center gap-3 font-medium"><BarChart3 size={18} className="text-gray-400 group-hover:text-[#145537]" /> View Analytics</span>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-[#145537]" />
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><Activity size={18} /> Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Users size={14} /></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">New student enrolled</p>
                    <p className="text-xs text-gray-500">2 hours ago • React Basics</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0"><Star size={14} /></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">5-star review added</p>
                    <p className="text-xs text-gray-500">5 hours ago • Node.js API</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0"><BookOpen size={14} /></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Course published</p>
                    <p className="text-xs text-gray-500">Yesterday • Advanced JS</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Course Actions Modal */}
      {selectedCourse && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4"
          onClick={() => setSelectedCourse(null)}
        >
          <div
            className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-6 relative overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                {selectedCourse.thumbnailUrl ? (
                  <img src={selectedCourse.thumbnailUrl} alt={selectedCourse.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400"><BookOpen size={24} /></div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 line-clamp-1">{selectedCourse.title}</h2>
                <div className="flex items-center gap-2 mt-1 text-sm font-medium text-gray-500">
                  <span className="uppercase">{selectedCourse.category}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{selectedCourse.courseLevel}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  {getStatusBadge(selectedCourse.status)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-gray-500 flex items-center gap-2 mb-1"><Users size={16} /> Enrollments</span>
                <span className="font-bold text-gray-800 text-lg">{selectedCourse.totalEnrollments || 0} Students</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <span className="text-gray-500 flex items-center gap-2 mb-1"><Star size={16} className="text-yellow-500" /> Rating</span>
                <span className="font-bold text-gray-800 text-lg">{selectedCourse.ratingsAverage || "New"}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={`/edit-course/${selectedCourse._id}`}
                onClick={() => setSelectedCourse(null)}
                className="flex-1 flex items-center justify-center gap-2 bg-[#145537] hover:bg-green-800 text-white font-medium py-3 rounded-lg transition"
              >
                <Edit3 size={18} /> Edit Course
              </Link>
              <Link
                to={`/courses/${selectedCourse._id}`}
                onClick={() => setSelectedCourse(null)}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 rounded-lg transition"
              >
                <Eye size={18} /> View Details
              </Link>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default TutorDashboard;
